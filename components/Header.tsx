import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="">
      <Link href="https://www.gitagpt.in/" className="">
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
