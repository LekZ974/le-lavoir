import Image from 'next/image';
import { LinkButton } from '../components/LinkButton';

export const Footer = () => {
  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between px-10 py-4 mx-auto sm:px-6 row max-w-7xl">
        <div className="items-center gap-4 row">
          <Image
            src="/images/logo.png"
            alt="Logo Le Lavoir de la Passerelle"
            height="40"
            width="40"
          />
          <div className="text-sm text-extra-light">&copy; Le Lavoir de la Passerelle, 2025</div>
        </div>
        <LinkButton
        >Contactez-nous
        </LinkButton>
      </div>
    </footer>
  );
};
