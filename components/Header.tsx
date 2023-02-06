import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full mt-5">
      <Link href="https://www.gitagpt.in/" className="flex space-x-3">
        <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={50}
          height={50}
        />
        <h1 className="justify-items-center my-5 font-bold text-xl sm:text-4xl">Gita GPT</h1>
      </Link>
    </header>
  );
}
