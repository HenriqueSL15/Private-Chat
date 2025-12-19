# Private Chat - Chat Privado em Tempo Real

Projeto de chat privado em tempo real com salas (rooms), baseado em Next.js e TypeScript. Permite criar e entrar em salas, enviar mensagens em tempo real usando Pusher/Redis, e ter uma interface simples e responsiva.

## 🚀 Tecnologias Utilizadas

### Frontend
- **Next.js (App Router)**: Framework React usado para o app (rotas em `src/app`) e renderização server-side.
- **React**: Para o desenvolvimento do frontend interativo e responsivo com TypeScript.
- **TypeScript**: Tipagem estática para frontend e backend.
- **Tailwind CSS**: Utilizado para estilização (configurado como dependência de desenvolvimento).
- **Lucide React**: Biblioteca de ícones usada na interface.
- **Sonner**: Biblioteca de notificações utilizada no projeto.
- **nanoid**: Geração de IDs curtos/únicos no frontend.
- **Pusher JS (`pusher-js`)**: Cliente para receber eventos em tempo real no navegador.

### Backend / Tempo-Real
- **Node.js**: Ambiente de execução (via Next.js).
- **Next.js Server Actions / API (server-side)**: Lógica server-side integrada ao app router.
- **Pusher (server)**: Envio de eventos em tempo real (`pusher`).
- **@upstash/redis**: Cliente Redis usado em `src/lib/redis.ts` para pub/sub e coordenação com o back-end.
- **Redis (serviço)**: Armazenamento/coordenação opcional usado pelo projeto.


**OBS:**
Este projeto foi desenvolvido com fins educacionais e para demonstração de habilidades em desenvolvimento web fullstack.
