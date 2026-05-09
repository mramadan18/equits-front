import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Help Center",
  description:
    "Find answers to frequently asked questions, guides, and tutorials to get the most out of Equits.",
  alternates: { canonical: "/help-center" },
};

export default function HelpCenterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
