import imageCompression from "browser-image-compression";

export interface CompressedImage {
  file: File;
  previewUrl: string;
}

export async function compressImage(
  file: File,
  maxSizeMB: number = 1,
  maxWidthOrHeight: number = 1024
): Promise<CompressedImage> {
  try {
    const options = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker: true,
    };

    const compressedFile = await imageCompression(file, options);

    const previewUrl = await imageCompression.getDataUrlFromFile(
      compressedFile
    );

    return {
      file: compressedFile,
      previewUrl,
    };
  } catch (error) {
    console.error("Error compressing image:", error);
    throw new Error("Failed to compress image");
  }
}
