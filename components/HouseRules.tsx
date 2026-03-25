import { getTranslations } from "next-intl/server";
import {
  Clock, CigaretteOff, Volume2, PartyPopper, Footprints,
  Trash2, UtensilsCrossed, Plug, LucideIcon,
} from "lucide-react";

const rules: { icon: LucideIcon; titleKey: string; descKey: string; noteKey?: string }[] = [
  { icon: Clock, titleKey: "checkinTitle", descKey: "checkinDesc", noteKey: "checkinNote" },
  { icon: CigaretteOff, titleKey: "smokingTitle", descKey: "smokingDesc", noteKey: "smokingNote" },
  { icon: Volume2, titleKey: "quietTitle", descKey: "quietDesc", noteKey: "quietNote" },
  { icon: PartyPopper, titleKey: "partyTitle", descKey: "partyDesc" },
  { icon: Footprints, titleKey: "shoesTitle", descKey: "shoesDesc" },
  { icon: UtensilsCrossed, titleKey: "cookingTitle", descKey: "cookingDesc", noteKey: "cookingNote" },
  { icon: Trash2, titleKey: "wasteTitle", descKey: "wasteDesc", noteKey: "wasteNote" },
  { icon: Plug, titleKey: "checkoutTitle", descKey: "checkoutDesc" },
];

export async function HouseRules() {
  const t = await getTranslations("rules");

  return (
    <section id="rules" className="section-normal bg-cream-dark relative overflow-hidden texture-paper">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-12">
          <p className="reveal text-hand text-2xl text-accent mb-2">{t("label")}</p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-display font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="reveal reveal-delay-2 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {rules.map((rule, i) => (
            <div
              key={rule.titleKey}
              className="reveal bg-white/80 backdrop-blur-sm rounded-2xl p-6 transition-all group"
              style={{ transitionDelay: `${200 + i * 80}ms` }}
            >
              <div className="mb-3 group-hover:scale-110 transition-transform inline-block text-primary">
                <rule.icon className="w-6 h-6" strokeWidth={1.5} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{t(rule.titleKey)}</h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{t(rule.descKey)}</p>
              {rule.noteKey && (
                <p className="text-muted-foreground text-xs mt-2 italic">{t(rule.noteKey)}</p>
              )}
            </div>
          ))}
        </div>

        <div className="reveal text-center mt-10">
          <p className="text-muted-foreground text-sm">{t("registeredOnly")}</p>
        </div>
      </div>
    </section>
  );
}
