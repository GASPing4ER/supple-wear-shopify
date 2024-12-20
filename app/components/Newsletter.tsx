'use client';

import type {FormEvent} from 'react';

type NewsletterProps = {
  content: any;
};

const Newsletter = ({content}: NewsletterProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle form submission logic
    alert('Subscribed successfully!');
  };

  return (
    <div className="md:w-[400px] flex flex-col items-center lg:items-baseline text-center lg:text-left gap-3">
      <h2 className={`cormorant text-xl font-bold`}>{content.newsletter.h2}</h2>
      <p className={`text-sm philosopher`}>{content.newsletter.paragraph}</p>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <input
          type="email"
          name="email"
          id="email"
          placeholder={content.newsletter['email-placeholder']}
          className="border-0 bg-transparent border-b-[1px] rounded-none border-black placeholder:text-sm placeholder:text-black pl-0 pb-2"
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
          className="mt-4 px-4 py-2 bg-black text-white text-xs  lg:place-self-start"
          aria-label="Submit"
        >
          {content.newsletter.button}
        </button>
      </form>
    </div>
  );
};

export default Newsletter;
