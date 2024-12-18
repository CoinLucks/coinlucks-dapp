import { Icon } from "@iconify/react/dist/iconify.js";
import React, { useRef, useEffect, useState } from "react";

import { useScratcherContext } from "@/context/ScratcherContext";
import { ScratchStatus } from "@/types/bet";
import { cn } from "@/utils/cn";

interface Theme {
  background: string;
  textColor: string;
  maskColor: string;
  coverImage: string;
}

interface CanvasSize {
  width: number;
  height: number;
}

type Props = {
  scratchId?: number;
  width: number;
  height: number;
  theme: Theme;
  className?: any;
  classNames?: any;

  finishRatio?: number;

  children?: any;
};

const Scratcher = ({
  scratchId,
  width,
  height,
  theme,
  classNames,
  finishRatio,
  children,
}: Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scratchCanvasRef = useRef<HTMLCanvasElement>(null);
  const [currentTheme] = useState<Theme>(theme);
  const [canvasSize, setCanvasSize] = useState<CanvasSize>({
    width: width,
    height: height,
  });

  const { status, setStatus } = useScratcherContext();

  useEffect(() => {
    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);
    return () => window.removeEventListener("resize", updateCanvasSize);
  }, [currentTheme]);

  const updateCanvasSize = () => {
    if (containerRef.current) {
      setCanvasSize({ width: width, height: height });
    }
  };

  useEffect(() => {
    setupCanvas();
  }, [canvasSize]);

  const setupCanvas = () => {
    const scratchCanvas = scratchCanvasRef.current;
    if (!scratchCanvas) return;

    const ctx = scratchCanvas.getContext("2d");
    if (!ctx) return;

    scratchCanvas.width = canvasSize.width;
    scratchCanvas.height = canvasSize.height;

    if (currentTheme.coverImage) {
      const img = new Image();
      img.onload = () => {
        ctx.drawImage(img, 0, 0, ctx.canvas.width, ctx.canvas.height);
      };
      img.src = currentTheme.coverImage;
    } else {
      ctx.fillStyle = currentTheme.maskColor;
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    }
  };

  useEffect(() => {
    const scratchCanvas = scratchCanvasRef.current;
    if (!scratchCanvas) return;

    let isDrawing = false;
    let lastPoint: { x: number; y: number } | null = null;

    const scratch = (x: number, y: number) => {
      const ctx = scratchCanvas.getContext("2d");
      if (!ctx) return;

      ctx.globalCompositeOperation = "destination-out";
      ctx.lineWidth = canvasSize.width * 0.05;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";

      if (lastPoint) {
        ctx.beginPath();
        ctx.moveTo(lastPoint.x, lastPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
      }

      lastPoint = { x, y };

      if (status != ScratchStatus.REVEALED && isMostlyRevealed(ctx)) {
        revealAll();
      }

      if (status != ScratchStatus.SCRATCHING) {
        setStatus(ScratchStatus.SCRATCHING);
      }
    };

    const getPosition = (
      event: MouseEvent | TouchEvent
    ): { x: number; y: number } => {
      const rect = scratchCanvas.getBoundingClientRect();
      const scaleX = scratchCanvas.width / rect.width;
      const scaleY = scratchCanvas.height / rect.height;
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const clientY =
        "touches" in event ? event.touches[0].clientY : event.clientY;
      const x = (clientX - rect.left) * scaleX;
      const y = (clientY - rect.top) * scaleY;
      return { x, y };
    };

    const handleStart = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      isDrawing = true;
      const { x, y } = getPosition(event);
      lastPoint = { x, y };
    };

    const handleMove = (event: MouseEvent | TouchEvent) => {
      event.preventDefault();
      if (!isDrawing) return;
      const { x, y } = getPosition(event);
      scratch(x, y);
    };

    const handleEnd = () => {
      isDrawing = false;
      lastPoint = null;
    };

    scratchCanvas.addEventListener("mousedown", handleStart);
    scratchCanvas.addEventListener("mousemove", handleMove);
    scratchCanvas.addEventListener("mouseup", handleEnd);
    scratchCanvas.addEventListener("mouseout", handleEnd);
    scratchCanvas.addEventListener("touchstart", handleStart);
    scratchCanvas.addEventListener("touchmove", handleMove);
    scratchCanvas.addEventListener("touchend", handleEnd);

    return () => {
      scratchCanvas.removeEventListener("mousedown", handleStart);
      scratchCanvas.removeEventListener("mousemove", handleMove);
      scratchCanvas.removeEventListener("mouseup", handleEnd);
      scratchCanvas.removeEventListener("mouseout", handleEnd);
      scratchCanvas.removeEventListener("touchstart", handleStart);
      scratchCanvas.removeEventListener("touchmove", handleMove);
      scratchCanvas.removeEventListener("touchend", handleEnd);
    };
  }, [status, canvasSize]);

  const isMostlyRevealed = (ctx: CanvasRenderingContext2D): boolean => {
    const imageData = ctx.getImageData(
      0,
      0,
      ctx.canvas.width,
      ctx.canvas.height
    );
    const pixelData = imageData.data;
    let transparentPixels = 0;
    for (let i = 3; i < pixelData.length; i += 4) {
      if (pixelData[i] < 128) transparentPixels++;
    }

    return (
      transparentPixels / (ctx.canvas.width * ctx.canvas.height) >
      (finishRatio ?? 0.5)
    );
  };

  const revealAll = () => {
    const scratchCanvas = scratchCanvasRef.current;
    if (!scratchCanvas) return;
    const scratchCtx = scratchCanvas.getContext("2d");
    if (!scratchCtx) return;
    scratchCtx.clearRect(0, 0, scratchCanvas.width, scratchCanvas.height);

    setStatus(ScratchStatus.REVEALED);
  };

  return (
    <div ref={containerRef} className={classNames.container}>
      <div
        className={cn(
          "relative flex flex-row items-center w-full h-full",
          classNames.scratch
        )}
        style={{ width: "100%" }}
      >
        {children}
        <canvas
          ref={scratchCanvasRef}
          className={cn(
            "absolute top-0 left-0 w-full h-full",
            classNames.canvas
          )}
          style={{ touchAction: "none" }}
        />
        <Icon
          icon={"ic:twotone-swipe"}
          className={cn(
            "origin-bottom animate-swing-intermittent absolute top-1/2 left-1/2 -ml-9 hidden",
            {
              flex: status != ScratchStatus.SCRATCHING,
            }
          )}
          width={72}
        />
      </div>
    </div>
  );
};

export default Scratcher;
