import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex w-full mt-5 border-b-2 pb-7 sm:px-4 px-2">
          <Link href="https://www.gitagpt.in/" class="flex items-center justify-between space-x-3">
        <Image
          alt="header gitagpt"
          src="/Gitagpt.png"
          className="sm:4xl sm:2xl"
        /><h1> GitaGPT.in</h1>
      </Link>
    </header>
  );
}
