import Link from "next/link";
import { readdirSync } from "fs";
import { join } from "path";

export default function Home() {
  const appDir = join(process.cwd(), "app");
  const dirs = readdirSync(appDir, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
    .filter((name) => /^\d{2}$/.test(name))
    .sort((a, b) => parseInt(a) - parseInt(b));

  return (
    <main className="mt-18">
      <div className="max-w-screen-md mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2.5 px-4.5">
          {dirs.map((page) => (
            <Link
              key={page}
              href={`/${page}`}
              className="
                flex items-center justify-center
                aspect-square
                bg-white dark:bg-neutral-950
                ring ring-neutral-800/10 dark:ring-neutral-200/10
                rounded-none hover:rounded-sm
                shadow-none hover:shadow-sm dark:shadow-white/10
                transition-all ease-in-out duration-200
                text-sm sm:text-base
                text-neutral-500 hover:text-neutral-600 dark:hover:text-neutral-400
                font-medium font-lora"
              tabIndex={0}
              aria-label={`Go to experiment ${page}`}
            >
              {page}
            </Link>
          ))}
        </div>
      </div>
      <div className="py-12"></div>
    </main>
  );
}
