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
    <>
      <main className="p-10 flex flex-col gap-10">
        <h1 className="philosopher text-4xl text-center">
          {' '}
          {language === 'EN'
            ? about_page.title.EN
            : language === 'ES'
            ? about_page.title.ES
            : about_page.title.SL}
        </h1>
        <section className="cormorant flex flex-col xl:flex-row gap-10 w-full xl:h-[600px]">
          <div className="flex-1 flex flex-col gap-4">
            <p>
              {language === 'EN'
                ? about_page.about.EN
                : language === 'ES'
                ? about_page.about.ES
                : about_page.about.SL}
            </p>
            <p>
              {language === 'EN'
                ? about_page.founder_story.EN
                : language === 'ES'
                ? about_page.founder_story.ES
                : about_page.founder_story.SL}
            </p>
            <p>
              {language === 'EN'
                ? about_page.monika_bio.EN
                : language === 'ES'
                ? about_page.monika_bio.ES
                : about_page.monika_bio.SL}
            </p>
            <p>
              {language === 'EN'
                ? about_page.quote.EN
                : language === 'ES'
                ? about_page.quote.ES
                : about_page.quote.SL}
            </p>
            <p>
              {language === 'EN'
                ? about_page.supple_vision.EN
                : language === 'ES'
                ? about_page.supple_vision.ES
                : about_page.supple_vision.SL}
            </p>
            <p>
              {language === 'EN'
                ? about_page.call_to_action.EN
                : language === 'ES'
                ? about_page.call_to_action.ES
                : about_page.call_to_action.SL}
            </p>
          </div>
          <div className="flex-1 h-full">
            <video
              src="/videos/about.mp4"
              className="object-cover w-full h-full"
              autoPlay
              loop
              muted
            />
          </div>
        </section>
        {/* <section>
          <h2 className="philosopher text-2xl mb-4">
            {' '}
            {language === 'EN'
              ? about_page.why_choose_supple.EN
              : language === 'ES'
              ? about_page.why_choose_supple.ES
              : about_page.why_choose_supple.SL}
          </h2>
          <div>
            <ul className="flex flex-col gap-4 cormorant">
              <li>
                {language === 'EN'
                  ? about_page.premium_materials.EN
                  : language === 'ES'
                  ? about_page.premium_materials.ES
                  : about_page.premium_materials.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.timeless_elegance.EN
                  : language === 'ES'
                  ? about_page.timeless_elegance.ES
                  : about_page.timeless_elegance.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.comfort.EN
                  : language === 'ES'
                  ? about_page.comfort.ES
                  : about_page.comfort.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.flattering_fit.EN
                  : language === 'ES'
                  ? about_page.flattering_fit.ES
                  : about_page.flattering_fit.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.supporting_local.EN
                  : language === 'ES'
                  ? about_page.supporting_local.ES
                  : about_page.supporting_local.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.sustainability.EN
                  : language === 'ES'
                  ? about_page.sustainability.ES
                  : about_page.sustainability.SL}
              </li>
              <li>
                {language === 'EN'
                  ? about_page.versatility.EN
                  : language === 'ES'
                  ? about_page.versatility.ES
                  : about_page.versatility.SL}
              </li>
            </ul>
          </div>
        </section> */}
      </main>
    </>
  );
}
