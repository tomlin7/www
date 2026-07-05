"use client";

import React, { useState } from "react";
import { IconCheck, IconCopy } from "@tabler/icons-react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback: ignore
    }
  };

  return (
    <button
      onClick={handleCopy}
      className="blog-copy-btn"
      aria-label={copied ? "Copied!" : "Copy code"}
    >
      {copied ? (
        <>
          <IconCheck className="w-3.5 h-3.5" />
          <span>Copied</span>
        </>
      ) : (
        <>
          <IconCopy className="w-3.5 h-3.5" />
          <span>Copy</span>
        </>
      )}
    </button>
  );
}
