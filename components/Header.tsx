import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-between items-center w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
      <Link href="https://www.gitagpt.in/" className="flex space-x-3">
        <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={50}
          height={50}
        />
        <h1>
          GitaGPT.in
        </h1>
      </Link>
    </header>
  );
}
