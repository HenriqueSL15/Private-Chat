"use client";
import { ArrowBigRightDash } from "lucide-react";

export default function EnterExistingRoomButton() {
  return (
    <div className="flex flex-col">
      <h1 className="text-xl text-center mb-2">
        ENTRE EM UMA SALA JÁ EXISTENTE
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          className="border-2 p-3 dark:border-[#008236] dark:focus:border-[#00c950] rounded-sm outline-none w-full transition-all"
        />
        <button className="dark:bg-[#032e15] dark:hover:bg-[#016630] w-20 min-h-full transition-all rounded-sm flex justify-center items-center hover:cursor-pointer">
          <ArrowBigRightDash className="w-2/3 h-2/3" />
        </button>
      </div>
    </div>
  );
}
