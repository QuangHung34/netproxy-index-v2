"use client";

import { AdsIcon } from "../icons/AdsIcon";
import { ZoomIcon } from "../icons/ZoomIcon";
import { DollarIcon } from "../icons/DollarIcon";
import { CartIcon } from "../icons/CartIcon";
import { StarIcon } from "../icons/StarIcon";
import { DatabaseIcon } from "../icons/DatabaseIcon";
import { CircleArrowRightIcon } from "../icons/CircleArrowRightIcon";
import { NetworkIcon } from "../icons/NetworkIcon";
import { useTranslations } from "next-intl";

export const CaseStudies = () => {
  const t = useTranslations("caseStudies");

  const caseStudies = [
    {
      titleKey: "items.adVerification",
      icon: <AdsIcon className="object-cover" />,
    },
    {
      titleKey: "items.fastShopping",
      icon: <CartIcon className="object-cover" />,
    },
    {
      titleKey: "items.pricingMonitoring",
      icon: <DollarIcon className="object-cover" />,
    },
    {
      titleKey: "items.network",
      icon: <NetworkIcon className="object-cover" />,
    },
    {
      titleKey: "items.talentSourcing",
      icon: <StarIcon className="object-cover" />,
    },
    {
      titleKey: "items.dataCollection",
      icon: <DatabaseIcon className="object-cover" />,
    },
    {
      titleKey: "items.verification",
      icon: <CircleArrowRightIcon className="object-cover" />,
    },
    {
      titleKey: "items.marketResearch",
      icon: <ZoomIcon className="object-cover" />,
    },
  ];

  return (
    <section
      id="case-study"
      className="py-[60px] px-5 md:px-10 md:py-20 relative border-b border-[#e3ecec]"
    >
      <div className="container">
        <div className="text-center">
          <p className="text-13 text-primary text-center font-medium">
            TOP CASE
          </p>
          <h3 className="text-2xl md:text-33 font-neue-kaine-bold text-center text-[#2b303b]">
            {t("title")}
          </h3>
          <div className="mt-5 font-inter text-15 max-w-600 mx-auto text-[#576075]">
            {t("subtitle")}
          </div>
        </div>

        {/* ✅ 4 ô 1 hàng - mobile + desktop đều to hơn */}
        <div className="grid grid-cols-4 gap-3 mt-10 w-full">
          {caseStudies.map((study, index) => (
            <div
              key={study.titleKey}
              className="flex flex-col items-center justify-center gap-2 
                         h-[70px] border border-[#e3ecec] p-3 md:p-4 md:h-[82px]"
            >
              <div className="w-7 h-7 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center">
                {study.icon}
              </div>
              <p className="text-xs font-ibm-plex-mono font-semibold uppercase 
                           text-[#2b303b] text-center leading-tight 
                           md:text-sm">
                {t(study.titleKey)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
