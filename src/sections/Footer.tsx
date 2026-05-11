"use client";

import Image from "next/image";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import { LinkButton } from "../components/LinkButton";

export const Footer = () => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between gap-4 px-10 py-4 mx-auto max-w-7xl sm:px-6 row flex-wrap">
        <div className="items-center gap-4 row">
          <Image
            src="/images/logo.png"
            alt="Logo Le Lavoir de la Passerelle"
            height={40}
            width={40}
          />
          <div className="text-sm text-extra-light">
            {t("footer.copyright", { year })}
          </div>
        </div>
        <nav aria-label={t("footer.nav_label")}>
          <ul className="flex flex-wrap items-center gap-4 list-none m-0 p-0">
            <li>
              {pathname === "/blog" ? (
                <Link href="/" className="link text-extra-light">
                  {t("footer.home")}
                </Link>
              ) : (
                <Link href="/blog" className="link text-extra-light">
                  {t("footer.blog")}
                </Link>
              )}
            </li>
            <li>
              <Link href="/mentions-legales" className="link text-extra-light">
                {t("footer.mentions")}
              </Link>
            </li>
            <li>
              <Link
                href="/politique-confidentialite"
                className="link text-extra-light"
              >
                {t("footer.privacy")}
              </Link>
            </li>
            <li>
              {pathname === "/contact" ? (
                <Link href="/" className="link text-extra-light">
                  {t("footer.home")}
                </Link>
              ) : (
                <LinkButton href="/contact">{t("footer.contact")}</LinkButton>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};
