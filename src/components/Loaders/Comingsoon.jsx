// src/components/ComingSoon.jsx
import React from "react";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";

const transitionVariants = {
  item: {
    hidden: {
      opacity: 0,
      filter: "blur(12px)",
      y: 12,
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      y: 0,
      transition: {
        type: "spring",
        bounce: 0.3,
        duration: 1.5,
      },
    },
  },
};

export default function ComingSoon({subtitle}) {
  return (
    <section className="bg-background flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <AnimatedGroup variants={transitionVariants}>
        {/* Title */}
        <TextEffect
          preset="fade-in-blur"
          speedSegment={0.3}
          as="h1"
          className="text-4xl sm:text-5xl md:text-6xl font-serif text-foreground"
        >
          Coming <span className="text-green-400">Soon</span>
        </TextEffect>

        {/* Subtitle */}
        <TextEffect
          per="line"
          preset="fade-in-blur"
          speedSegment={0.3}
          delay={0.4}
          as="p"
          className="mt-4 max-w-lg mx-auto text-base sm:text-lg md:text-xl text-zinc-600 dark:text-zinc-400"
        >
            {subtitle}
        </TextEffect>
      </AnimatedGroup>
    </section>
  );
}
