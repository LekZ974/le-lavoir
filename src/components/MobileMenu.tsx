import Link from "next/link";
import { useRouter } from "next/router";
import ReactDOM from "react-dom";
import { useTranslation } from "react-i18next";
import { Moon, Sun } from "../svg/DarkModeIcons";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { LinkButton } from "./LinkButton";

interface MobileMenuProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
  isDarkMode?: boolean;
  toggleDarkMode?: () => void;
}

export const MobileMenu = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isDarkMode,
  toggleDarkMode,
}: MobileMenuProps) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();

  if (typeof document === "undefined") {
    return null;
  }

  return ReactDOM.createPortal(
    <div
      className={`fixed inset-0 z-50 transition-transform duration-300 ease-in-out md:hidden ${
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      } backdrop-blur-sm`}
      style={{ backgroundColor: "rgba(42, 59, 92, 0.5)" }}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <nav
        className="flex flex-col items-center justify-center h-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <ul className="flex flex-col gap-8 text-2xl">
          <li className="text-white-bold">
            {pathname === "/blog" ? (
              <Link href="/" className="text-white font-bold">
                {t("common.header.home")}
              </Link>
            ) : (
              <Link href="/blog" className="text-white font-bold">
                {t("common.header.blog")}
              </Link>
            )}
          </li>
          <li>
            <LanguageSwitcher />
          </li>
          {toggleDarkMode && (
            <li>
              <LinkButton
                button
                className="bg-strong text-light"
                onClick={toggleDarkMode}
                title="Toggle dark mode"
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? <Moon /> : <Sun />}
              </LinkButton>
            </li>
          )}
        </ul>
      </nav>
    </div>,
    document.body
  );
};
