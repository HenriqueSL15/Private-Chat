"use server";

import { nanoid } from "nanoid";
import { redis } from "./redis";
import { pusherServer } from "./pusher";
import { redirect } from "next/navigation";

export async function testeConexao() {
  await redis.set("teste", "Funcionou!");

  const valor = await redis.get("teste");
  console.log(valor);
}

export async function createRoom(userId: string) {
  const roomId = nanoid(8);
  const roomKey = `room:${roomId}`;
  const usersKey = `room:${roomId}:users`;
  const messagesKey = `room:${roomId}:messages`;

  //Cria a room
  await redis.set(roomKey, { status: "active" }, { ex: 600 });

  // Adiciona o usuário que criou a room na lista
  await redis.sadd(usersKey, userId);

  // Adiciona um timer dessa lista também
  await redis.expire(usersKey, 600);

  // Adiciona mensagem inicial para poder contar o tempo de expire
  await redis.rpush(messagesKey, "init");

  // Adiciona um timer para a lista de mensagens
  await redis.expire(messagesKey, 600);

  // Redireciona para a tela do chat
  redirect(`/chat/${roomId}`);
}
interface JoinRoomRes {
  allowed: boolean;
  message?: string;
}
export async function joinRoom(
  userId: string,
  roomId: string
): Promise<JoinRoomRes> {
  try {
    const usersKey = `room:${roomId}:users`;

    // Adiciona o usuário atual
    await redis.sadd(usersKey, userId);
    console.log(userId);
    // Conta quantos itens foram guardados na lista dos usuários
    const amountOfUsers = await redis.scard(usersKey);
    console.log(amountOfUsers);

    if (amountOfUsers > 2) {
      // Remove o usuário atual
      await redis.srem(usersKey, userId);
      return { allowed: false, message: "Sala já está cheia" };
    }

    return { allowed: true };
  } catch (error) {
    console.error("Erro ao entrar na sala: ", error);
    return { allowed: false, message: "Erro ao entrar na sala" };
  }
}

export async function sendMessage(
  roomId: string,
  userId: string,
  message: string
) {
  try {
    const messagesKey = `room:${roomId}:messages`;

    const data = {
      userId,
      message,
    };

    // Adiciona a mensagem e o id do usuário que a mandou em forma de string na lista
    await redis.rpush(messagesKey, JSON.stringify(data));

    // Notifica que a mensagem foi criada para todos os usuários ligados na room
    await pusherServer.trigger(`${roomId}`, "new-message", data);

    return { success: true };
  } catch (error) {
    console.error("Erro ao mandar mensagem: ", error);
    return { success: false };
  }
}

export async function getMessages(roomId: string) {
  try {
    const messagesKey = `room:${roomId}:messages`;
    const messages = await redis.lrange(messagesKey, 0, -1);

    if (!messages || !Array.isArray(messages)) {
      return [];
    }
    if (messages.length > 0) {
      return messages
        .map((message) => {
          if (typeof message !== "string") {
            return message;
          }

          if (message == "init") return null;

          try {
            if (message.startsWith("{")) return JSON.parse(message);
            return null;
          } catch (err) {
            console.error("Erro ao fazer parse: ", err);
            return null;
          }
        })
        .filter((message) => message !== null);
    }

    return [];
  } catch (error) {
    console.error("Erro ao buscar mensagens: ", error);
    return [];
  }
}
