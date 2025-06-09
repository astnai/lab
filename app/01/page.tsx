import Image from "next/image";

type ImageItem = {
  title: string;
  src: string;
};

const images: ImageItem[] = [
  {
    title: "iMac G4",
    src: "/01/imac-g4.webp",
  },
  {
    title: "New Balance Sneakers",
    src: "/01/new-balance-sneakers.webp",
  },
  {
    title: "Flower Bouquet",
    src: "/01/flowers.webp",
  },
  {
    title: "Link's Sword and Shield",
    src: "/01/link-sword-shield.webp",
  },
  {
    title: "Starbucks Coffee",
    src: "/01/starbucks-coffee.webp",
  },
  {
    title: "Mate",
    src: "/01/mate.webp",
  },
  {
    title: "Gameboy Cartridge",
    src: "/01/gameboy-cartridge.webp",
  },
  {
    title: "A Key",
    src: "/01/a-key.webp",
  },
  {
    title: "Macintosh Computer",
    src: "/01/macintosh.webp",
  },
  {
    title: "Straw Hat",
    src: "/01/straw-hat.webp",
  },
  {
    title: "Bonsai Tree",
    src: "/01/bonsai.webp",
  },
  {
    title: "Ergonomic Chair",
    src: "/01/chair.webp",
  },
  {
    title: "Medieval Helmet",
    src: "/01/helmet.webp",
  },
  {
    title: "NASA Spacecraft",
    src: "/01/nasa.webp",
  },
];

export default function Page05() {
  return (
    <div className="min-h-screen w-full mt-18 px-4.5 max-w-screen-md mx-auto">
      <div className="italic text-neutral-500 text-xs sm:text-sm mb-2">
        <span className="text-blue-500">*</span>Created by 4o image generation
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
