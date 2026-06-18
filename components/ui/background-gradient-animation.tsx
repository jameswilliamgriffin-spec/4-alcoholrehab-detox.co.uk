"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

export const BackgroundGradientAnimation = ({
  gradientBackgroundStart = "rgb(8, 19, 46)",
  gradientBackgroundEnd = "rgb(1, 7, 24)",
  firstColor = "18, 113, 255",
  secondColor = "221, 74, 255",
  thirdColor = "100, 220, 255",
  fourthColor = "42, 92, 220",
  fifthColor = "120, 130, 255",
  pointerColor = "140, 100, 255",
  size = "80%",
  blendingValue = "hard-light",
  children,
  className,
  interactive = true,
  containerClassName,
}: {
  gradientBackgroundStart?: string;
  gradientBackgroundEnd?: string;
  firstColor?: string;
  secondColor?: string;
  thirdColor?: string;
  fourthColor?: string;
  fifthColor?: string;
  pointerColor?: string;
  size?: string;
  blendingValue?: string;
  children?: React.ReactNode;
  className?: string;
  interactive?: boolean;
  containerClassName?: string;
}) => {
  const interactiveRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const curRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const [isSafari, setIsSafari] = useState(false);
  const [, forceRender] = useState(0);

  useEffect(() => {
    setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
  }, []);

  useEffect(() => {
    const move = () => {
      if (interactiveRef.current) {
        curRef.current.x += (targetRef.current.x - curRef.current.x) / 20;
        curRef.current.y += (targetRef.current.y - curRef.current.y) / 20;
        interactiveRef.current.style.transform = `translate(${Math.round(
          curRef.current.x,
        )}px, ${Math.round(curRef.current.y)}px)`;
      }

      animationFrameRef.current = window.requestAnimationFrame(move);
    };

    animationFrameRef.current = window.requestAnimationFrame(move);

    return () => {
      if (animationFrameRef.current) {
        window.cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    targetRef.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    forceRender((value) => value + 1);
  };

  const variables = {
    "--gradient-background-start": gradientBackgroundStart,
    "--gradient-background-end": gradientBackgroundEnd,
    "--first-color": firstColor,
    "--second-color": secondColor,
    "--third-color": thirdColor,
    "--fourth-color": fourthColor,
    "--fifth-color": fifthColor,
    "--pointer-color": pointerColor,
    "--size": size,
    "--blending-value": blendingValue,
  } as React.CSSProperties;

  return (
    <div
      className={cn(
        "absolute inset-0 overflow-hidden bg-[linear-gradient(40deg,var(--gradient-background-start),var(--gradient-background-end))]",
        containerClassName,
      )}
      style={variables}
      onMouseMove={interactive ? handleMouseMove : undefined}
      aria-hidden={!children}
    >
      <svg className="hidden">
        <defs>
          <filter id="blurMe">
            <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8"
              result="goo"
            />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>

      <div className={cn("relative z-10", className)}>{children}</div>

      <div
        className={cn(
          "gradients-container absolute inset-0 h-full w-full blur-lg",
          isSafari ? "blur-2xl" : "[filter:url(#blurMe)_blur(40px)]",
        )}
      >
        <div
          className={cn(
            "absolute bg-[radial-gradient(circle_at_center,rgba(var(--first-color),0.82)_0,rgba(var(--first-color),0)_50%)]",
            "h-[var(--size)] w-[var(--size)] left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[mix-blend-mode:var(--blending-value)] [transform-origin:center_center]",
            "animate-first opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute bg-[radial-gradient(circle_at_center,rgba(var(--second-color),0.8)_0,rgba(var(--second-color),0)_50%)]",
            "h-[var(--size)] w-[var(--size)] left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-400px)]",
            "animate-second opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute bg-[radial-gradient(circle_at_center,rgba(var(--third-color),0.8)_0,rgba(var(--third-color),0)_50%)]",
            "h-[var(--size)] w-[var(--size)] left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%+400px)]",
            "animate-third opacity-100",
          )}
        />
        <div
          className={cn(
            "absolute bg-[radial-gradient(circle_at_center,rgba(var(--fourth-color),0.8)_0,rgba(var(--fourth-color),0)_50%)]",
            "h-[var(--size)] w-[var(--size)] left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-200px)]",
            "animate-fourth opacity-70",
          )}
        />
        <div
          className={cn(
            "absolute bg-[radial-gradient(circle_at_center,rgba(var(--fifth-color),0.8)_0,rgba(var(--fifth-color),0)_50%)]",
            "h-[var(--size)] w-[var(--size)] left-[calc(50%-var(--size)/2)] top-[calc(50%-var(--size)/2)]",
            "[mix-blend-mode:var(--blending-value)] [transform-origin:calc(50%-800px)_calc(50%+800px)]",
            "animate-fifth opacity-100",
          )}
        />

        {interactive && (
          <div
            ref={interactiveRef}
            className={cn(
              "absolute -left-1/2 -top-1/2 h-full w-full",
              "bg-[radial-gradient(circle_at_center,rgba(var(--pointer-color),0.8)_0,rgba(var(--pointer-color),0)_50%)]",
              "[mix-blend-mode:var(--blending-value)] opacity-70",
            )}
          />
        )}
      </div>
    </div>
  );
};
