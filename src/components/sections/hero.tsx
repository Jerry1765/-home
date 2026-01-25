"use client";

import { useRef, useEffect, useState } from 'react';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.unobserve(sectionRef.current!);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className={cn(
        "relative w-full py-24 md:py-32 lg:py-40 transition-all duration-1000 ease-in-out overflow-hidden",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      )}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground">
          We Build Websites
          <br />
          That <span className="text-primary">Grow Your Business</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Professional, fast and affordable websites for small businesses in India.
        </p>
        <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
          <Button size="lg" asChild>
            <Link href="#contact">
              Get Your Website <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
