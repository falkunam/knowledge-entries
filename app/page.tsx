"use client";

import { useState } from "react";
import EntryForm from "./components/EntryForm";
import EntryList from "./components/EntryList";
import EntryModal from "./components/EntryModal";
import Header from "./components/Header";
import { Entry } from "./type/entry";

export default function DashboardPage() {
  const [editData, setEditData] = useState<Entry | null>(null);
  const [openModal, setOpenModal] = useState(false);

  const handleSuccess = () => {
    setEditData(null);
    setOpenModal(false);
  };

  const handleAddClick = () => {
    setEditData(null);
    setOpenModal(true);
  };

  const handleEdit = (entry: Entry) => {
    setEditData(entry);
    setOpenModal(true);
  };

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <Header onAddClick={handleAddClick} />

        <EntryList onEdit={handleEdit} />
      </div>

      <EntryModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        title={editData ? "Edit Entry" : "Add New Entry"}
      >
        <EntryForm onClose={handleSuccess} initialValues={editData} />
      </EntryModal>
    </main>
  );
}
