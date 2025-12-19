import NewRoomButton from "./components/NewRoomButton";
import EnterExistingRoomButton from "./components/EnterExistingRoomButton";

export default function Home() {
  return (
    <>
      <div className="flex items-center justify-center w-full min-h-screen gap-10 dark:bg-[#171717] dark:text-[#e4e4e7]">
        <NewRoomButton />
        <EnterExistingRoomButton />
      </div>
    </>
  );
}
