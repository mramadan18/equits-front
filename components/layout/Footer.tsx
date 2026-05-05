"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Divider } from "@heroui/divider";
import { MainRoutes } from "@/types";
import {
  FaLinkedinIn,
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import { FiMapPin } from "react-icons/fi";

const footerLinks = {
  platform: [
    { key: "explore", href: MainRoutes.EXPLORE },
    { key: "talents", href: MainRoutes.TALENTS },
    // { key: "services", href: MainRoutes.SERVICES },
    // { key: "boost", href: MainRoutes.BOOST },
  ],
  company: [
    { key: "about", href: MainRoutes.ABOUT },
    // { key: "careers", href: "#" },
    { key: "blog", href: MainRoutes.BLOG },
    { key: "contact", href: MainRoutes.CONTACT },
  ],
  resources: [
    { key: "helpCenter", href: MainRoutes.HELP },
    // { key: "guides", href: MainRoutes.GUIDES },
    // { key: "api", href: "#" },
    { key: "terms", href: MainRoutes.TERMS },
    { key: "privacy", href: MainRoutes.PRIVACY },
  ],
};

const socialLinks = [
  {
    icon: FaLinkedinIn,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
  {
    icon: FaFacebookF,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: FaInstagram,
    href: "https://instagram.com",
    label: "Instagram",
  },
  {
    icon: FaYoutube,
    href: "https://youtube.com",
    label: "YouTube",
  },
];

export function Footer() {
  const t = useTranslations("Footer");

  return (
    <footer className="w-full bg-dark text-white relative overflow-hidden">
      {/* Decorative gradient orb */}
      <div className="absolute -top-32 -right-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-secondary/8 rounded-full blur-3xl pointer-events-none" />

      {/* Main footer content */}
      <div className="container relative z-10">
        {/* Top section - CTA banner */}
        <div className="py-10 md:py-14">
          <div className="bg-gradient-to-r from-primary to-[#003d73] rounded-2xl p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-start">
              <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                {t("ctaTitle")}
              </h3>
              <p className="text-white/70 text-sm md:text-base max-w-md">
                {t("ctaSubtitle")}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row w-full md:w-auto gap-3 shrink-0">
              <Link
                href={MainRoutes.EXPLORE}
                className="bg-white text-primary font-semibold w-full sm:w-auto text-center px-6 py-3 rounded-lg text-sm hover:bg-white/90 transition-colors"
              >
                {t("ctaExplore")}
              </Link>
              <Link
                href="/register"
                className="bg-secondary text-dark2 font-semibold w-full sm:w-auto text-center px-6 py-3 rounded-lg text-sm hover:bg-secondary/90 transition-colors"
              >
                {t("ctaJoin")}
              </Link>
            </div>
          </div>
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-8 md:gap-6 pb-12">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <Link href={MainRoutes.LANDING} className="inline-block w-fit">
              <Image
                src="/images/logo.png"
                alt="Equits Logo"
                width={130}
                height={32}
                className="h-8 w-auto brightness-0 invert"
              />
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              {t("brandDescription")}
            </p>
            {/* Contact info */}
            <div className="flex flex-col gap-2.5 mt-1">
              <a
                href="mailto:hello@equits.net"
                className="flex items-center gap-2.5 text-white/50 hover:text-secondary transition-colors text-sm group"
              >
                <HiOutlineMail
                  size={16}
                  className="text-white/40 group-hover:text-secondary transition-colors shrink-0"
                />
                info@equits.net
              </a>
              <div className="flex items-center gap-2.5 text-white/50 text-sm">
                <FiMapPin size={16} className="text-white/40 shrink-0" />
                {t("location")}
              </div>
            </div>
          </div>

          {/* Platform links */}
          <div className="col-span-1 md:col-span-2 md:col-start-6">
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("platformTitle")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.platform.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-secondary transition-colors text-sm"
                  >
                    {t(`platform.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("companyTitle")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-secondary transition-colors text-sm"
                  >
                    {t(`company.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources links */}
          <div className="col-span-1 md:col-span-2">
            <h4 className="text-white font-semibold text-sm mb-4 uppercase tracking-wider">
              {t("resourcesTitle")}
            </h4>
            <ul className="flex flex-col gap-2.5">
              {footerLinks.resources.map((link) => (
                <li key={link.key}>
                  <Link
                    href={link.href}
                    className="text-white/50 hover:text-secondary transition-colors text-sm"
                  >
                    {t(`resources.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Divider className="bg-white/10" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-xs md:text-sm order-2 md:order-1">
            {t("copyright")}
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-3 order-1 md:order-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="w-9 h-9 rounded-full bg-white/8 hover:bg-secondary hover:text-dark2 flex items-center justify-center text-white/60 transition-all duration-300 hover:scale-110"
              >
                <social.icon size={15} />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom padding for mobile bottom nav */}
      <div className="h-16 lg:h-0" />
    </footer>
  );
}
