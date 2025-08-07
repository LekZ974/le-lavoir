import { useTranslation } from "next-i18next";
import { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  children: ReactNode;
}

export const Button = (props: ButtonProps) => {
  const { t } = useTranslation();
  return (
    <button
      {...props}
      className={twMerge(
        "text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-fit px-4 py-2",
        props.className
      )}
    >
      {props.children}
    </button>
  );
};
