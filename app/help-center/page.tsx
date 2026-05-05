"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@heroui/input";
import { Accordion, AccordionItem } from "@heroui/accordion";
import { Button } from "@heroui/button";
import {
  MdSearch,
  MdAccountCircle,
  MdLightbulb,
  MdPeople,
  MdSecurity,
  MdMessage,
  MdArticle,
} from "react-icons/md";

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    {
      title: "Getting Started",
      icon: <MdArticle size={32} />,
      desc: "Learn the basics of Equits and how to navigate.",
    },
    {
      title: "Account & Profile",
      icon: <MdAccountCircle size={32} />,
      desc: "Manage your settings, privacy, and notifications.",
    },
    {
      title: "Projects & Ideas",
      icon: <MdLightbulb size={32} />,
      desc: "Everything about posting and updating business ideas.",
    },
    {
      title: "Finding Talents",
      icon: <MdPeople size={32} />,
      desc: "How to hire, collaborate, and build your dream team.",
    },
    {
      title: "Privacy & Security",
      icon: <MdSecurity size={32} />,
      desc: "Learn how we protect your intellectual property.",
    },
    {
      title: "Messaging & Communication",
      icon: <MdMessage size={32} />,
      desc: "Learn how to chat and interact with other users on the platform.",
    },
  ];

  const faqs = [
    {
      id: "1",
      question: "How do I publish my first idea or project?",
      answer:
        "To publish an idea, navigate to your dashboard and click on the 'Pitch' button. Fill in the required details including your Elevator Pitch, Business Plan, and Team requirements, then hit submit.",
    },
    {
      id: "2",
      question: "Is my intellectual property protected?",
      answer:
        "Yes. Equits values your intellectual property. You can choose the visibility of your project (Public, Private, or Request-to-View) and we have strict terms of service safeguarding user content.",
    },
    {
      id: "3",
      question: "How do I find co-founders or talents?",
      answer:
        "Head over to the 'Explore Talents' section. You can filter users based on their skills, availability, and experience. Once you find someone who fits your needs, you can connect with them directly.",
    },
    {
      id: "4",
      question: "Is Equits completely free to use?",
      answer:
        "Yes, Equits is completely free! You can pitch your ideas, browse startup projects, and connect with talents without any hidden fees or premium plans.",
    },
    {
      id: "5",
      question: "How can I reset my password?",
      answer:
        "If you forgot your password, go to the Login page and click on 'Forgot Password'. Enter your registered email address, and we will send you an OTP to securely reset your password.",
    },
  ];

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="bg-primary/5 py-20 border-b border-divider">
        <div className="container mx-auto px-4 max-w-4xl text-center flex flex-col items-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            How can we help you today?
          </h1>
          <p className="text-lg text-default-500 mb-10 max-w-2xl">
            Search for guides, tutorials, and frequently asked questions to get
            the most out of Equits.
          </p>

          <div className="w-full max-w-2xl relative">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for articles, topics, or FAQs..."
              size="lg"
              variant="faded"
              radius="full"
              startContent={
                <MdSearch className="text-default-400 ml-2" size={24} />
              }
              classNames={{
                input: "text-base",
                inputWrapper: "h-16 shadow-sm border-divider bg-content1",
              }}
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-7xl pt-16">
        {/* Topic Categories */}
        <h2 className="text-2xl font-bold mb-8 text-center">Explore Topics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          {categories.map((category, idx) => (
            <div
              key={idx}
              className="bg-content1 rounded-2xl p-6 border border-divider hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
            >
              <div className="text-primary bg-primary/10 w-fit p-4 rounded-xl mb-4 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{category.title}</h3>
              <p className="text-default-500 leading-relaxed">
                {category.desc}
              </p>
            </div>
          ))}
        </div>

        {/* FAQs using HeroUI Accordion */}
        <div className="max-w-3xl mx-auto mb-24">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <Accordion variant="splitted" className="px-0">
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                aria-label={faq.question}
                title={
                  <span className="font-medium text-lg">{faq.question}</span>
                }
                className="mb-2 shadow-none border border-divider bg-content1"
              >
                <p className="text-default-600 leading-relaxed pb-4">
                  {faq.answer}
                </p>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Support Block */}
        <div className="max-w-4xl mx-auto bg-primary border border-primary-500 rounded-3xl p-8 md:p-12 text-center text-primary-foreground">
          <h2 className="text-3xl font-bold mb-4">Still need help?</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-xl mx-auto">
            Our support team is always ready to assist you with any issues or
            questions you might have.
          </p>
          <Button
            as={Link}
            href="/contact"
            size="lg"
            className="bg-background text-foreground font-semibold"
          >
            Contact Support
          </Button>
        </div>
      </div>
    </div>
  );
}
