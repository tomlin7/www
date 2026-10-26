"use client";

import { useState } from "react";

export function PicnicHome() {
  const [failed, setFailed] = useState(false);
  return (
    <div className="picnic-home">
      <iframe
        className="picnic-frame"
        src="/picnic/index.html"
        title="Dheeraj's interactive picnic portfolio"
        onError={() => setFailed(true)}
        allow="autoplay"
      />
      {failed && (
        <div className="picnic-fallback">
          <h1>Dheeraj C.</h1>
          <p>Systems, software, and a little curiosity.</p>
          <a href="/minimal">Open the minimal portfolio →</a>
        </div>
      )}
    </div>
  );
}
