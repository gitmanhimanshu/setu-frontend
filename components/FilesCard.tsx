"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Paperclip, Trash2, Upload } from "lucide-react";
import {
  deleteFile,
  fetchFiles,
  fileUrl,
  uploadFile,
  type FilesResponse,
} from "@/lib/setu";

/**
 * Uploaded resumes — the ones that only exist on the user's machine.
 *
 * This card is the only way such a file can enter Setu: an assistant sees a
 * PDF's extracted text, never its bytes, so anything it "uploaded" would be a
 * rebuilt document, not the user's own. The browser is the real upload path.
 */

function readableSize(bytes: number) {
  return bytes < 1024 * 1024
    ? `${Math.max(1, Math.round(bytes / 1024))} KB`
    : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export default function FilesCard({
  token,
  onExpired,
}: {
  token: string;
  onExpired?: () => void;
}) {
  const [data, setData] = useState<FilesResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const fail = useCallback(
    (err: unknown) => {
      const message = err instanceof Error ? err.message : "Something went wrong.";
      if (/expired|unauthor/i.test(message) && onExpired) return onExpired();
      setError(message);
    },
    [onExpired]
  );

  const load = useCallback(async () => {
    try {
      setData(await fetchFiles(token));
    } catch (err) {
      fail(err);
    }
  }, [token, fail]);

  useEffect(() => {
    load();
  }, [load]);

  async function onPick(file: File) {
    setBusy(true);
    setError(null);
    try {
      await uploadFile(token, file);
      await load();
    } catch (err) {
      fail(err);
    } finally {
      setBusy(false);
      if (input.current) input.current.value = "";
    }
  }

  async function remove(id: string, filename: string) {
    if (!confirm(`Delete ${filename}? Links already emailed will stop working.`)) return;
    setError(null);
    try {
      await deleteFile(token, id);
      await load();
    } catch (err) {
      fail(err);
    }
  }

  const files = data?.files ?? [];
  const full = data ? files.length >= data.max_files : false;

  return (
    <section className="rounded-xl border border-line bg-surface p-5">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2">
          <Paperclip size={15} className="text-ink-2" aria-hidden="true" />
          <h2 className="font-semibold text-sm">Uploaded files</h2>
        </div>

        <div className="flex items-center gap-3">
          {data && (
            <span className="text-xs text-ink-3 tabular">
              {readableSize(data.storage_used)} / {readableSize(data.storage_limit)}
            </span>
          )}
          <input
            ref={input}
            id="setu-file-upload"
            type="file"
            accept=".pdf,.doc,.docx,application/pdf"
            className="sr-only"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) onPick(file);
            }}
          />
          <label
            htmlFor="setu-file-upload"
            aria-disabled={busy || full}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line text-xs font-medium transition-colors ${
              busy || full
                ? "opacity-50 pointer-events-none"
                : "cursor-pointer hover:border-[var(--border-strong)]"
            }`}
          >
            <Upload size={13} />
            {busy ? "Uploading…" : "Upload"}
          </label>
        </div>
      </div>

      <p className="mt-2 text-xs text-ink-3">
        PDF or Word, up to {data ? readableSize(data.max_file_bytes) : "5 MB"}. Once
        uploaded, ask your assistant to attach it by name.
      </p>

      {error && (
        <p role="alert" className="mt-3 text-xs" style={{ color: "var(--critical)" }}>
          ✕ {error}
        </p>
      )}

      {full && (
        <p className="mt-3 text-xs text-ink-3">
          You&apos;ve reached {data?.max_files} files. Delete one to upload another.
        </p>
      )}

      {!data ? (
        <p className="mt-4 text-xs text-ink-2">Loading…</p>
      ) : files.length === 0 ? (
        <p className="mt-4 text-xs text-ink-2">
          No files yet. If your resume is only on this computer, upload it here —
          your assistant can&apos;t, it only ever sees the text inside a PDF.
        </p>
      ) : (
        <ul className="mt-4 space-y-2">
          {files.map((f) => (
            <li
              key={f.id}
              className="flex items-center gap-3 rounded-lg border border-line bg-[var(--plane)] px-3 py-2.5"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">{f.filename}</p>
                <p className="text-[11px] text-ink-3 tabular">{readableSize(f.size)}</p>
              </div>
              <a
                href={fileUrl(f.id)}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 text-xs text-[var(--accent)] hover:underline"
              >
                Open
              </a>
              <button
                onClick={() => remove(f.id, f.filename)}
                aria-label={`Delete ${f.filename}`}
                className="shrink-0 p-1.5 rounded-md text-ink-3 hover:text-[var(--critical)] transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
