import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
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
                  <Link
                    to="#link"
                    className="hover:bg-background dark:hover:border-t-border bg-muted group mx-auto flex w-fit items-center gap-4 rounded-full border p-1 pl-4 shadow-md shadow-zinc-950/5 transition-colors duration-300 dark:border-t-white/5 dark:shadow-zinc-950"
                  >
                    <span className="text-foreground text-xs sm:text-sm">
                      Introducing Support for AI Models
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
                  </Link>
                </AnimatedGroup>

                {/* Hero Heading */}
                <TextEffect
                  preset="fade-in-blur"
                  speedSegment={0.3}
                  as="h1"
                  className="mt-6 text-balance text-4xl sm:text-5xl md:text-6xl lg:mt-16 xl:text-[5.25rem]"
                >
                  Modern Solutions for Customer Engagement
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
                  Highly customizable components for building modern websites
                  and applications that look and feel the way you mean it.
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
                    <Link to="#link">
                      <span className="text-nowrap">Start Building</span>
                    </Link>
                  </Button>

                  <Button
                    asChild
                    size="lg"
                    variant="ghost"
                    className="rounded-lg px-4 text-sm sm:px-5 sm:text-base"
                  >
                    <Link to="#link">
                      <span className="text-nowrap">Request a demo</span>
                    </Link>
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
              <div className="relative mt-6 px-2 sm:mt-10 md:mt-20">
                <div
                  aria-hidden
                  className="bg-linear-to-b to-background absolute inset-0 z-10 from-transparent from-35%"
                />
                <div className="inset-shadow-2xs ring-background dark:inset-shadow-white/20 bg-background relative mx-auto w-full max-w-4xl overflow-hidden rounded-xl border p-2 sm:rounded-2xl sm:p-4 shadow-lg shadow-zinc-950/15 ring-1">
                  <img
                    className="aspect-[15/8] w-full rounded-xl dark:block"
                    src="/mail2.png"
                    alt="app screen"
                  />
                  <img
                    className="aspect-[15/8] w-full rounded-xl dark:hidden"
                    src="/mail2-light.png"
                    alt="app screen"
                  />
                </div>
              </div>
            </AnimatedGroup>
          </div>
        </section>

        {/* Customers Section */}
        <section className="bg-background pb-12 pt-12 sm:pb-16 sm:pt-16 md:pb-32">
          <div className="group relative m-auto max-w-5xl px-4 sm:px-6">
            <div className="absolute inset-0 z-10 flex scale-95 items-center justify-center opacity-0 duration-500 group-hover:scale-100 group-hover:opacity-100">
              <Link
                to="/"
                className="block text-xs sm:text-sm duration-150 hover:opacity-75"
              >
                <span>Meet Our Customers</span>
                <ChevronRight className="ml-1 inline-block size-3" />
              </Link>
            </div>
            <div className="group-hover:blur-xs mx-auto mt-8 grid grid-cols-2 gap-x-8 gap-y-6 transition-all duration-500 sm:mt-12 sm:grid-cols-3 sm:gap-x-12 sm:gap-y-8 md:max-w-2xl md:grid-cols-4">
              {[
                "nvidia",
                "column",
                "github",
                "nike",
                "lemonsqueezy",
                "laravel",
                "lilly",
                "openai",
              ].map((name, i) => (
                <div className="flex" key={i}>
                  <img
                    className="mx-auto h-5 w-fit dark:invert"
                    src={`https://html.tailus.io/blocks/customers/${name}.svg`}
                    alt={`${name} Logo`}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
