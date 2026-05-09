import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about Equits — our mission to connect great ideas with talented people, fostering innovation and collaboration.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      <div className="flex flex-col items-center justify-center space-y-8 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          About Us
        </h1>
        <p className="text-lg md:text-xl text-default-500 max-w-3xl">
          Welcome to Equits. We are a platform dedicated to bringing together
          creative minds, talented individuals, and groundbreaking ideas. Our
          mission is to foster innovation by providing a space where projects
          can find the right talent, and talents can find the perfect projects.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mt-20">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold">Our Vision</h2>
          <p className="text-default-600 leading-relaxed">
            We envision a world where great ideas are never hindered by a lack
            of resources or connections. By bridging the gap between visionaries
            and skilled professionals, we aim to catalyze the creation of
            impactful projects that can change the world.
          </p>
        </div>
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl font-semibold">What We Do</h2>
          <p className="text-default-600 leading-relaxed">
            Our platform allows users to showcase their business plans, pitch
            their ideas, and build their teams. Whether you are an entrepreneur
            looking for a co-founder, or a developer looking for a startup to
            join, you will find your place here.
          </p>
        </div>
      </div>
    </div>
  );
}
