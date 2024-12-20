'use client';

import {useState, type FormEvent} from 'react';

import {addNewsletterToFirebase} from '~/data/actions';
import {newsletter} from '~/data/translations';

type NewsletterProps = {
  language: string;
};

const Newsletter = ({language}: NewsletterProps) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    addNewsletterToFirebase(email);
  };

  return (
    <div className="md:w-[400px] flex flex-col items-center text-center gap-3">
      <h2 className={`cormorant text-xl font-bold`}>
        {language === 'EN'
          ? newsletter.h2.EN
          : language === 'ES'
          ? newsletter.h2.ES
          : newsletter.h2.SL}
      </h2>
      <p className={`text-sm philosopher`}>
        {' '}
        {language === 'EN'
          ? newsletter.paragraph.EN
          : language === 'ES'
          ? newsletter.paragraph.ES
          : newsletter.paragraph.SL}
      </p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          name="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={
            language === 'EN'
              ? newsletter.email_placeholder.EN
              : language === 'ES'
              ? newsletter.email_placeholder.ES
              : newsletter.email_placeholder.SL
          }
          className="border-0 bg-transparent border-b-[1px] rounded-none border-white placeholder:text-sm placeholder:text-white pl-0 pb-2"
        />
        {/* <div className="flex gap-2 mt-4">
          <input
            type="radio"
            id="consent"
            name="consent"
            checked={isConsented}
            onChange={handleConsentChange}
          />
          <label htmlFor="consent" className="text-xs">
            {content.newsletter["radio-button"]}
          </label>
        </div> */}
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-white text-black text-xs"
          aria-label="Submit"
        >
          {language === 'EN'
            ? newsletter.button.EN
            : language === 'ES'
            ? newsletter.button.ES
            : newsletter.button.SL}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
