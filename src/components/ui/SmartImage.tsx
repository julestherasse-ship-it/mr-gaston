import Image, { type ImageProps } from "next/image";

type SmartImageProps = Omit<ImageProps, "alt"> & {
  alt: string;
};

export default function SmartImage({
  alt,
  fetchPriority = "auto",
  loading = "lazy",
  quality = 75,
  decoding = "async",
  sizes,
  ...props
}: SmartImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      fetchPriority={fetchPriority}
      loading={loading}
      quality={quality}
      decoding={decoding}
      sizes={sizes}
    />
  );
}
