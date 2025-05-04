'use client';

import Image from 'next/image';
import { useState } from 'react';
import { LinkButton } from '../components/LinkButton';
import { Modal } from '../components/Modal';
import { ContactForm } from '../components/ContactForm';

export const Footer = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <footer className="bg-extra-strong">
      <div className="items-center justify-between px-10 py-4 mx-auto max-w-7xl sm:px-6 row">
        <div className="items-center gap-4 row">
          <Image src="/images/logo.png" alt="Logo Le Lavoir de la Passerelle" height={40} width={40} />
          <div className="text-sm text-extra-light">
            &copy; Le Lavoir de la Passerelle, 2025
          </div>
        </div>
        <LinkButton onClick={handleOpenModal}>Contactez-nous</LinkButton>
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <div className="flex flex-col justify-between h-full">
            <div className="flex justify-between">
              <h3 className="text-xl font-bold text-extra-strong">Contactez-nous</h3>
              <button onClick={handleCloseModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="w-6 h-6 fill-extra-strong"
                ><path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" /></svg>
              </button>
            </div>
            <ContactForm />
          </div>
        </Modal>
      </div>
    </footer>
  );
};
