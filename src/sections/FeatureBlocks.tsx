import { useTranslation } from "next-i18next";
import { ReactNode } from "react";

import { useRouter } from "next/router";
import { Button } from "../components/Button";
import { Card } from "../components/Card";
import { Details } from "../components/Details";
import { GradientText } from "../components/GradientText";
import { Section } from "../components/Section";
import { Title } from "../components/Title";
import {
  CardsIcon,
  DoorIcon,
  MagicIcon,
  ShuffleIcon,
  SignalIcon,
  TalkingIcon,
} from "../svg/FeatureIcons";

const BlockTitle = ({ children }: { children: ReactNode }) => {
  return <h3 className="text-xl font-bold text-strong">{children}</h3>;
};

const BlockText = ({ children }: { children: ReactNode }) => {
  return <p className="text-light">{children}</p>;
};

const Block = ({ children }: { children: ReactNode }) => {
  return (
    <Card grayer className="items-center gap-1 p-6 pt-10 col">
      {children}
    </Card>
  );
};

export const FeatureBlocks = () => {
  const { t } = useTranslation();
  const router = useRouter();
  return (
    <Section grayer className="gap-16 text-center">
      {/* Header */}
      <div className="gap-4 col">
        <Title size="md">
          {t("services.title")}
          <br />
        </Title>
        <GradientText className="reunion-terracotta">
          {t("services.subtitle")}
        </GradientText>
        <Details>{t("services.text.1") + " " + t("services.text.2")}</Details>
      </div>
      {/* Blocks */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Block 1 */}
        <Block>
          <ShuffleIcon />
          <BlockTitle>{t("services.capacity.title")}</BlockTitle>
          <BlockText>{t("services.capacity.text")}</BlockText>
        </Block>
        {/* Block 2 */}
        <Block>
          <SignalIcon />
          <BlockTitle>{t("services.drying.title")}</BlockTitle>
          <BlockText>{t("services.drying.text")}</BlockText>
        </Block>
        {/* Block 3 */}
        <Block>
          <TalkingIcon />
          <BlockTitle>{t("services.detergent.title")}</BlockTitle>
          <BlockText>{t("services.detergent.text")}</BlockText>
        </Block>
        {/* Block 4 */}
        <Block>
          <DoorIcon />
          <BlockTitle>{t("services.snacks.title")}</BlockTitle>
          <BlockText>{t("services.snacks.text")}</BlockText>
        </Block>
        {/* Block 5 */}
        <Block>
          <CardsIcon />
          <BlockTitle>{t("services.hours.title")}</BlockTitle>
          <BlockText>{t("services.hours.text")}</BlockText>
        </Block>
        {/* Block 6 */}
        <Block>
          <MagicIcon />
          <BlockTitle>{t("services.all.title")}</BlockTitle>
          <BlockText>{t("services.all.text")}</BlockText>
        </Block>
      </div>
      <div>
        <Button className="py-8" onClick={() => router.push("/portail")}>
          {t("services.text.3")}
        </Button>
      </div>
    </Section>
  );
};
