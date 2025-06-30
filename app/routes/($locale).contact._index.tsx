/* eslint-disable eslint-comments/disable-enable-pair */

import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import ContactForm from '~/components/ContactForm';
import {about_page, contact_page} from '~/data/translations';

export async function loader(args: LoaderFunctionArgs) {
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page

  return defer({...deferredData});
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language} = context.storefront.i18n;

  return {
    language,
  };
}

export default function Page() {
  const {language} = useLoaderData<typeof loader>();
  return (
    <div className="p-6 pt-24 sm:p-24 w-full bg-contrast text-primary">
      <div className="relative w-full flex flex-col items-center text-center max-w-[600px] mx-auto">
        <h1 className={`cormorant text-5xl pt-10 pb-16 md:pb-24`}>
          {language === 'EN'
            ? contact_page.title.EN
            : language === 'ES'
            ? contact_page.title.ES
            : contact_page.title.SL}
        </h1>
        <ContactForm language={language} />
      </div>
    </div>
  );
}
