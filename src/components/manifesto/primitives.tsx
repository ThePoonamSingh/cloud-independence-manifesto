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
  children,
  className = "",
}: {
  id: string;
  kicker?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`relative mx-auto w-full max-w-6xl px-6 py-28 md:px-10 md:py-40 ${className}`}
    >
      {kicker && (
        <Reveal>
          <div className="mb-10 md:mb-16">
            <span className="kicker">{kicker}</span>
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

export function PullQuote({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const share = (network: "x" | "li") => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const href =
      network === "x"
        ? `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}"`)}&url=${encodeURIComponent(url)}`
        : `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
    window.open(href, "_blank", "noopener,noreferrer");
  };
  return (
    <figure className="group relative border-l border-signal/50 pl-6 md:pl-10">
      <blockquote className="display text-3xl md:text-5xl">{text}</blockquote>
      <figcaption className="mt-5 flex flex-wrap gap-3 text-xs opacity-60 transition-opacity group-hover:opacity-100">
        <button
          className="kicker transition-colors hover:text-signal"
          onClick={() => {
            navigator.clipboard?.writeText(text);
            setCopied(true);
            setTimeout(() => setCopied(false), 1600);
          }}
        >
          {copied ? "Copied" : "Copy quote"}
        </button>
        <button className="kicker transition-colors hover:text-signal" onClick={() => share("x")}>
          Tweet this
        </button>
        <button className="kicker transition-colors hover:text-signal" onClick={() => share("li")}>
          Share on LinkedIn
        </button>
      </figcaption>
    </figure>
  );
}
