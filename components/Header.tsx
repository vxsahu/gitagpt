import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="top-0 left-0 right-0 z-10 flex items-center justify-between border-b bg-gray-50/50 px-10 py-2 text-center text-lg font-medium backdrop-blur-sm">
      <Link href="https://www.gitagpt.in/" className="flex space-x-3">
        <Image
          alt="GitaGPT"
          src="/gitagpt.svg"
          width={50}
          height={50}
        />
        <h1 className="sm:text-4xl text-2xl font-bold ml-2 tracking-tight">
          GitaGPT.in
        </h1>
      </Link>
    </header>
  );
}
