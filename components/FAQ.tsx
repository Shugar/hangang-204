"use client";

import { useTranslations } from "next-intl";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";

const faqKeys = ["q1", "q2", "q3", "q4", "q5", "q6", "q7"] as const;

export function FAQ() {
  const t = useTranslations("faq");

  return (
    <section className="section-normal bg-background relative overflow-hidden">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="reveal text-hand text-2xl text-accent mb-2">{t("label")}</p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-display font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="reveal reveal-delay-2 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <Accordion type="single" collapsible className="space-y-3">
          {faqKeys.map((key, index) => (
            <div key={key} className="reveal" style={{ transitionDelay: `${200 + index * 80}ms` }}>
              <AccordionItem
                value={`item-${index}`}
                className="bg-gray-50 border-0 rounded-2xl px-6 transition-all"
              >
                <AccordionTrigger className="hover:no-underline py-5 text-left">
                  <h3 className="font-display font-semibold text-foreground text-base sm:text-lg pr-4">
                    {t(key)}
                  </h3>
                </AccordionTrigger>
                <AccordionContent className="pb-5">
                  <p className="text-foreground/70 leading-relaxed">
                    {t(`a${index + 1}` as `a1` | `a2` | `a3` | `a4` | `a5` | `a6` | `a7`)}
                  </p>
                </AccordionContent>
              </AccordionItem>
            </div>
          ))}
        </Accordion>

        <div className="reveal text-center mt-10">
          <p className="text-muted-foreground">{t("moreQuestions")}</p>
        </div>
      </div>
    </section>
  );
}
