"use client";
import { cn } from "../../utils/cn";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradient = ({
  children,
  className,
  containerClassName,
  animate = true,
}: {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  animate?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (animate) {
      const handleMouseMove = (e: MouseEvent) => {
        const container = containerRef.current;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setPos({ x, y });
      };

      window.addEventListener("mousemove", handleMouseMove);

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [animate]);

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden rounded-[inherit]",
        containerClassName
      )}
      ref={containerRef}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-0 transition duration-300 ease-in-out",
          className
        )}
        style={{
          background: animate
            ? `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(255,182,255,.1), transparent 40%)`
            : "",
        }}
      />
      {children}
    </div>
  );
};

