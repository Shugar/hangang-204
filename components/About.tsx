import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { OWNER_PHOTO } from "@/lib/constants";
import { BedDouble, UtensilsCrossed, WashingMachine, Tv, Building2 } from "lucide-react";

export async function About() {
  const t = await getTranslations("about");

  return (
    <section id="about" className="section-generous bg-background relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="reveal text-sm text-primary font-medium uppercase tracking-wider mb-3">{t("label")}</p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-display font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="reveal reveal-delay-2 text-lg text-muted-foreground">{t("subtitle")}</p>
        </div>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8">
          <div className="lg:col-span-7 reveal reveal-delay-3">
            <Card className="card-elevated p-8 lg:p-10 bg-gray-50 border-0 h-full rounded-2xl">
              <div className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-accent" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-bold text-foreground">HANGANG 204</h3>
                    <p className="text-sm text-muted-foreground">{t("location")}</p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed text-lg">{t("desc1")}</p>
                <p className="text-foreground/80 leading-relaxed text-lg">{t("desc2")}</p>
                <p className="text-foreground/80 leading-relaxed text-lg">{t("desc3")}</p>
                <div className="flex flex-wrap gap-3 pt-4 border-t border-primary/10">
                  <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5 px-4 py-2 gap-2 text-sm">
                    <BedDouble className="w-5 h-5" />{t("badge2Bedrooms")}
                  </Badge>
                  <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-4 py-2 gap-2 text-sm">
                    <UtensilsCrossed className="w-5 h-5" />{t("badgeKitchen")}
                  </Badge>
                  <Badge variant="outline" className="border-accent/40 text-accent bg-accent/5 px-4 py-2 gap-2 text-sm">
                    <WashingMachine className="w-5 h-5" />{t("badgeWasher")}
                  </Badge>
                  <Badge variant="outline" className="border-primary/40 text-primary bg-primary/5 px-4 py-2 gap-2 text-sm">
                    <Tv className="w-5 h-5" />{t("badgeSmartTV")}
                  </Badge>
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-5 lg:mt-12 reveal reveal-delay-4">
            <Card className="p-8 bg-gray-50 border-0 rounded-2xl">
              <div className="space-y-5">
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image src={`/photos/${OWNER_PHOTO}`} alt="Taehwan" fill className="object-cover" sizes="64px" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">{t("meetHost")}</h3>
                    <p className="text-sm text-muted-foreground">{t("yourHost")}</p>
                  </div>
                </div>
                <p className="text-foreground/80 leading-relaxed">{t("hostBio1")}</p>
                <p className="text-foreground/80 leading-relaxed">{t("hostBio2")}</p>
                <p className="text-foreground/80 leading-relaxed">{t("hostBio3")}</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
