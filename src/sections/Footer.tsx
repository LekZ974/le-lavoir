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
            <ContactForm />
          </div>
        </Modal>
      </div>
    </footer>
  );
};
