import { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhatWeDo from "@/components/home/WhatWeDo";
import CreativeIdeas from "@/components/home/CreativeIdeas";
import Talents from "@/components/home/Talents";
import Wisdom from "@/components/home/Wisdom";
import Opinions from "@/components/home/Opinions";
import Faq from "@/components/home/Faq";
import { JsonLd } from "@/components/seo/JsonLd";

export const metadata: Metadata = {
  title: "Equits - Where Ideas Meet Talent",
  description:
    "Discover innovative startup ideas, connect with co-founders, and find talented professionals. Equits is the free platform that bridges visionaries and talent.",
  alternates: { canonical: "/" },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Equits",
  url: "https://equits.net",
  description:
    "A free platform connecting entrepreneurs with talented professionals.",
  potentialAction: {
    "@type": "SearchAction",
    target: "https://equits.net/explore?search={search_term_string}",
    "query-input": "required name=search_term_string",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Equits",
  url: "https://equits.net",
  logo: "https://equits.net/images/logo.png",
  description:
    "Equits is a free platform that bridges visionaries and talent, fostering innovation and collaboration.",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@equits.net",
    contactType: "customer support",
  },
};

export default function LandingPage() {
  return (
    <>
      <JsonLd data={websiteJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <Hero />
      <WhatWeDo />
      <CreativeIdeas />
      <Wisdom />
      <Talents />
      <Opinions />
      <Faq />
    </>
  );
}
