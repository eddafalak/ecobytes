import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 bg-forest text-paper">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-semibold">EcoBytes</p>
        <p className="text-sm text-paper/80">Technology for a sustainable future.</p>
        <Link href="/about" className="text-sm underline underline-offset-4 hover:text-leaf">
          About EcoBytes
        </Link>
      </div>
    </footer>
  );
}
