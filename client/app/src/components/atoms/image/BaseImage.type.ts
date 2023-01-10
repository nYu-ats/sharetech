import { StaticImageData } from "next/image";

export type BaseImageProps = {
  src: StaticImageData | string;
  alt: string;
};
