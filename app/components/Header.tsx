"use client";

interface HeaderProps {
  onAddClick: () => void;
}

export default function Header({ onAddClick }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm p-4 flex sm:flex-row items-center justify-between rounded-xl">
      <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">
        Knowledge Entries
      </h1>
      <button
        data-testid="add-new-btn"
        onClick={onAddClick}
        className="bg-cyan-500  text-white px-4 py-2 rounded-lg font-medium hover:bg-cyan-700 transition-all"
      >
        <span className="text-xl">+</span>{" "}
        <span className="hidden sm:inline">Add New</span>
      </button>
    </header>
  );
}
