"use client";
import { joinRoom } from "@/lib/actions";
import { ArrowBigRightDash } from "lucide-react";
import { nanoid } from "nanoid";
import { redirect } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface JoinRoomRes {
  allowed: boolean;
  message?: string;
}

export default function EnterExistingRoomButton() {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleJoin = async (roomId: string) => {
    setIsLoading(true);
    let userId = localStorage.getItem("userId");

    if (!userId) {
      userId = nanoid();
      localStorage.setItem("userId", userId);
    }

    toast.promise(joinRoom(userId, roomId), {
      loading: "Entrando na sala",
      success: (res: JoinRoomRes) => {
        console.log(res);

        setIsLoading(false);
        setInputValue("");
        router.push(`chat/${roomId}`);
        return "Entrou na sala";
      },
      error: "Erro ao entrar na sala",
    });
  };

  return (
    <div className="flex flex-col">
      <h1 className="text-xl text-center mb-2">
        ENTRE EM UMA SALA JÁ EXISTENTE
      </h1>
      <div className="flex gap-3">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="border-2 p-3 dark:border-[#008236] dark:focus:border-[#00c950] rounded-sm outline-none w-full transition-all"
        />
        <button
          onClick={() => handleJoin(inputValue)}
          className={`w-20 min-h-full transition-all 
          rounded-sm flex justify-center items-center hover:cursor-pointer ${
            isLoading
              ? "bg-[#3f3f46]"
              : "dark:bg-[#032e15] dark:hover:bg-[#016630]"
          }`}
        >
          <ArrowBigRightDash className="w-2/3 h-2/3" />
        </button>
      </div>
    </div>
  );
}
