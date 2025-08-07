import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

export const LanguageSwitcher: React.FC = () => {
  const router = useRouter();
  const { pathname, asPath, query, locale } = router;

  const changeLanguage = () => {
    const newLocale = locale === "en" ? "fr" : "en";
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  return (
    <button onClick={changeLanguage} className={"focus:outline-none"}>
      <Image
        src={locale === "fr" ? "/images/ico-fr.png" : "/images/ico-uk.png"}
        alt="Logo"
        width={48}
        height={48}
        style={{ background: "#ffffff" }}
        className="relative z-10 rounded-full hover:scale-105 transition-all duration-300 ease-in-out"
      />
    </button>
  );
};

export default LanguageSwitcher;
