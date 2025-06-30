'use client';

import {useState, type ChangeEvent} from 'react';

import {addInquiryToFirebase} from '~/data/actions';
import {contact_page} from '~/data/translations';

type ContactFormProps = {
  language: string;
};

const ContactForm = ({language}: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState<null | string>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Handler to update state on input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const {name, value} = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const errorData = await addInquiryToFirebase(formData);
    setError(errorData);
    if (errorData !== null) {
      setFormData({
        name: '',
        email: '',
        message: '',
      });
      setIsSubmitted(true);
      setMessage('Submission failed');
    }
    setFormData({
      name: '',
      email: '',
      message: '',
    });
    setIsSubmitted(true);
    setMessage('Submission successful');
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-10 items-center text-sm text-contrast"
    >
      <div className="flex w-full gap-8">
        <input
          type="text"
          id="name"
          name="name"
          placeholder={
            language === 'EN'
              ? contact_page.name_placeholder.EN
              : language === 'ES'
              ? contact_page.name_placeholder.ES
              : contact_page.name_placeholder.SL
          }
          className="bg-transparent border-b border-primary rounded-md pb-4 w-full"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder={
            language === 'EN'
              ? contact_page.email_placeholder.EN
              : language === 'ES'
              ? contact_page.email_placeholder.ES
              : contact_page.email_placeholder.SL
          }
          className="bg-transparent border-b border-primary rounded-md pb-4 w-full"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <textarea
        id="message"
        name="message"
        placeholder={
          language === 'EN'
            ? contact_page.message_placeholder.EN
            : language === 'ES'
            ? contact_page.message_placeholder.ES
            : contact_page.message_placeholder.SL
        }
        className="bg-transparent border-b border-primary rounded-md min-h-[100px] h-fit pb-4 w-full"
        value={formData.message}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className={`cormorant bg-primary text-contrast px-8 py-2 disabled:opacity-80`}
        disabled={isSubmitted}
        aria-label="Submit Form"
      >
        {isSubmitted
          ? 'SUBMITTED'
          : language === 'EN'
          ? contact_page.cta.EN
          : language === 'ES'
          ? contact_page.cta.ES
          : contact_page.cta.SL}
      </button>
      {message && (
        <p
          className={`${
            error !== null ? 'text-red-500' : 'text-green-500'
          } pt-4 font-black`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
