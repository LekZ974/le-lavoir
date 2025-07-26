import Image from 'next/image';
import Link from 'next/link';

export const Logo = ({
                isScrolled,
                isClient
              }: {
  isScrolled: boolean;
  isClient: boolean;
}) => {
  const baseClass =
    'fixed z-50 transition-all duration-700 ease-in-out will-change-transform';

  if (!isClient) {
    return (
      <div className={`${baseClass} left-1/2 scale-150 -translate-x-1/2 translate-y-1/2`}>
        <Link href="/">
          <div className="relative flex items-center justify-center w-[100px] h-[100px]">
            <div className="absolute inset-0 bg-strong rounded-full opacity-100" style={{ zIndex: 1 }}/>
            <Image
              src="/images/simple-logo.png"
              alt="Logo"
              width={80}
              height={80}
              className="relative z-10"
            />
          </div>
        </Link>
      </div>
    );
  }

  // Côté client : on utilise le scroll
  return (
    <div
      className={`${baseClass} ${
        isScrolled
          ? 'left-4 scale-75 translate-x-0 translate-y-0'
          : 'left-1/2 scale-200 -translate-x-1/2 translate-y-1/2'
      }`}
    >
      <Link href="/">
        <div className="relative flex items-center justify-center w-[100px] h-[100px]">
          <div
            className={`absolute inset-0 rounded-full transition-opacity duration-700 ${
              isScrolled ? 'opacity-0' : 'opacity-100'
            }`}
            style={{ zIndex: 1 }}
          />
          <Image
              src="/images/simple-logo.png"
              alt="Logo"
            width={300}
            height={300}
            className="relative z-10"
          />
        </div>
      </Link>
    </div>
  );
};
