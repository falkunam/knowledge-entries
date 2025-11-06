import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../lib/axios";
import toast from "react-hot-toast";
import { Entry } from "../type/entry";

const fetchEntries = async () => {
  const { data } = await api.get<Entry[]>("/entries");
  return data;
};

export const useEntries = () => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["entries"],
    queryFn: fetchEntries,
  });

  const addEntry = useMutation({
    mutationFn: (newEntry: Entry) => api.post("/entries", newEntry),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      toast.success("Entry added!");
    },
  });

  const updateEntry = useMutation({
    mutationFn: (updated: Entry) => api.put(`/entries/${updated.id}`, updated),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      toast.success("Entry updated!");
    },
  });

  const deleteEntry = useMutation({
    mutationFn: (id: number) => api.delete(`/entries/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["entries"] });
      toast.success("Entry deleted!");
    },
  });

  return { data, isLoading, addEntry, updateEntry, deleteEntry };
};
