"use client";

import { useRef, useEffect } from 'react';
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "Restaurant Owner",
    review: "Site Spark transformed our online presence. Our new website is beautiful and our online orders have doubled! The process was fast and easy.",
    avatarId: "user-1",
  },
  {
    name: "Rohan Patel",
    role: "Startup Founder",
    review: "The team delivered a professional and sleek website in just two days. Their pricing is unbeatable for the quality you get. Highly recommended!",
    avatarId: "user-2",
  },
  {
    name: "Anjali Mehta",
    role: "Digital Artist",
    review: "I'm in love with my new portfolio website. It perfectly captures my style and has helped me attract new clients. The support team was also very helpful.",
    avatarId: "user-3",
  },
];

const userImages = PlaceHolderImages.filter(img => img.id.startsWith('user'));

export default function TestimonialsSection() {
    const sectionRef = useRef<HTMLElement>(null);

    useEffect(() => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            entries[0].target.classList.add('fade-up');
            observer.unobserve(entries[0].target);
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
      id="testimonials"
      ref={sectionRef}
      className="py-16 md:py-24 bg-secondary opacity-0"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold">What Our Clients Say</h2>
          <p className="mt-4 max-w-2xl mx-auto text-muted-foreground">
            We're proud to have happy clients across various industries.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => {
            const avatar = userImages.find(img => img.id === testimonial.avatarId);
            return (
              <Card key={index} className="flex flex-col justify-between">
                <CardContent className="p-6">
                  <p className="text-muted-foreground mb-6">"{testimonial.review}"</p>
                  <div className="flex items-center">
                    <Avatar>
                      {avatar && <AvatarImage src={avatar.imageUrl} alt={testimonial.name} data-ai-hint={avatar.imageHint} />}
                      <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="ml-4">
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
