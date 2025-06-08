import React from 'react';
import { useTranslation } from 'react-i18next';
import { Card } from '../components/Card';
import { GradientText } from '../components/GradientText';

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512">
    <path
      d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388.2c-7.8 19.6-19.6 37.1-36.2 53.7-16.6 16.6-34.1 28.4-53.7 36.2-51 10.6-156.4 10.6-207.4 0-19.6-7.8-37.1-19.6-53.7-36.2-16.6-16.6-28.4-34.1-36.2-53.7-10.6-51-10.6-156.4 0-207.4 7.8-19.6 19.6-37.1 36.2-53.7 16.6-16.6 34.1-28.4 53.7-36.2 51-10.6 156.4-10.6 207.4 0 19.6 7.8 37.1 19.6 53.7 36.2 16.6 16.6 28.4 34.1 36.2 53.7 10.6 51 10.6 156.4 0 207.4z"/>
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path
      d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.78 90.69 226.38 209.25 245V334.58h-59.67v-78.52h59.67v-60.75c0-57.72 34.63-89.98 85.69-89.98 24.57 0 50.12 4.38 50.12 4.38v55.13h-28.08c-33.69 0-44.31 20.92-44.31 42.39v51.63h68.78l-11 78.52h-57.78V501C413.31 482.38 504 379.78 504 256z"/>
  </svg>
);

const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 512 512">
    <path
      d="M459.4 151.7c.3 4.5.3 9.1.3 13.6 0 138.7-105.6 298.6-298.6 298.6-59.5 0-114.7-17.2-161.1-47.1 8.4 1 16.6 1.3 25.3 1.3 49.1 0 94.2-16.6 130.3-44.8-46.1-1-84.8-31.2-98.1-72.8 12.7 2.3 26.3 3.6 40.6 3.6 19.8 0 39.3-2.6 56.8-7.7-48.6-9.7-84.9-52.5-84.9-103v-1.3c14 7.8 30.2 12.7 47.4 13.3-28.3-18.8-46.8-51-46.8-87.4 0-19.5 5.2-37 14.3-52.7 51.8 63.7 129.3 105.3 216.4 109.8-1.6-7.8-2.6-15.9-2.6-24 0-57.8 46.8-104.9 104.9-104.9 30.2 0 57.5 12.7 76.7 33.1 23.7-4.5 46.4-13.3 66.6-25.3-7.8 24.4-24.4 44.8-46.1 57.8 21.1-2.3 41.6-8.1 60.4-16.2-14.3 20.8-32.2 39.3-52.6 54.3z"/>
  </svg>
);

export const CardLinks: React.FC = () => {
  const { t } = useTranslation();
  return (
    <Card className="w-full px-4 py-16 overflow-hidden sm:px-16">
      <div className="items-center gap-6 text-center md:text-left col ">
        <GradientText className="pure-stream">{t('social.follow_us')}</GradientText>
        <div className="flex gap-4 items-center justify-center md:justify-start">
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
             className="flex gap-4 items-center">
            <InstagramIcon className="w-6 h-6"/>
          </a>
          <a href="https://www.facebook.com/profile.php?id=61577023506091" target="_blank" rel="noopener noreferrer"
             className="flex gap-4 items-center">
            <FacebookIcon className="w-6 h-6"/>
          </a>
        </div>
      </div>
    </Card>
  );
};

export default CardLinks;
