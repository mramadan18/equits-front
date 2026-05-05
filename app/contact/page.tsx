"use client";

import React, { useState } from "react";
import { Button } from "@heroui/button";
import { Input, Textarea } from "@heroui/input";
import { MdEmail, MdPhone, MdLocationOn, MdAccessTime } from "react-icons/md";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  return (
    <div className="container mx-auto px-4 py-16 max-w-7xl">
      {/* Header section */}
      <div className="flex flex-col items-center justify-center space-y-4 mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
          Get in Touch
        </h1>
        <p className="text-lg text-default-500 max-w-2xl">
          Have a question, feedback, or want to explore a partnership? We&apos;d
          love to hear from you. Our team is always here to help you build the
          next big thing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left Column: Contact Information */}
        <div className="flex flex-col space-y-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
            <div className="space-y-6">
              {/* Email */}
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4 mt-1">
                  <MdEmail size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Email Us</h3>
                  <p className="text-default-500 mb-1">
                    Our friendly team is here to help.
                  </p>
                  <a
                    href="mailto:info@equits.net"
                    className="text-primary hover:underline font-medium"
                  >
                    info@equits.net
                  </a>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4 mt-1">
                  <MdLocationOn size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Visit Us</h3>
                  <p className="text-default-500 mb-1">
                    Come say hello at our office HQ.
                  </p>
                  <p className="text-default-700 font-medium">Cairo, Egypt</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start">
                <div className="bg-primary/10 p-3 rounded-full text-primary mr-4 mt-1">
                  <MdPhone size={24} />
                </div>
                <div>
                  <h3 className="font-medium text-lg">Call Us</h3>
                  <p className="text-default-500 mb-1">
                    Mon-Fri from 8am to 5pm.
                  </p>
                  <a
                    href="tel:+201023224594"
                    className="text-primary hover:underline font-medium"
                  >
                    +20 (10) 2322-4594
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Socials & Smart Badge */}
          <div className="pt-8 border-t border-divider">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
              <div className="flex space-x-4">
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-content2 border border-divider hover:border-primary hover:text-primary rounded-full transition-colors"
                >
                  <FaTwitter size={20} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-content2 border border-divider hover:border-primary hover:text-primary rounded-full transition-colors"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 bg-content2 border border-divider hover:border-primary hover:text-primary rounded-full transition-colors"
                >
                  <FaGithub size={20} />
                </a>
              </div>
              <div className="flex items-center text-sm font-medium text-success bg-success/10 px-4 py-2 rounded-full border border-success/20">
                <MdAccessTime className="mr-2" size={18} />
                Average response time: 3 days
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Contact Form */}
        <div className="bg-content1 border border-divider rounded-3xl p-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>

          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center h-full space-y-4 py-12 text-center animate-appearance-in">
              <div className="bg-success/20 text-success p-5 rounded-full mb-4">
                <MdEmail size={48} />
              </div>
              <h3 className="text-3xl font-bold">Message Sent!</h3>
              <p className="text-default-500 max-w-sm">
                Thank you for reaching out. We have received your message and
                will get back to you shortly.
              </p>
              <Button
                color="primary"
                variant="flat"
                onPress={() => setIsSubmitted(false)}
                className="mt-6 font-medium"
              >
                Send another message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Input
                  isRequired
                  label="First Name"
                  labelPlacement="outside"
                  placeholder="John"
                  variant="faded"
                  classNames={{ label: "font-medium" }}
                />
                <Input
                  isRequired
                  label="Last Name"
                  labelPlacement="outside"
                  placeholder="Doe"
                  variant="faded"
                  classNames={{ label: "font-medium" }}
                />
              </div>
              <Input
                isRequired
                type="email"
                label="Email Address"
                labelPlacement="outside"
                placeholder="you@company.com"
                variant="faded"
                classNames={{ label: "font-medium" }}
              />
              <Input
                label="Subject (Optional)"
                labelPlacement="outside"
                placeholder="How can we help you?"
                variant="faded"
                classNames={{ label: "font-medium" }}
              />
              <Textarea
                isRequired
                label="Message"
                labelPlacement="outside"
                placeholder="Tell us a little about your project, question, or idea..."
                minRows={5}
                variant="faded"
                classNames={{ label: "font-medium" }}
              />
              <Button
                type="submit"
                color="primary"
                className="w-full font-semibold text-medium h-12"
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
