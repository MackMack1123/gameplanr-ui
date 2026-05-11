"use client";

import React, { useEffect, useRef, useState } from "react";
import { COLORS, RADIUS, TYPE } from "../tokens";

export interface CarouselProps {
  children: React.ReactNode;
  /** Show the prev/next arrow controls. Default true. */
  showArrows?: boolean;
  /** Show the dot indicator strip below the slides. Default true. */
  showDots?: boolean;
  /** Pixel gap between slides. Default 12. */
  gap?: number;
  /** Width per slide as a CSS length. Default "100%". */
  slideWidth?: string;
  /** ARIA label for the region. Default "Carousel". */
  ariaLabel?: string;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Horizontal scroll-snap carousel. No autoplay, no fancy easing — just
 * arrows + dots over a native scroll-snap track. Each direct child becomes
 * one slide.
 *
 *   <Carousel>
 *     <img src="..."/>
 *     <img src="..."/>
 *     <img src="..."/>
 *   </Carousel>
 */
export function Carousel({
  children,
  showArrows = true,
  showDots = true,
  gap = 12,
  slideWidth = "100%",
  ariaLabel = "Carousel",
  className,
  style,
}: CarouselProps) {
  const slides = React.Children.toArray(children);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const onScroll = () => {
      const slideEls = track.children;
      if (!slideEls.length) return;
      const trackLeft = track.scrollLeft;
      let nearestIdx = 0;
      let nearestDist = Infinity;
      for (let i = 0; i < slideEls.length; i++) {
        const child = slideEls[i] as HTMLElement;
        const dist = Math.abs(child.offsetLeft - trackLeft);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIdx = i;
        }
      }
      setActive(nearestIdx);
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => track.removeEventListener("scroll", onScroll);
  }, []);

  const goTo = (idx: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[idx] as HTMLElement | undefined;
    if (!child) return;
    track.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
  };

  const prev = () => goTo(Math.max(0, active - 1));
  const next = () => goTo(Math.min(slides.length - 1, active + 1));

  return (
    <section
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      className={className}
      style={{
        position: "relative",
        fontFamily: TYPE.family.sans,
        ...style,
      }}
    >
      <div
        ref={trackRef}
        style={{
          display: "flex",
          gap,
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          scrollbarWidth: "none",
          msOverflowStyle: "none",
        }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${i + 1} of ${slides.length}`}
            style={{
              flex: `0 0 ${slideWidth}`,
              scrollSnapAlign: "start",
              scrollSnapStop: "always",
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {showArrows && slides.length > 1 && (
        <>
          <ArrowButton side="left" onClick={prev} disabled={active === 0} />
          <ArrowButton side="right" onClick={next} disabled={active === slides.length - 1} />
        </>
      )}

      {showDots && slides.length > 1 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 6,
            marginTop: 12,
          }}
        >
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === active ? "true" : undefined}
              onClick={() => goTo(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: "none",
                padding: 0,
                background: i === active ? COLORS.green[600] : COLORS.surface.border,
                cursor: "pointer",
                transition: "background-color 140ms ease",
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function ArrowButton({
  side,
  onClick,
  disabled,
}: {
  side: "left" | "right";
  onClick: () => void;
  disabled: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={side === "left" ? "Previous slide" : "Next slide"}
      disabled={disabled}
      onClick={onClick}
      style={{
        position: "absolute",
        top: "50%",
        [side]: 8,
        transform: "translateY(-50%)",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: "rgba(15,23,42,0.7)",
        color: "#fff",
        border: "none",
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.3 : 1,
        fontSize: 16,
        lineHeight: 1,
        boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        transition: "opacity 120ms ease, background-color 120ms ease",
      } as React.CSSProperties}
    >
      {side === "left" ? "‹" : "›"}
    </button>
  );
}
