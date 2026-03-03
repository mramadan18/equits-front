"use client";

import { useTranslations } from "next-intl";
import { SectionHeader } from "@/components/shared/SectionHeader";
import { Accordion, AccordionItem } from "@heroui/accordion";
import Image from "next/image";
import { FiPlus, FiMinus } from "react-icons/fi";

export default function Faq() {
  const t = useTranslations("Faq");

  const faqs = [
    { id: "1", num: "01.", qKey: "q1", aKey: "a1" },
    { id: "2", num: "02.", qKey: "q2", aKey: "a2" },
    { id: "3", num: "03.", qKey: "q3", aKey: "a3" },
    { id: "4", num: "04.", qKey: "q4", aKey: "a4" },
  ];

  return (
    <section className="py-20 w-full bg-white">
      <div className="container">
        <SectionHeader title={t("title")} />

        <div className="mt-28 bg-gray3 rounded-3xl p-6 md:p-10 mb-20 md:mb-24 relative">
          {/* Top left decorative lines */}
          <div className="absolute -top-20 -left-16 sm:left-0 md:-left-10 lg:-left-20">
            <Image
              src="/images/faq-lines.png"
              alt="faq-lines"
              width={100}
              height={100}
            />
          </div>
          <Accordion
            selectionMode="single"
            itemClasses={{
              base: "group shadow-none bg-transparent data-[open=true]:bg-[#0B5CA8] border-b border-gray-200 data-[open=true]:border-transparent last:border-none data-[open=true]:rounded-xl transition-all my-2 px-2",
              title:
                "font-bold text-base md:text-lg text-dark2 group-data-[open=true]:text-white",
              trigger: "py-4 md:py-6",
              indicator: "text-medium",
              content:
                "text-sm md:text-base pb-6 pt-0 group-data-[open=true]:text-white/90 leading-relaxed pr-8",
            }}
            defaultExpandedKeys={["4"]}
          >
            {faqs.map((faq) => (
              <AccordionItem
                key={faq.id}
                aria-label={t(faq.qKey)}
                title={`${faq.num} ${t(faq.qKey)}`}
                indicator={({ isOpen }) => (
                  <span
                    className={`w-6 h-6 flex items-center justify-center rounded-sm font-bold text-lg transition-colors ${isOpen ? "bg-white text-[#0B5CA8]" : "bg-white text-dark2 shadow-sm"}`}
                  >
                    {isOpen ? <FiMinus /> : <FiPlus />}
                  </span>
                )}
              >
                {t(faq.aKey)}
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}
