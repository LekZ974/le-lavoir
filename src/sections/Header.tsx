import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "../components/LanguageSwitcher";
import { LinkButton } from "../components/LinkButton";
import { Logo } from "../components/Logo";
import { MobileMenu } from "../components/MobileMenu";
import { Moon, Sun } from "../svg/DarkModeIcons";

export const Header = ({
  isDarkMode,
  toggleDarkMode,
  animation = true,
}: {
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
  animation?: boolean;
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { pathname } = useRouter();
  const { t } = useTranslation();

  useEffect(() => {
    setIsClient(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <header
        className={`fixed w-full z-30 transition duration-300 ${
          isClient && isScrolled ? "bg-strong backdrop-blur-sm shadow-lg" : ""
        }`}
      >
        <div className="flex">
          <p
            className={`${
              isScrolled ? "text-light-sm" : "text-extra-light-sm"
            }`}
          >
            <a href="#social-links">{t("common.soon")}</a>
          </p>
        </div>
        {toggleDarkMode ? (
          <div className="items-center justify-end h-24 px-5 mx-auto row md:h-24 max-w-7xl sm:px-6">
            {/* Desktop Navigation */}
            <nav className="hidden md:block">
              <ul className="items-center gap-2 row">
                <li>
                  {pathname === "/blog" ? (
                    <Link
                      href="/"
                      className={`link ${
                        isScrolled ? "text-light" : "text-extra-light"
                      }`}
                    >
                      {t("common.header.home")}
                    </Link>
                  ) : (
                    <Link
                      href="/blog"
                      className={`link ${
                        isScrolled ? "text-light" : "text-extra-light"
                      }`}
                    >
                      {t("common.header.blog")}
                    </Link>
                  )}
                </li>
                <li>
                  <LinkButton
                    button
                    className={
                      isScrolled
                        ? isDarkMode
                          ? "bg-strong"
                          : "bg-extra-strong"
                        : "bg-extra-strong"
                    }
                    onClick={toggleDarkMode}
                    title="Toggle dark mode"
                    aria-label="Toggle dark mode"
                  >
                    {isDarkMode ? <Moon /> : <Sun />}
                  </LinkButton>
                </li>
                <li>
                  <LanguageSwitcher />
                </li>
              </ul>
            </nav>
          </div>
        ) : null}
        {animation && isClient && isScrolled && (
          <div className="z-20 progress">
            <div className="progress-bar" />
          </div>
        )}
      </header>

      {/* Mobile Hamburger Button */}
      {toggleDarkMode && (
        <div className="fixed top-0 left-0 right-0 z-[60] h-24 md:hidden">
          <div className="flex items-center justify-end w-full h-full max-w-7xl mx-auto px-5 sm:px-6">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 transition-colors duration-300 rounded-md focus:outline-none ${
                isScrolled ? "text-light" : "text-extra-light"
              }`}
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      )}

      <MobileMenu
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
      />

      <Logo isScrolled={animation ? isScrolled : false} isClient={isClient} />
    </>
  );
};
