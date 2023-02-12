import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="w-full flex items-center justify-center flex justify-left items-left w-full bg-white-100 border border-bottom-1 border-gray-900 bg-white">
      <Link href="https://www.gitagpt.in/" className="px-4 space-x-3 max-w-5xl align-center innerbox flex flex-1 w-full">
        <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={40}
          height={40}
        />
        <h1 className="justify-items-center my-5 font-medium text-xl sm:text-2xl">Gita GPT</h1>
      </Link>
    </header>
  );
}
