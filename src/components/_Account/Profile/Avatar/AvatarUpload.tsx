import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useCallback } from "react";

import Avatar from "@/components/Avatar";
import { compressImage } from "@/utils/imageCompression";

const AvatarUpload = ({
  defaultImage,
  selectedImage,
  onImageSelect,
  onError,
}: {
  defaultImage?: string;
  selectedImage?: any;
  onImageSelect?: any;
  onError?: any;
}) => {
  const handleFileSelect = useCallback(
    async (event: any) => {
      const file = event.target.files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        onError?.("Please select an image file");
        return;
      }

      const compressed = await compressImage(file, 0.5, 512);
      console.log("Original size:", file.size / 1024, "KB");
      console.log("Compressed size:", compressed.file.size / 1024, "KB");

      if (compressed.file.size > 5 * 1024 * 1024) {
        onError?.("File size should not exceed 5MB");
        return;
      }

      onImageSelect?.({
        file: compressed.file,
        previewUrl: compressed.previewUrl,
      });
    },
    [onImageSelect, onError]
  );

  const displayImage = selectedImage?.previewUrl || defaultImage;

  return (
    <div className="relative group inline-block">
      <Avatar
        src={displayImage}
        className="w-24 h-24 cursor-pointer text-large"
        size={64}
      />
      <label className="absolute inset-0 flex items-center justify-center rounded-full opacity-100 transition-opacity cursor-pointer">
        <Icon
          className="z-20 absolute bottom-0 right-0 rounded-full p-1 shadow bg-background-700"
          icon={"flowbite:edit-outline"}
          width={32}
        />
        <input
          type="file"
          className="hidden"
          accept="image/*"
          onChange={handleFileSelect}
        />
      </label>
    </div>
  );
};

export default AvatarUpload;
