import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/manifesto/Nav";
import { Hero } from "@/components/manifesto/Hero";
import { Rule } from "@/components/manifesto/primitives";
import {
  WhyNow,
  Signals,
  Shift,
  NewCustomer,
  Frankenstack,
  Independence,
  Thesis,
} from "@/components/manifesto/sections-a";
import {
  Category,
  TwoBuilders,
  TeachingAI,
  Catalyst,
  WhyZoho,
} from "@/components/manifesto/sections-b";
import { MediaCenter, FAQ, Manifesto } from "@/components/manifesto/sections-c";
import { Declaration, Closing } from "@/components/manifesto/sections-d";

const TITLE = "The Cloud Independence Manifesto — Catalyst 3.0";
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
          headline: "The Cloud Independence Manifesto",
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
      <WhyNow />
      <Rule />
      <Signals />
      <Rule />
      <Shift />
      <Rule />
      <NewCustomer />
      <Rule />
      <Frankenstack />
      <Rule />
      <Independence />
      <Rule />
      <Thesis />
      <Rule />
      <Category />
      <Rule />
      <TwoBuilders />
      <Rule />
      <TeachingAI />
      <Rule />
      <Catalyst />
      <Rule />
      <WhyZoho />
      <Rule />
      <MediaCenter />
      <Rule />
      <FAQ />
      <Manifesto />
      <Declaration />
      <Closing />
    </main>
  );
}
