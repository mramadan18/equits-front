"use client";

import React, { useState, useCallback } from "react";
import Cropper, { Area, Point } from "react-easy-crop";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/modal";
import { Button } from "@heroui/button";
import { Slider } from "@heroui/slider";
import { useTranslations } from "next-intl";
import {
  LuZoomIn,
  LuZoomOut,
  LuRotateCcw,
  LuRotateCw,
  LuRefreshCcw,
} from "react-icons/lu";

interface ImageCropModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  image: string;
  onCropComplete: (croppedArea: Area, rotation: number) => void;
  aspectRatio?: number;
  cropSize?: { width: number; height: number };
  isLoading?: boolean;
}

export const ImageCropModal = ({
  isOpen,
  onOpenChange,
  image,
  onCropComplete,
  aspectRatio = 16 / 9,
  cropSize,
  isLoading,
}: ImageCropModalProps) => {
  const t = useTranslations("ImageCropModal");
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const onCropCompleteInternal = useCallback(
    (recalculatedCroppedArea: Area, recalculatedCroppedAreaPixels: Area) => {
      setCroppedAreaPixels(recalculatedCroppedAreaPixels);
    },
    [],
  );

  const handleReset = () => {
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setRotation(0);
  };

  const handleSave = () => {
    if (croppedAreaPixels) {
      onCropComplete(croppedAreaPixels, rotation);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      size="2xl"
      scrollBehavior="inside"
      backdrop="blur"
      className="bg-white/90 backdrop-blur-lg"
    >
      <ModalContent>
        <ModalHeader className="flex flex-row items-center justify-between gap-1 text-dark border-b border-gray-100">
          <span className="font-semibold text-xl">{t("title")}</span>
          <Button
            variant="light"
            color="danger"
            size="sm"
            startContent={<LuRefreshCcw size={16} />}
            onPress={handleReset}
            className="font-medium"
          >
            {t("reset")}
          </Button>
        </ModalHeader>
        <ModalBody className="p-6">
          <div className="relative w-full h-96 bg-gray-50 rounded-2xl overflow-hidden border border-gray-100 shadow-inner group">
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              rotation={rotation}
              aspect={aspectRatio}
              onCropChange={setCrop}
              cropSize={cropSize}
              onCropComplete={onCropCompleteInternal}
              onZoomChange={setZoom}
              onRotationChange={setRotation}
            />
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2 bg-black/50 backdrop-blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white text-xs font-medium">
                Drag to move • Scroll to zoom
              </span>
            </div>
          </div>

          <div className="mt-8 space-y-6">
            {/* Zoom Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray2">
                  <LuZoomOut size={18} />
                  <span className="text-sm font-medium">{t("zoom")}</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  {zoom.toFixed(1)}x
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  size="sm"
                  step={0.1}
                  color="primary"
                  maxValue={3}
                  minValue={1}
                  value={zoom}
                  onChange={(value: number | number[]) =>
                    setZoom(Array.isArray(value) ? value[0] : value)
                  }
                  className="flex-1"
                />
                <LuZoomIn className="text-gray3" size={18} />
              </div>
            </div>

            {/* Rotation Control */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray2">
                  <LuRotateCcw size={18} />
                  <span className="text-sm font-medium">{t("rotation")}</span>
                </div>
                <span className="text-xs font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-md">
                  {rotation}°
                </span>
              </div>
              <div className="flex items-center gap-4">
                <Slider
                  size="sm"
                  step={1}
                  color="primary"
                  maxValue={180}
                  minValue={-180}
                  value={rotation}
                  onChange={(value: number | number[]) =>
                    setRotation(Array.isArray(value) ? value[0] : value)
                  }
                  className="flex-1"
                />
                <LuRotateCw className="text-gray3" size={18} />
              </div>
            </div>
          </div>
        </ModalBody>
        <ModalFooter className="border-t border-gray-100 bg-gray-50/50 p-4">
          <Button
            variant="light"
            onPress={onOpenChange}
            className="font-medium text-gray2"
          >
            {t("cancel")}
          </Button>
          <Button
            color="primary"
            onPress={handleSave}
            isLoading={isLoading}
            className="px-8 font-semibold bg-primary shadow-lg shadow-primary/20"
          >
            {t("save")}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
