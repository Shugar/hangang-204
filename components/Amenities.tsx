import { getTranslations } from "next-intl/server";
import {
  Wifi, UtensilsCrossed, WashingMachine, Snowflake, Tv, Wind, Shirt,
  Briefcase, KeyRound, ShieldCheck, Refrigerator, Flame, Droplets,
  Coffee, BookOpen, Speaker, ParkingCircle, Thermometer, BedDouble,
  LucideIcon,
} from "lucide-react";

type AmenityItem = { icon: LucideIcon; nameKey: string; detailKey?: string };
type AmenityGroup = { titleKey: string; items: AmenityItem[] };

const amenityGroups: AmenityGroup[] = [
  {
    titleKey: "essentials",
    items: [
      { icon: Wifi, nameKey: "fastWifi", detailKey: "fastWifiDetail" },
      { icon: Snowflake, nameKey: "airConditioning" },
      { icon: Thermometer, nameKey: "heating" },
      { icon: KeyRound, nameKey: "selfCheckin", detailKey: "selfCheckinDetail" },
      { icon: ShieldCheck, nameKey: "safety", detailKey: "safetyDetail" },
    ],
  },
  {
    titleKey: "kitchenDining",
    items: [
      { icon: UtensilsCrossed, nameKey: "fullKitchen", detailKey: "fullKitchenDetail" },
      { icon: Refrigerator, nameKey: "fridge" },
      { icon: Flame, nameKey: "cooktop" },
      { icon: Coffee, nameKey: "kettle" },
    ],
  },
  {
    titleKey: "bedroomLaundry",
    items: [
      { icon: Shirt, nameKey: "linens", detailKey: "linensDetail" },
      { icon: WashingMachine, nameKey: "washer" },
      { icon: Wind, nameKey: "hairDryer" },
      { icon: Droplets, nameKey: "shower", detailKey: "showerDetail" },
    ],
  },
  {
    titleKey: "livingEntertainment",
    items: [
      { icon: Tv, nameKey: "smartTv" },
      { icon: Speaker, nameKey: "sound" },
      { icon: BookOpen, nameKey: "books" },
      { icon: Briefcase, nameKey: "workspace" },
      { icon: ParkingCircle, nameKey: "parking", detailKey: "parkingDetail" },
    ],
  },
];

export async function Amenities() {
  const t = await getTranslations("amenities");

  return (
    <section id="amenities" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-20 -left-32 w-[400px] h-[400px] rounded-full bg-celadon/[0.04] pointer-events-none" />
      <div className="absolute bottom-20 -right-24 w-[300px] h-[300px] rounded-full bg-primary/[0.04] pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-celadon-light/[0.03] pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <p className="reveal text-sm text-primary font-medium uppercase tracking-wider mb-3">{t("label")}</p>
          <h2 className="reveal reveal-delay-1 text-4xl sm:text-5xl font-display font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="reveal reveal-delay-2 text-lg text-muted-foreground max-w-2xl mx-auto">{t("subtitle")}</p>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {amenityGroups.map((group, gi) => (
            <div key={group.titleKey} className="reveal bg-gray-50 rounded-2xl p-6 sm:p-8" style={{ transitionDelay: `${200 + gi * 100}ms` }}>
              <h3 className="font-display font-semibold text-lg text-foreground mb-5 pb-3 border-b border-primary/10">
                {t(group.titleKey)}
              </h3>
              <div className="space-y-4">
                {group.items.map((item) => (
                  <div key={item.nameKey} className="flex items-start gap-3 group">
                    <div className="text-accent group-hover:scale-110 transition-transform mt-0.5">
                      <item.icon className="w-5 h-5" strokeWidth={1.5} />
                    </div>
                    <div>
                      <span className="text-foreground font-medium text-sm">{t(item.nameKey)}</span>
                      {item.detailKey && (
                        <span className="text-muted-foreground text-sm ml-1">&mdash; {t(item.detailKey)}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-12 border-t border-primary/10">
          <h3 className="reveal font-display font-semibold text-xl text-foreground mb-8 text-center">{t("sleepingTitle")}</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="reveal reveal-delay-1 bg-gray-50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center mb-3">
                <BedDouble className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{t("bedroom1")}</h4>
              <p className="text-muted-foreground text-sm">{t("bedroom1Desc")}</p>
            </div>
            <div className="reveal reveal-delay-2 bg-gray-50 rounded-2xl p-6">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
                <BedDouble className="w-5 h-5 text-primary" strokeWidth={1.5} />
              </div>
              <h4 className="font-semibold text-foreground mb-1">{t("bedroom2")}</h4>
              <p className="text-muted-foreground text-sm">{t("bedroom2Desc")}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
