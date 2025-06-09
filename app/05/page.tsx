import Image from "next/image";

type ImageItem = {
  title: string;
  src: string;
};

const images: ImageItem[] = [
  {
    title: "iMac G4",
    src: "/05/imac-g4.webp",
  },
  {
    title: "New Balance Sneakers",
    src: "/05/new-balance-sneakers.webp",
  },
  {
    title: "Flower Bouquet",
    src: "/05/flowers.webp",
  },
  {
    title: "Link's Sword and Shield",
    src: "/05/link-sword-shield.webp",
  },
  {
    title: "Starbucks Coffee",
    src: "/05/starbucks-coffee.webp",
  },
  {
    title: "Mate",
    src: "/05/mate.webp",
  },
  {
    title: "Gameboy Cartridge",
    src: "/05/gameboy-cartridge.webp",
  },
  {
    title: "A Key",
    src: "/05/a-key.webp",
  },
  {
    title: "Macintosh Computer",
    src: "/05/macintosh.webp",
  },
  {
    title: "Straw Hat",
    src: "/05/straw-hat.webp",
  },
  {
    title: "Bonsai Tree",
    src: "/05/bonsai.webp",
  },
  {
    title: "Ergonomic Chair",
    src: "/05/chair.webp",
  },
  {
    title: "Motorcycle Helmet",
    src: "/05/helmet.webp",
  },

  {
    title: "NASA Spacecraft",
    src: "/05/nasa.webp",
  },
];

export default function Page05() {
  return (
    <div className="min-h-screen w-full mt-18 px-4.5 max-w-screen-md mx-auto">
      <div className="italic text-neutral-500 text-xs sm:text-sm mb-2">
        *Created by 4o image generation
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4.5 sm:gap-4 mx-auto">
        {images.map((image, index) => (
          <div
            key={index}
            className="relative aspect-square w-full rounded-sm overflow-hidden bg-transparent ring ring-neutral-800/10 dark:ring-neutral-200/10 flex items-center justify-center group"
          >
            <Image
              src={image.src}
              alt={image.title}
              fill
              className="object-contain p-8 transition-all duration-300 sm:group-hover:blur-sm sm:group-hover:opacity-50 ease-in-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
              <h3 className="text-2xl font-medium text-neutral-800 dark:text-neutral-200 font-lora">
                {image.title}
              </h3>
            </div>
          </div>
        ))}
      </div>
      <div className="py-12"></div>
    </div>
  );
}
