"use client";

import { useEffect, useState } from "react";

interface PreloaderProps {
  onFinish?: () => void;
  onLogoMerge?: () => void;
}

export default function Preloader({ onFinish, onLogoMerge }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<
    "loading" | "merging" | "wiping" | "done"
  >("loading");
  const [shouldRender, setShouldRender] = useState(true);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    const duration = 2000;
    const intervalMs = 20;
    const totalSteps = duration / intervalMs;
    let step = 0;

    const timer = setInterval(() => {
      step += 1;

      const currentProgress = Math.min(
        100,
        Math.round((step / totalSteps) * 100)
      );

      setProgress(currentProgress);

      if (step >= totalSteps) {
        clearInterval(timer);

        setTimeout(() => {
          setPhase("merging");

          setTimeout(() => {
            if (onLogoMerge) onLogoMerge();

            setPhase("wiping");

            setTimeout(() => {
              setPhase("done");
              setShouldRender(false);
              document.body.style.overflow = "";

              if (onFinish) onFinish();
            }, 900);
          }, 800);
        }, 200);
      }
    }, intervalMs);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onFinish, onLogoMerge]);

  if (!shouldRender) return null;

  const isMerging =
    phase === "merging" || phase === "wiping" || phase === "done";

  return (
    <div
      className="fixed inset-0 z-50 bg-black text-white pointer-events-none"
      style={{
        clipPath:
          phase === "wiping" || phase === "done"
            ? "polygon(100% 0, 100% 0, 100% 0, 100% 0)"
            : "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        transitionProperty: "clip-path",
        transitionDuration: "900ms",
        transitionTimingFunction:
          "cubic-bezier(0.77, 0, 0.175, 1)",
      }}
    >
{/* =========================
    CENTERED BRAND
========================== */}
<div className="absolute inset-0 flex items-center justify-center px-6">
  <div
    className={`
      flex flex-col items-stretch
      transition-all duration-800
      ease-[cubic-bezier(0.65,0,0.35,1)]
      ${
        isMerging
          ? "fixed top-6 left-6 md:top-8 md:left-12 origin-top-left"
          : ""
      }
    `}
  >
    {/* NASSER */}
    <span
      className="
        self-end
        uppercase
        tracking-tighter
        font-brand
        font-semibold
        leading-[0.8]
        text-6xl
        sm:text-8xl
        md:text-9xl
      "
    >
      NASSER
    </span>

    {/* AN EMIRATI INFLUENCER */}
    <span
      className={`
        w-full
        text-right
        mt-4
        text-[9px]
        sm:text-xs
        md:text-sm
        font-display
        tracking-[0.25em]
        sm:tracking-[0.3em]
        md:tracking-[0.35em]
        text-zinc-400
        uppercase
        whitespace-nowrap
        transition-opacity duration-300
        ${isMerging ? "opacity-0" : "opacity-100"}
      `}
    >
      AN EMIRATI INFLUENCER
    </span>
  </div>
</div>

      {/* =========================
          PROGRESS
      ========================== */}
      <div
        className={`
          absolute bottom-0 left-0 w-full
          px-6 md:px-12 pb-8
          flex flex-col gap-3
          transition-opacity duration-300
          ${phase === "loading" ? "opacity-100" : "opacity-0"}
        `}
      >
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span>0%</span>
          <span className="font-bold text-white">{progress}%</span>
        </div>

        <div className="h-[2px] w-full bg-zinc-800 overflow-hidden rounded-full">
          <div
            className="h-full bg-white transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}