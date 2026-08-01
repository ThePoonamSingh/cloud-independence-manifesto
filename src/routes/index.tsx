import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/manifesto/Nav";
import { Hero } from "@/components/manifesto/Hero";
import { Rule } from "@/components/manifesto/primitives";
import {
  Signals,
  Shift,
  Frankenstack,
  Independence,
} from "@/components/manifesto/sections-a";
import {
  Category,
  WhatsNew,
  TwoBuilders,
  TeachingAI,
} from "@/components/manifesto/sections-b";
import { Vision } from "@/components/manifesto/sections-c";
import { Declaration, Closing } from "@/components/manifesto/sections-d";

const TITLE = "Catalyst 3.0 — Cloud Independence";
const DESCRIPTION =
  "A movement for developers who build software, not infrastructure — and the case for the Agent-Ready Cloud, a new category of cloud designed for developers and AI agents alike.";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "article" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
      {
        name: "news_keywords",
        content:
          "Cloud Independence, Agent-Ready Cloud, Catalyst 3.0, AI agents, cloud infrastructure, developer platform",
      },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Article",
          headline: "Catalyst 3.0 — Cloud Independence",
          description: DESCRIPTION,
          about: ["Cloud Independence", "Agent-Ready Cloud"],
          articleSection: "Technology",
        }),
      },
    ],
  }),
});

function Index() {
  return (
    <main id="top">
      <Nav />
      <Hero />
      <Rule />
      <Signals />
      <Rule />
      <Shift />
      <Rule />
      <Frankenstack />
      <Rule />
      <Vision />
      <Rule />
      <Independence />
      <Rule />
      <Category />
      <Rule />
      <WhatsNew />
      <Rule />
      <TwoBuilders />
      <Rule />
      <TeachingAI />
      <Rule />
      <Declaration />
      <Closing />
    </main>
  );
}
