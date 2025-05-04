import { Features } from '../src/sections/Features';
import { FeatureBlocks } from '../src/sections/FeatureBlocks';
import { Footer } from '../src/sections/Footer';
import { Header } from '../src/sections/Header';
import { Hero } from '../src/sections/Hero';
import { SocialLinks } from '../src/sections/SocialLinks';
import { Testimonials } from '../src/sections/Testimonials';
import Image from 'next/image';
import Brand from '../src/sections/Brand';

const Home = ({
                isDarkMode,
                toggleDarkMode
              }: {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}) => {
  return (
    <div className="overflow-hidden col text-strong">
      <Header isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode}/>
      <main>
        <Hero/>
        <FeatureBlocks/>
        <Features/>
        <Testimonials/>
        <Brand/>
        <SocialLinks/>
      </main>
      <Footer/>
    </div>
  );
};

export default Home;
