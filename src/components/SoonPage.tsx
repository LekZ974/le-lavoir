'use client';
import Image from 'next/image';
import Link from 'next/link';
import CardLinks from './CardLinks';

const TwitterIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.584-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.584.069-4.85c.149-3.225 1.664-4.771 4.919-4.919 1.266.058 1.644.07 4.85.07zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.059 1.689.073 4.948.073s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z"/>
  </svg>
);

const LinkedinIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
    <path
      d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 11-4.125 0 2.063 2.063 0 014.125 0zM7.44 20.452H3.232V9h4.208z"/>
  </svg>
);

export default function SoonPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-extra-strong text-white p-6 font-sans">
      <div className="text-center space-y-8 max-w-2xl w-full">
        <div className={'flex justify-center'}>
          <Link href="/">
            <div className="relative justify-self-center flex items-center justify-center w-[100px] h-[100px]">
              <div className="absolute inset-0 bg-strong rounded-full opacity-100" style={{ zIndex: 1 }}/>
              <Image
                src="/images/logo.png"
                alt="Logo"
                width={80}
                height={80}
                className="relative z-10"
              />
            </div>
          </Link>
        </div>
        <section>
          <h1
            className="text-4xl md:text-6xl font-extrabold tracking-tight bg-clip-text text-extra-light bg-gradient-to-r from-indigo-400 to-pink-500 pb-2">
            On arrive bientôt.
          </h1>
          <video
            className="w-full max-w-lg mx-auto rounded-lg shadow-lg"
            autoPlay
            loop
            muted
            playsInline
          >
            <source src="/videos/soon.mp4" type="video/mp4"/>
            Votre navigateur ne supporte pas la lecture de vidéos.
          </video>
        </section>
        <footer className="pt-8">
          <CardLinks/>
        </footer>
      </div>
    </main>
  );
}
