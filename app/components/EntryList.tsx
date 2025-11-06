"use client";

import Image from "next/image";
import { Entry } from "../type/entry";
import { useEntries } from "../hook/useEntries";
import { useState } from "react";

export default function EntryList({
  onEdit,
}: {
  onEdit: (entry: Entry) => void;
}) {
  const { data: entries, isLoading, deleteEntry } = useEntries();
  const [search, setSearch] = useState("");

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-40">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!entries || entries.length === 0) {
    return (
      <div
        className="text-center text-gray-500 mt-12"
        data-testid="empty-state"
      >
        No entries found. Click “Add New” to create one.
      </div>
    );
  }

  const filtered = entries.filter((e) =>
    e.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    deleteEntry.mutate(id);
  };

  return (
    <div className="max-w-2xl mx-auto mt-6" data-testid="entries-list">
      <h2 className="text-xl font-semibold mb-4 text-center">Entries List</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search entries..."
        className="w-full border border-gray-300 rounded-md p-2 mb-3 outline-none focus:ring-2 focus:ring-blue-300"
      />

      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-12">
            No entries found.
          </div>
        ) : (
          filtered.map((entry) => (
            <div
              key={entry.id}
              data-testid="entry-card"
              className="rounded-md p-4 flex gap-4 sm:items-center items-start justify-center sm:justify-between bg-white shadow-sm overflow-hidden hover:shadow-lg transition-shadow duration-200 border border-gray-100"
            >
              <div className="flex gap-4 items-center">
                <Image
                  src={entry.image}
                  alt="Preview"
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded-md"
                />
                <div>
                  <h3 className="font-semibold">{entry.title}</h3>
                  <p className="text-sm text-gray-600 max-h-[100px] overflow-y-auto">
                    {entry.description}
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  data-testid="edit-btn"
                  onClick={() => onEdit(entry)}
                  className="sm:bg-orange-400 text-white sm:px-3 sm:py-1 p-0 rounded-md sm:hover:bg-orange-300"
                >
                  <span className="block sm:hidden text-lg">✏️</span>
                  <span className="hidden sm:inline">Edit</span>
                </button>
                <button
                  data-testid="delete-btn"
                  onClick={() => handleDelete(entry.id!)}
                  className="sm:bg-red-400 text-white sm:px-3 sm:py-1 p-0 rounded-md sm:hover:bg-red-300"
                >
                  <span className="block sm:hidden text-lg">🗑️</span>
                  <span className="hidden sm:inline">Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
