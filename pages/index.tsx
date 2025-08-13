import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import {
  FeatureBlocks,
  Features,
  Footer,
  Header,
  Hero,
  InstagramFeed,
  SocialLinks,
} from "../src/sections";
import Brand from "../src/sections/Brand";

const Home = ({
  isDarkMode,
  toggleDarkMode,
}: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
      <main>
        <Hero />
        <FeatureBlocks />
        <Features />
        {/* <Testimonials /> */}
        <Brand />
        <InstagramFeed />
        <SocialLinks />
      </main>
      <Footer />
    </div>
  );
};

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
    },
  };
}

export default Home;
