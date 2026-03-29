"use client";

import React from "react";

export function LogoIcon({ size = 24 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      aria-hidden="true"
    >
      <rect x="6" y="6" width="15" height="15" rx="3" fill="white" />
      <rect x="27" y="6" width="15" height="15" rx="3" fill="white" opacity="0.6" />
      <rect x="6" y="27" width="15" height="15" rx="3" fill="white" opacity="0.6" />
      <rect x="27" y="27" width="15" height="15" rx="3" fill="white" opacity="0.35" />
    </svg>
  );
}
