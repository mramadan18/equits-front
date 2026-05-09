import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Discover Talents",
  description:
    "Find skilled professionals, co-founders, and team members for your startup on Equits.",
  alternates: { canonical: "/talents" },
};

export default function TalentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
