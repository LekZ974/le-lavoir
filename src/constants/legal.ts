import { getBusinessPhone } from "./site";

const DEFAULT_REGISTERED_ADDRESS =
  "5c rue Amiral Lacaze, 97480 Saint-Joseph, La Réunion";

export type LegalMentionsProps = {
  companyName: string;
  legalForm: string;
  siret: string | null;
  registeredAddress: string;
  phoneDisplay: string;
  publicationDirector: string;
};

const PLACEHOLDER_FR = "À compléter";
const PLACEHOLDER_EN = "To be completed";

export function getLegalMentionsProps(locale: string): LegalMentionsProps {
  const ph = locale === "en" ? PLACEHOLDER_EN : PLACEHOLDER_FR;

  const companyName =
    process.env.NEXT_PUBLIC_LEGAL_COMPANY_NAME?.trim() || ph;
  const legalForm =
    process.env.NEXT_PUBLIC_LEGAL_LEGAL_FORM?.trim() || ph;

  const siretRaw = process.env.NEXT_PUBLIC_LEGAL_SIRET?.trim();
  const siret = siretRaw || null;

  const registeredAddress =
    process.env.NEXT_PUBLIC_LEGAL_REGISTERED_ADDRESS?.trim() ||
    DEFAULT_REGISTERED_ADDRESS;

  const phoneDisplay = getBusinessPhone()?.trim() || ph;

  const publicationDirector =
    process.env.NEXT_PUBLIC_LEGAL_PUBLICATION_DIRECTOR?.trim() || ph;

  return {
    companyName,
    legalForm,
    siret,
    registeredAddress,
    phoneDisplay,
    publicationDirector,
  };
}
