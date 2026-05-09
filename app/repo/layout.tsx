import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Projects",
  robots: { index: false, follow: false },
};

export default function RepoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
