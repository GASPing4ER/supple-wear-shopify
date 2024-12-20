/* eslint-disable eslint-comments/disable-enable-pair */

import {useLoaderData} from '@remix-run/react';
import {defer, type LoaderFunctionArgs} from '@shopify/remix-oxygen';

import {about_page} from '~/data/translations';

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
    <div className="bg-slate-900 p-6 pt-24 sm:p-24 w-full">
      <div className="relative w-full h-screen flex flex-col items-center text-center max-w-[600px] mx-auto">
        <h1 className={`cormorant text-slate-50 text-7xl pt-10 pb-16 md:pb-24`}>
          INQUIRE
        </h1>
        {/* <ContactForm /> */}
      </div>
    </div>
  );
}
