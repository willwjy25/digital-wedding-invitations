'use client';

import { useState } from 'react';

interface CopyLinkButtonProps {
  slug: string;
}

export function CopyLinkButton({ slug }: CopyLinkButtonProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const invitationUrl = `${window.location.origin}/invitation/${slug}`;
    await navigator.clipboard.writeText(invitationUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <button onClick={handleCopy} className="rounded border px-3 py-1 text-sm">
      {copied ? 'Tersalin!' : 'Salin Link'}
    </button>
  );
}
