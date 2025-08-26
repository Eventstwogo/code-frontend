import Image from "next/image";
import { useState } from "react";

interface AdImageProps {
  src: string;
  alt: string;
}

export default function AdImage({ src, alt }: AdImageProps) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      fill
      className="absolute inset-0 w-full h-full object-cover"
      onError={() => setImgSrc("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAosB9j6E4e4AAAAASUVORK5CYII=")}
    />
  );
}
