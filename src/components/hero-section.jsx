import React from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TextEffect } from "@/components/ui/text-effect";
import { AnimatedGroup } from "@/components/ui/animated-group";
import { CarouselPlugin } from "./hero-components/Carousel";
import { HashLink } from "react-router-hash-link"; // ✅ use HashLink
import Footer from "./footer/Footer";

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

export default function HeroSection() {
  return (
    <>
      <main className="overflow-hidden">
        {/* Background visuals (hidden on mobile) */}
        <div
          aria-hidden
          className="absolute inset-0 isolate hidden opacity-65 contain-strict lg:block"
        >
          <div className="w-140 h-320 -translate-y-87.5 absolute left-0 top-0 -rotate-45 rounded-full bg-[radial-gradient(68.54%_68.72%_at_55.02%_31.46%,hsla(0,0%,85%,.08)_0,hsla(0,0%,55%,.02)_50%,hsla(0,0%,45%,0)_80%)]" />
          <div className="h-320 absolute left-0 top-0 w-60 -rotate-45 rounded-full bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.06)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)] [translate:5%_-50%]" />
          <div className="h-320 -translate-y-87.5 absolute left-0 top-0 w-60 -rotate-45 bg-[radial-gradient(50%_50%_at_50%_50%,hsla(0,0%,85%,.04)_0,hsla(0,0%,45%,.02)_80%,transparent_100%)]" />
        </div>

        {/* Hero Section */}
        <section>
          <div className="relative pt-10 sm:pt-14 md:pt-16">
            {/* Decorative Animated Group */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      delayChildren: 1,
                    },
                  },
                },
                item: {
                  hidden: {
                    opacity: 0,
                    y: 20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    transition: {
                      type: "spring",
                      bounce: 0.3,
                      duration: 2,
                    },
                  },
                },
              }}
              className="absolute inset-0 -z-20"
            ></AnimatedGroup>

            {/* Background gradient */}
            <div className="absolute inset-0 -z-10 size-full [background:radial-gradient(125%_125%_at_50%_100%,transparent_0%,var(--color-background)_75%)]"></div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6">
              <div className="text-center sm:mx-auto lg:mr-auto lg:mt-0">
                {/* Tagline */}
                <AnimatedGroup variants={transitionVariants}>
                  <HashLink
                    smooth
                    to="#about"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-xs sm:text-sm">
                      Where Football Tactics Come Alive{" "}
                    </span>
                    <span className="dark:border-background block h-4 w-0.5 border-l bg-white dark:bg-zinc-700"></span>

                    <div className="bg-background group-hover:bg-muted size-6 overflow-hidden rounded-full duration-500">
                      <div className="flex w-12 -translate-x-1/2 duration-500 ease-in-out group-hover:translate-x-0">
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                        <span className="flex size-6">
                          <ArrowRight className="m-auto size-3" />
                        </span>
                      </div>
                    </div>
                  </HashLink>
                </AnimatedGroup>

                {/* Hero Heading */}
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl lg:mt-16 xl:text-[5.25rem] font-serif"
                >
                  The <span className=" text-green-400 ">U</span>
                  ltimate Tactics
                </TextEffect>

                {/* Hero Description */}
                <TextEffect
                  per="line"
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  delay={0.5}
                  as="p"
                  className="mx-auto mt-4 max-w-md text-balance text-base sm:mt-6 sm:max-w-xl sm:text-lg md:mt-8 md:max-w-2xl"
                >
                  Design Plays, Draw Runs, and Shape Formations with Ease on
                  Your Football Tactical Board.
                </TextEffect>

                {/* Buttons */}
                <AnimatedGroup
                  variants={{
                    container: {
                      visible: {
                        transition: {
                          staggerChildren: 0.05,
                          delayChildren: 0.75,
                        },
                      },
                    },
                    ...transitionVariants,
                  }}
                  className="mt-8 flex flex-col items-center justify-center gap-3 sm:mt-10 md:mt-12 md:flex-row"
                >
                  <Button
                    asChild
                    size="lg"
                    className="rounded-lg px-4 text-sm sm:px-5 sm:text-base"
                  >
                    <HashLink smooth to="/board">
                      <span className="text-nowrap">Get Started</span>
                    </HashLink>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="rounded-lg px-4 text-sm sm:px-5 sm:text-base"
                  >
                    <HashLink smooth to="/relive">
                      <span className="text-nowrap">Relive The Match</span>
                    </HashLink>
                  </Button>
                </AnimatedGroup>
              </div>
            </div>

            {/* Hero Image */}
            <AnimatedGroup
              variants={{
                container: {
                  visible: {
                    transition: {
                      staggerChildren: 0.05,
                      delayChildren: 0.75,
                    },
                  },
                },
                ...transitionVariants,
              }}
            >
              <div className="relative flex justify-center mt-6 px-4 sm:mt-10 md:mt-20">
                {/* Responsive width container */}
                <div className="w-11/12 max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-4xl xl:max-w-5xl ">
                  <CarouselPlugin />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="bg-background pb-5 pt-8 sm:pb-5 sm:pt-10 md:pb-5"
        >
          <AnimatedGroup variants={transitionVariants}>
            <div className="mx-auto w-10/12 max-w-4xl px-4 sm:px-6 text-left space-y-5">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="text-3xl sm:text-4xl font-semibold  dark:text-zinc-200"
              >
                What is this??
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.2}
                as="p"
                className="text-sm sm:text-base md:text-md text-zinc-500 dark:text-zinc-400"
              >
                This project is a{" "}
                <span className="font-semibold">Football Tactical Board</span> —
                designed to bring your tactical ideas to life. Whether you want
                to draw attacking runs, set up defensive shapes, or experiment
                with player rotations, the board gives you a simple yet powerful
                way to plan and visualize strategies.
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.4}
                as="p"
                className="text-sm sm:text-base md:text-md text-zinc-500 dark:text-zinc-400"
              >
                You can{" "}
                <span className="font-medium">create custom formations</span>,
                save them for later, and reuse them whenever you need. It’s not
                just about placing players — it’s about shaping the game the way
                you imagine it. From grassroots training sessions to analyzing
                professional-level matches, this board is built to adapt to your
                style of thinking.
              </TextEffect>
            </div>
          </AnimatedGroup>
        </section>
        <section
          id="whatnext"
          className="bg-background pb-12 pt-5 sm:pb-16 sm:pt-10 md:pb-20"
        >
          <AnimatedGroup variants={transitionVariants}>
            <div className="mx-auto w-10/12 max-w-4xl px-4 sm:px-6 text-left space-y-5">
              <TextEffect
                preset="fade-in-blur"
                speedSegment={0.3}
                as="h2"
                className="text-3xl sm:text-4xl font-semibold  dark:text-zinc-200"
              >
                What comes ahead??
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.2}
                as="p"
                className="text-sm sm:text-base md:text-md text-zinc-500 dark:text-zinc-400"
              >
                I’m just getting started. One of the next big additions will be{" "}
                <span className="font-semibold">Relive the Match</span> — a
                feature where you can instantly jump back to iconic classic
                games and explore their real formations with a single click. No
                need to search, no hassle — just pure tactical nostalgia at your
                fingertips.
              </TextEffect>
              <TextEffect
                per="line"
                preset="fade-in-blur"
                speedSegment={0.3}
                delay={0.4}
                as="p"
                className="text-sm sm:text-base md:text-md text-zinc-500 dark:text-zinc-400"
              >
                Looking further ahead, I plan to experiment with{" "}
                <span className="font-medium">AI-powered insights</span> and{" "}
                <span className="font-medium">live connect features</span> —
                tools that could analyze matches in real-time, suggest tactical
                adjustments, or even let you share and collaborate on strategies
                instantly with others. This board isn’t just about the present;
                it’s about shaping the future of how we experience football
                tactics.
              </TextEffect>
            </div>
          </AnimatedGroup>
        </section>
        <Footer/>
      </main>
    </>
  );
}
