'use client';

import {useState, type ChangeEvent} from 'react';

import {addInquiryToFirebase} from '~/data/actions';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState<number | null>(null);
  const [message, setMessage] = useState<string>('');
  const [buttonDisabled, setButtonDisabled] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

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
    setSubmitting(true);
    await addInquiryToFirebase(formData);

    setFormData({
      name: '',
      email: '',
      message: '',
    });

    setSubmitting(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="w-full flex flex-col gap-10 items-center text-sm dark:text-primary text-contrast"
    >
      <div className="flex w-full gap-8">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Your Name"
          className="bg-transparent border-b dark:border-primary border-primary rounded-md pb-4 w-full"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email Address"
          className="bg-transparent border-b dark:border-primary border-primary rounded-md pb-4 w-full"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      <textarea
        id="message"
        name="message"
        placeholder="Give us a little detail so we can best help your needs!"
        className="bg-transparent border-b dark:border-primary border-primary rounded-md min-h-[100px] h-fit pb-4 w-full"
        value={formData.message}
        onChange={handleInputChange}
      />
      <button
        type="submit"
        className={`cormorant dark:bg-primary bg-primary dark:text-contrast text-contrast px-8 py-2 disabled:opacity-80`}
        disabled={buttonDisabled}
        aria-label="Submit Form"
      >
        {submitting ? 'SUBMITTING' : 'SUBMIT FORM'}
      </button>
      {message && (
        <p
          className={`${
            status !== 201 ? 'text-red-500' : 'text-green-500'
          } pt-4 font-black`}
        >
          {message}
        </p>
      )}
    </form>
  );
};

export default ContactForm;
