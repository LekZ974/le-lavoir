import { useTranslation } from "next-i18next";
import React, { FormEvent, useState } from "react";
import {
  CONTACT_MAX_MESSAGE_LEN,
  CONTACT_MAX_NAME_LEN,
} from "../constants/contact";

interface FormData {
  name: string;
  email: string;
  message: string;
  website: string;
}

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (errorMessage) setErrorMessage(null);
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    const tempErrors: { [key: string]: string } = {};
    let isValid = true;

    const nameTrim = formData.name.trim();
    if (nameTrim === "") {
      tempErrors.name = t("common.modal.error.name");
      isValid = false;
    } else if (nameTrim.length > CONTACT_MAX_NAME_LEN) {
      tempErrors.name = t("common.modal.error.name_too_long", {
        max: CONTACT_MAX_NAME_LEN,
      });
      isValid = false;
    }
    if (formData.email.trim() === "") {
      tempErrors.email = t("common.modal.error.email");
      isValid = false;
    } else if (
      formData.email.length > 254 ||
      !EMAIL_RE.test(formData.email.trim())
    ) {
      tempErrors.email = t("common.modal.error.email_format");
      isValid = false;
    }
    const messageTrim = formData.message.trim();
    if (messageTrim === "") {
      tempErrors.message = t("common.modal.error.message");
      isValid = false;
    } else if (messageTrim.length > CONTACT_MAX_MESSAGE_LEN) {
      tempErrors.message = t("common.modal.error.message_too_long", {
        max: CONTACT_MAX_MESSAGE_LEN,
      });
      isValid = false;
    }

    setErrors(tempErrors);
    return isValid;
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            message: formData.message,
            website: formData.website,
          }),
        });

        if (response.ok && response.status === 200) {
          setIsSuccess(true);
          setFormData({
            name: "",
            email: "",
            message: "",
            website: "",
          });
          setErrors({});
        } else {
          const contentType = response.headers.get("content-type") || "";
          let msg = "Failed to send email";
          if (contentType.includes("application/json")) {
            try {
              const data = await response.json();
              msg = data.error || data.message || msg;
            } catch (_) {
              // ignore
            }
          } else {
            try {
              const text = await response.text();
              msg = text || msg;
            } catch (_) {
              // ignore
            }
          }
          throw new Error(msg);
        }
      } catch (error: unknown) {
        console.error("Error sending email:", error);
        const raw =
          error instanceof Error ? error.message : t("common.modal.error");
        const msg =
          raw === "Payload too large"
            ? t("common.modal.error.payload_too_large")
            : raw;
        setErrorMessage(msg);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {errorMessage && (
        <div className="text-neon-amber" role="alert">
          {errorMessage}
        </div>
      )}
      {isSuccess && (
        <div className="text-gray-100">{t("common.modal.success")}</div>
      )}
      <input
        type="text"
        name="website"
        value={formData.website}
        onChange={handleChange}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute left-[-9999px] h-0 w-0 overflow-hidden opacity-0"
      />
      <div>
        <label htmlFor="name" className="block text-extra-strong">
          {t("common.modal.name")}
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          maxLength={CONTACT_MAX_NAME_LEN}
          placeholder=""
          className="border border-gray-300 p-2 w-full"
        />
        {errors.name && <div className="text-neon-amber">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="email" className="block text-extra-strong">
          {t("common.modal.email")}
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=""
          className="border border-gray-300 p-2 w-full"
        />
        {errors.email && <div className="text-neon-amber">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="message" className="block text-extra-strong">
          {t("common.modal.message")}
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          maxLength={CONTACT_MAX_MESSAGE_LEN}
          placeholder=""
          className="border border-gray-300 p-2 w-full"
        />
        {errors.message && (
          <div className="text-neon-amber">{errors.message}</div>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="text-gray-50 font-bold bg-primary-600 rounded-lg hover:bg-primary-700 w-full px-4 py-3 text-center"
      >
        {isSubmitting ? t("common.modal.sending") : t("common.modal.send")}
      </button>
    </form>
  );
};

export default ContactForm;
