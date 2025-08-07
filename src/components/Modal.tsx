import { useTranslation } from "next-i18next";
import React, { useEffect } from "react";
import { Card } from "./Card";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const { t } = useTranslation();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
      <div className="relative min-w-96 mx-auto my-6 pointer-events-none">
        <Card className="p-6 z-50 relative flex flex-col w-full border-0 rounded-lg shadow-lg outline-none pointer-events-auto focus:outline-none">
          <div className="flex justify-between rounded-lg">
            <h3 className="text-xl font-bold text-extra-strong">
              Contactez-nous
            </h3>
            <button
              className="text-xl font-semibold leading-none text-gray-50 bg-transparent border-0 outline-none focus:outline-none"
              onClick={onClose}
            >
              <span className="text-base">{t("common.modal.close")}</span>
            </button>
          </div>
          <div className="relative flex-auto p-6">{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
