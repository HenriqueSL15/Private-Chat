"use client";
import { redirect, useParams } from "next/navigation";
import { ArrowBigRightDash } from "lucide-react";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher-client";
import { getMessages, sendMessage } from "@/lib/actions";
import { nanoid } from "nanoid";
import { toast } from "sonner";

interface Message {
  userId: string;
  message: string;
}

export default function ChatPage() {
  const { roomId } = useParams();
  const [inputValue, setInputValue] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [userId] = useState<string>(() => {
    if (typeof window !== "undefined") {
      let savedId = localStorage.getItem("userId");
      if (!savedId) {
        savedId = nanoid();
        localStorage.setItem("userId", savedId);
      }
      return savedId;
    }
    return "";
  });

  useEffect(() => {
    if (!roomId) return;

    const fetchHistory = async () => {
      const history = await getMessages(String(roomId));
      setMessages(history);
    };

    fetchHistory();

    const channel = pusherClient.subscribe(`${roomId}`);

    channel.bind("new-message", (data: Message) => {
      setMessages((prev) => [...prev, data]);
    });

    return () => {
      channel.unbind("new-message");
      pusherClient.unsubscribe(`room:${roomId}`);
    };
  }, []);

  const handleSendMessage = async () => {
    setIsLoading(true);
    const backupValue = inputValue;
    setInputValue("");
    try {
      const result = await sendMessage(String(roomId), userId, inputValue);
      setIsLoading(false);
      if (!result.success) {
        throw new Error("Erro ao mandar mensagem");
      }
      setInputValue("");
    } catch (err) {
      setInputValue(backupValue);
      toast.error(err as string);
    }
  };

  const handleLeaveRoom = () => {
    redirect("/");
  };

  return (
    <div className="w-full h-screen flex flex-col dark:bg-[#171717] dark:text-[#e4e4e7] overflow-hidden">
      <button
        className={`transition-all w-auto m-2 p-3
          rounded-sm hover:cursor-pointer dark:bg-[#032e15] dark:hover:bg-[#016630]`}
        onClick={() => handleLeaveRoom()}
      >
        Sair da sala
      </button>
      <div className="border dark:border-[#008236] flex flex-col m-2 flex-1 min-h-0 justify-between ">
        <div className="flex-1 w-auto m-2 flex flex-col gap-2 overflow-y-auto min-h-0">
          {messages.map((message, i) => (
            <div
              className={`flex ${
                message.userId == userId ? "justify-end" : "justify-start"
              } `}
              key={i}
            >
              <h1
                className={`${
                  message.userId == userId
                    ? "dark:bg-[#0d542b]"
                    : "dark:bg-[#3f3f46]"
                } p-2 max-w-[80%] rounded-sm break-words`}
              >
                {message.message}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex h-20 gap-2 m-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="border-2 p-3 dark:border-[#008236] dark:focus:border-[#00c950] rounded-sm outline-none transition-all w-8/10"
          />

          <button
            onClick={() => handleSendMessage()}
            className={`${
              isLoading
                ? "bg-[#404040] hover:cursor-not-allowed"
                : "dark:bg-[#032e15] dark:hover:bg-[#016630] hover:cursor-pointer"
            } w-2/10 min-h-full transition-all 
          rounded-sm flex justify-center items-center`}
          >
            <ArrowBigRightDash className="w-2/3 h-2/3" />
          </button>
        </div>
      </div>
    </div>
  );
}
