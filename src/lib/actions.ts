"use server";

import { nanoid } from "nanoid";
import { redis } from "./redis";
import { redirect } from "next/navigation";

export async function testeConexao() {
  await redis.set("teste", "Funcionou!");

  const valor = await redis.get("teste");
  console.log(valor);
}

export async function createRoom() {
  const roomId = nanoid(8);

  await redis.set(`room:${roomId}`, { status: "active" }, { ex: 600 });

  redirect(`chat/${roomId}`);
}
