import { useEffect, useRef, useState, type ReactNode } from "react";

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

export function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      data-visible={visible}
      style={{ transitionDelay: `${delay}ms` }}
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
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-5 py-20 sm:px-6 sm:py-28 md:px-10 md:py-40 ${className}`}
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
  return <div className="rule mx-auto w-full max-w-6xl" />;
}
