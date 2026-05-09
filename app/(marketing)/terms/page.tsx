import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Read the Equits Terms of Service. Understand your rights, responsibilities, and how our free startup platform operates.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center justify-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-default-500">Last updated: May 5, 2026</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-default-700">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            1. Introduction
          </h2>
          <p className="mb-4">
            Welcome to Equits. These Terms of Service (&quot;Terms&quot;) govern
            your use of the Equits website, platform, and services. Equits is a
            completely free platform designed to help entrepreneurs pitch their
            startup ideas, build teams, and connect with talented individuals.
          </p>
          <p>
            By accessing or using our platform, you agree to be bound by these
            Terms. If you disagree with any part of the terms, you may not
            access the service.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            2. User Accounts
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              You must be at least 18 years old to create an account on Equits.
            </li>
            <li>
              You are responsible for safeguarding the password that you use to
              access the platform.
            </li>
            <li>
              You must provide accurate and complete information when creating
              an account. Impersonating others or providing false information
              violates these Terms.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            3. Pitching and Intellectual Property
          </h2>
          <p className="mb-4">
            Equits allows you to post (&quot;Pitch&quot;) business ideas,
            elevator pitches, and business plans.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Your Ownership:</strong> You retain all rights and
              ownership to the ideas, intellectual property, and content you
              choose to publish on Equits.
            </li>
            <li>
              <strong>Visibility:</strong> You hold the responsibility of
              choosing the visibility of your pitch (e.g., Public, Private,
              Request-to-View). We recommend being cautious about sharing
              sensitive trade secrets publicly.
            </li>
            <li>
              <strong>No Liability:</strong> While Equits provides a platform
              for connection, we cannot guarantee that other users will not
              attempt to copy public concepts. Equits is not liable for
              intellectual property disputes between users.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            4. Acceptable Use &amp; Conduct
          </h2>
          <p className="mb-4">You agree not to use the platform to:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Post intentionally deceptive, spammy, or fraudulent startup
              pitches.
            </li>
            <li>
              Harass, abuse, or threaten other users, talents, or founders.
            </li>
            <li>
              Use the platform for any illegal activities or to promote illegal
              acts.
            </li>
            <li>
              Attempt to hack, destabilize, or scrape the platform&apos;s
              database.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            5. A 100% Free Platform
          </h2>
          <p>
            Equits is committed to fostering innovation without financial
            barriers. Our platform is completely free to use for pitching ideas
            and connecting with talents. We do not ask for credit card
            information, nor do we take any equity from the startups formed
            through our platform.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            6. Disclaimer of Warranties
          </h2>
          <p>
            The platform is provided on an &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; basis. Equits makes no warranties, expressed or
            implied, regarding the success, funding, or talent acquisition of
            any startup pitched on our platform. We do not endorse or verify the
            technical or business viability of the ideas presented.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            7. Termination
          </h2>
          <p>
            We may terminate or suspend your account immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if you breach the Terms. Upon termination, your right to
            use the service will immediately cease.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            8. Changes to Terms
          </h2>
          <p>
            We reserve the right, at our sole discretion, to modify or replace
            these Terms at any time. We will notify users of any substantial
            changes. By continuing to access or use our service after those
            revisions become effective, you agree to be bound by the revised
            terms.
          </p>
        </section>

        <div className="mt-16 pt-8 border-t border-divider text-center">
          <p className="text-default-500">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:info@equits.net"
              className="text-primary hover:underline"
            >
              info@equits.net
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
