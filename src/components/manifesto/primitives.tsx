import { useEffect, useRef, useState, type ReactNode } from "react";

const prefersReducedMotion = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) if (e.isIntersecting) setVisible(true);
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return { ref, visible };
}

/**
 * Scroll choreography: writes a normalised 0→1 travel value for the element
 * onto CSS custom properties so a section can *enter* (settle up into place)
 * and *hand off* (recede slightly) as the next one arrives.
 */
export function useScrollStage<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--enter", "1");
      el.style.setProperty("--exit", "0");
      return;
    }

    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 1;
      // enter: 0 while fully below the fold, 1 once the top third is reached
      const enter = clamp((vh - rect.top) / (vh * 0.55));
      // exit: starts only once the section's bottom passes the upper third
      const exit = clamp((vh * 0.35 - rect.bottom) / (vh * 0.5));
      el.style.setProperty("--enter", enter.toFixed(3));
      el.style.setProperty("--exit", exit.toFixed(3));
    };

    const onScroll = () => {
      if (!active || frame) return;
      frame = requestAnimationFrame(update);
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) active = e.isIntersecting;
        if (active) update();
      },
      { rootMargin: "20% 0px 20% 0px" },
    );
    io.observe(el);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return ref;
}

function clamp(n: number) {
  return n < 0 ? 0 : n > 1 ? 1 : n;
}

export function Reveal({
  children,
  delay = 0,
  step,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  /** Position in the section's reading order — staggers the reveal. */
  step?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  const total = delay + (step ? step * 90 : 0);
  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${total}ms` }}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

export function Section({
  id,
  kicker,
  kickerClassName = "",
  children,
  className = "",
}: {
  id: string;
  kicker?: string;
  kickerClassName?: string;
  children: ReactNode;
  className?: string;
}) {
  const stageRef = useScrollStage<HTMLElement>();
  return (
    <section
      id={id}
      ref={stageRef}
      className={`section-stage relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-40 ${className}`}
    >
      {kicker && (
        <Reveal>
          <div className="mb-10 md:mb-16">
            <span className={`kicker ${kickerClassName}`}>{kicker}</span>
          </div>
        </Reveal>
      )}
      {children}
    </section>
  );
}

export function Rule() {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className="mx-auto w-full max-w-6xl">
      <div className="rule rule-draw" data-visible={visible} />
    </div>
  );
}
