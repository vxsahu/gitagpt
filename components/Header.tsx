import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full bg-gray-100">
      <Link href="https://www.gitagpt.in/" className="flex space-x-3">
        <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={50}
          height={50}
        />
        <h1 className="justify-items-center my-5 font-medium text-xl sm:text-2xl">Gita GPT</h1>
      </Link>
    </header>
  );
}
