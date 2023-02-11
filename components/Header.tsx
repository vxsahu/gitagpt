import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="pt-5 pb-5 flex justify-center items-center w-full bg-white-100">
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
