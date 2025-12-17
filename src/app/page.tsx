export default function Home() {
  return (
    <div className="flex items-center justify-center w-full min-h-screen gap-10 dark:bg-[#171717] dark:text-[#e4e4e7]">
      <button className="text-xl text-center mb-2 hover:cursor-pointer p-10 dark:bg-[#032e15] dark:hover:bg-[#016630] dark:hover:text-[#f4f4f5] rounded-sm transition-all">
        CRIE UMA NOVA SALA
      </button>
      <div className="flex flex-col">
        <h1 className="text-xl text-center mb-2">
          ENTRE EM UMA SALA JÁ EXISTENTE
        </h1>
        <input
          type="text"
          className="border-2 p-3 dark:border-[#008236] dark:focus:border-[#00c950] rounded-sm outline-none w-full transition-all"
        />
      </div>
    </div>
  );
}
