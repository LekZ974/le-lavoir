"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { LinkButton } from "../components/LinkButton";

export const Footer = () => {
  const { pathname } = useRouter();

  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between px-10 py-4 mx-auto max-w-7xl sm:px-6 row">
        <div className="items-center gap-4 row">
          <Image
            src="/images/logo.png"
            alt="Logo Le Lavoir de la Passerelle"
            height={40}
            width={40}
          />
          <div className="text-sm text-extra-light">
            &copy; Le Lavoir de la Passerelle, 2025
          </div>
        </div>
        <li>
          {pathname === "/blog" ? (
            <Link href="/" className="link text-extra-light">
              Accueil
            </Link>
          ) : (
            <Link href="/blog" className="link text-extra-light">
              Blog
            </Link>
          )}
        </li>
        {pathname === "/contact" ? (
          <Link href="/" className="link text-extra-light">
            Accueil
          </Link>
        ) : (
          <LinkButton href="/contact">Contactez-nous</LinkButton>
        )}
      </div>
    </footer>
  );
};
