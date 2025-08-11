import { useTranslation } from "next-i18next";
import React, { FormEvent, useState } from "react";

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors: { [key: string]: string } = {};
    let isValid = true;

    if (formData.name.trim() === "") {
      tempErrors.name = t("common.modal.error.name");
      isValid = false;
    }
    if (formData.email.trim() === "") {
      tempErrors.email = t("common.modal.error.email");
      isValid = false;
    }
    if (formData.message.trim() === "") {
      tempErrors.message = t("common.modal.error.message");
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
          body: JSON.stringify(formData),
        });

        if (response.ok && response.status === 200) {
          setIsSuccess(true);
          setFormData({ name: "", email: "", message: "" });
          setErrors({});
        } else {
          const contentType = response.headers.get("content-type") || "";
          let errorMessage = "Failed to send email";
          if (contentType.includes("application/json")) {
            try {
              const data = await response.json();
              errorMessage = data.error || data.message || errorMessage;
            } catch (_) {
              // ignore
            }
          } else {
            try {
              const text = await response.text();
              errorMessage = text || errorMessage;
            } catch (_) {
              // ignore
            }
          }
          throw new Error(errorMessage);
        }
      } catch (error: any) {
        console.error("Error sending email:", error);
        setErrorMessage(error.message);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  if (errorMessage) {
    return <div className="text-neon-amber">{errorMessage}</div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSuccess && (
        <div className="text-gray-100">{t("common.modal.success")}</div>
      )}
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
        className="bg-blue-500 text-extra-strong p-2 rounded"
      >
        {isSubmitting ? t("common.modal.sending") : t("common.modal.send")}
      </button>
    </form>
  );
};

export default ContactForm;
