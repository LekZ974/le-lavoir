import { FeatureBlocks, Features, Footer, Header, Hero, SocialLinks, Testimonials } from '../src/sections';
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
