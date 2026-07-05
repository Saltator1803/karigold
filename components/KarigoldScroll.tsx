"use client";
import { useRef, useEffect } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import { Product } from "@/data/products";

export default function KarigoldScroll({ product }: { product: Product }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // This creates the "floating" movement
  const frameIndex = useTransform(scrollYProgress, [0, 1], [1, 120]);
  const yOffset = useTransform(scrollYProgress, [0, 1], ["0%", "-5%"]); 

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const images: HTMLImageElement[] = [];
    for (let i = 1; i <= 120; i++) {
      const img = new Image();
      // Changed to .jpg to match the renamed ezgif files
      img.src = `${product.folderPath}/${i}.jpg`;
      images.push(img);
    }

    const render = (idx: number) => {
      if (images[idx - 1] && ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = images[idx - 1];
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;
        ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
      }
    };

    const unsubscribe = frameIndex.on("change", (latest) => {
      render(Math.round(latest));
    });

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      render(1);
    };

    window.addEventListener("resize", handleResize);
    // Preload first frame manually after allowing images to load briefly
    setTimeout(handleResize, 100);
    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [product, frameIndex]);

  return (
    <div ref={containerRef} className="h-[600vh] bg-black">
      <motion.div style={{ y: yOffset }} className="sticky top-0 h-screen w-full">
        <canvas ref={canvasRef} className="w-full h-full" />
      </motion.div>
    </div>
  );
}
