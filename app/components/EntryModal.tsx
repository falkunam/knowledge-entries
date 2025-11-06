"use client";

import { ReactNode } from "react";

interface EntryModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title: string;
}

export default function EntryModal({
  open,
  onClose,
  children,
  title,
}: EntryModalProps) {
  if (!open) return null;

  return (
    // <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 transition-opacity duration-300">
      <div
        data-testid="entry-modal"
        className="bg-white rounded-2xl shadow-lg w-full max-w-lg p-6 m-3 relative transform transition-all duration-300 scale-100 hover:scale-[1.01]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-4 text-gray-500 hover:text-gray-700 text-2xl font-bold"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4 border-b border-gray-400 pb-2 text-gray-800">
          {title}
        </h2>

        <div>{children}</div>
      </div>
    </div>
  );
}
