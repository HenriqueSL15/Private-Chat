"use server";

import { nanoid } from "nanoid";
import { redis } from "./redis";
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

  //Cria a room
  await redis.set(roomKey, { status: "active" }, { ex: 600 });

  // Adiciona o usuário que criou a room na lista
  await redis.sadd(usersKey, userId);

  // Adiciona um timer dessa lista também
  await redis.expire(usersKey, 600);

  // Redireciona para a tela do chat
  redirect(`chat/${roomId}`);
}

export async function joinRoom(userId: string, roomId: string) {
  const usersKey = `room:${roomId}:users`;

  // Adiciona o usuário atual
  await redis.sadd(usersKey, userId);

  // Conta quantos itens foram guardados na lista dos usuários
  const amountOfUsers = await redis.scard(usersKey);

  if (amountOfUsers > 2) {
    // Remove o usuário atual
    await redis.srem(usersKey, userId);
    return { allowed: false, message: "Sala já está cheia" };
  }

  return { allowed: true };
}
