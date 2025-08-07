import { DetailedHTMLProps, HTMLAttributes, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

interface DetailsProps
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLParagraphElement>,
    HTMLParagraphElement
  > {
  children: ReactNode;
}

export const Details = ({ children, ...props }: DetailsProps) => {
  return (
    <p className={twMerge("body-lg text-light", props.className)} {...props}>
      {children as string}
    </p>
  );
};
