import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center items-center w-full pt-5 pb-5 mt-5 mb-5">
      <Link href="https://www.gitagpt.in/" className="flex space-x-3">
        <Image
          alt="GitaGPT"
          src="/gita-gpt.svg"
          width={45}
          height={45}
        />
        <h1 className="class="justify-items-center my-5 font-bold text-xl">GitaGPT</h1>
      </Link>
    </header>
  );
}
