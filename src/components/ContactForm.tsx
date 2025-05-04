import React, { useState, FormEvent } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

export const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: '',
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const validateForm = () => {
    let tempErrors: { [key: string]: string } = {};
    let isValid = true;

    if (formData.name.trim() === '') {
      tempErrors.name = 'Name is required';
      isValid = false;
    }
    if (formData.email.trim() === '') {
      tempErrors.email = 'Email is required';
      isValid = false;
    }
    if (formData.message.trim() === '') {
      tempErrors.message = 'Message is required';
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
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok && response.status === 200) {
                setIsSuccess(true);
                setFormData({name: '', email: '', message: ''});
                setErrors({});
            } else {
                const data = await response.json()
                throw new Error(data.error || 'Failed to send email');
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setErrorMessage(error.message)
        } finally {
            setIsSubmitting(false);
        }
    }
  };

  if(errorMessage) return <div className="text-red-500">{errorMessage}</div>

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {isSuccess && <div className="text-green-500">Thank you for contacting us!</div>}
      <div>
        <label htmlFor="name" className="block">
          Name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder=''
          className="border border-gray-300 p-2 w-full"
        />
        {errors.name && <div className="text-red-500">{errors.name}</div>}
      </div>
      <div>
        <label htmlFor="email" className="block">
          Email:
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder=''
          className="border border-gray-300 p-2 w-full"
        />
        {errors.email && <div className="text-red-500">{errors.email}</div>}
      </div>
      <div>
        <label htmlFor="message" className="block">
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder=''
          className="border border-gray-300 p-2 w-full"
        />
        {errors.message && <div className="text-red-500">{errors.message}</div>}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-500 text-white p-2 rounded"
      >
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};

export default ContactForm;