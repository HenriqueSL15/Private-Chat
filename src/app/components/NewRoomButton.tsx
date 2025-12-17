"use client";

import { createRoom } from "@/lib/actions";

export default function NewRoomButton() {
  return (
    <button
      onClick={() => createRoom()}
      className="text-xl text-center mb-2 hover:cursor-pointer p-10 dark:bg-[#032e15] dark:hover:bg-[#016630] dark:hover:text-[#f4f4f5] rounded-sm transition-all"
    >
      CRIE UMA NOVA SALA
    </button>
  );
}
