import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Feed",
  description:
    "Your personalized project feed on Equits. Discover the latest startup ideas and projects.",
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
