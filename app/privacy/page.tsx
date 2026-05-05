import React from "react";

export default function PrivacyPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="text-center justify-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
          Privacy Policy
        </h1>
        <p className="text-lg text-default-500">Last updated: May 5, 2026</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none text-default-700">
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            1. Introduction
          </h2>
          <p className="mb-4">
            At Equits, we take your privacy seriously. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your
            information when you visit our platform. Equits connects visionaries
            with talents, and doing so requires processing certain personal and
            professional data.
          </p>
          <p>
            By using Equits, you agree to the collection and use of information
            in accordance with this Privacy Policy.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            2. Information We Collect
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Account Information:</strong> When you register, we
              collect your name, email address, password, and authentication
              data (such as Google OAuth tokens).
            </li>
            <li>
              <strong>Profile Data:</strong> Information you choose to add to
              your profile, including job titles, education, skills, contact
              information, and profile pictures.
            </li>
            <li>
              <strong>User Content:</strong> Project details, business plans,
              elevator pitches, comments, and messages you submit to the
              platform.
            </li>
            <li>
              <strong>Usage Data:</strong> We automatically collect data on how
              you interact with the platform, such as your IP address, browser
              type, device information, and pages visited.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            3. How We Use Your Information
          </h2>
          <p className="mb-4">
            We use the collected information for various purposes, including:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              To provide, maintain, and improve our completely free platform.
            </li>
            <li>
              To match startups with the right talents and facilitate
              connections.
            </li>
            <li>
              To notify you about changes to our platform, security updates, or
              relevant project opportunities.
            </li>
            <li>
              To monitor the usage of the platform and detect, prevent, and
              address technical issues.
            </li>
          </ul>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            4. Sharing Your Information
          </h2>
          <p className="mb-4">
            The core purpose of Equits is to make your professional profile and
            startup ideas visible to the right people.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              <strong>Publicly Shared Data:</strong> Your talent profile and
              public project pitches can be seen by other registered users to
              facilitate collaboration.
            </li>
            <li>
              <strong>Controlled Visibility:</strong> For sensitive startup
              ideas, you control the visibility (e.g., Request-to-View). We only
              share this data with users you explicitly grant access to.
            </li>
            <li>
              <strong>Legal Requirements:</strong> We may disclose your data if
              required by law, in response to valid requests by public
              authorities, or to protect the rights and safety of Equits and its
              users.
            </li>
          </ul>
          <p className="mt-4">
            <strong>Note:</strong> Equits will never sell your personal data to
            third parties for marketing purposes.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            5. Cookies and Tracking
          </h2>
          <p>
            We use cookies and similar tracking technologies to track the
            activity on our platform and store certain information. Cookies are
            files with a small amount of data which may include an anonymous
            unique identifier. You can instruct your browser to refuse all
            cookies, but some parts of our service may not function properly
            without them.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            6. Data Security
          </h2>
          <p>
            The security of your data is important to us. We implement
            industry-standard security measures to protect your personal
            information and startup ideas from unauthorized access. However,
            please remember that no method of transmission over the Internet or
            method of electronic storage is 100% secure.
          </p>
        </section>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-foreground mb-4">
            7. Your Data Rights
          </h2>
          <p className="mb-4">
            You maintain full control over your personal data. You have the
            right to:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>
              Access, update, or delete the personal information we have on you.
            </li>
            <li>
              Change your privacy and visibility settings for projects and ideas
              at any time.
            </li>
            <li>Request a copy of the data we hold about you.</li>
          </ul>
        </section>

        <div className="mt-16 pt-8 border-t border-divider text-center">
          <p className="text-default-500">
            If you have any questions about this Privacy Policy, please contact
            us at{" "}
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
