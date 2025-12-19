"use client";

import { createRoom } from "@/lib/actions";
import { nanoid } from "nanoid";
import { toast } from "sonner";

export default function NewRoomButton() {
  const handleCreate = async () => {
    // Busca ID no local storage
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = nanoid();
      localStorage.setItem("userId", userId);
    }

    toast.promise(createRoom(userId), {
      loading: "Criando sala",
      success: "Sala criada",
      error: "Ocorreu um erro",
    });
  };

  return (
    <button
      onClick={handleCreate}
      className="text-xl text-center mb-2 hover:cursor-pointer p-10 dark:bg-[#032e15] dark:hover:bg-[#016630] dark:hover:text-[#f4f4f5] rounded-sm transition-all"
    >
      CRIE UMA NOVA SALA
    </button>
  );
}
