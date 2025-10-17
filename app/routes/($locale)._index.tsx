import {
  defer,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {Suspense} from 'react';
import {Await, useLoaderData} from '@remix-run/react';
import {getSeoMeta} from '@shopify/hydrogen';

import {collection_section, utilities} from '~/data/translations';
import {ProductSwimlane} from '~/components/ProductSwimlane';
import {MEDIA_FRAGMENT, PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import BackgroundVideo from '~/components/BackgroundVideo';
import {AboutSection} from '~/components/AboutSection';
import {Section} from '~/components/Text';

export const headers = routeHeaders;

export async function loader(args: LoaderFunctionArgs) {
  const {params, context} = args;
  const {language, country} = context.storefront.i18n;

  if (
    params.locale &&
    params.locale.toLowerCase() !== `${language}-${country}`.toLowerCase()
  ) {
    // If the locale URL param is defined, yet we still are on `EN-US`
    // the the locale param must be invalid, send to the 404 page
    throw new Response(null, {status: 404});
  }

  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return defer({...deferredData, ...criticalData});
}

async function loadCriticalData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const [{shop, hero}, aboutRoute] = await Promise.all([
    context.storefront.query(HOMEPAGE_SEO_QUERY, {
      variables: {handle: 'freestyle'},
    }),
    // Add other queries here, so that they are loaded in parallel
    context.storefront.query(ABOUT_SECTION_QUERY, {
      variables: {
        country,
        language,
      },
    }),
  ]);

  return {
    shop,
    primaryHero: hero,
    aboutRoute: aboutRoute.route,
    seo: seoPayload.home(),
  };
}

function loadDeferredData({context}: LoaderFunctionArgs) {
  const {language, country} = context.storefront.i18n;

  const featuredProducts = context.storefront
    .query(HOMEPAGE_FEATURED_PRODUCTS_QUERY, {
      variables: {
        country,
        language,
        tag: "tag:'Featured'",
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  const featuredCollections = context.storefront
    .query(FEATURED_COLLECTIONS_QUERY, {
      variables: {
        country,
        language,
      },
    })
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      // eslint-disable-next-line no-console
      console.error(error);
      return null;
    });

  return {
    featuredProducts,
    featuredCollections,
    language,
  };
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function Homepage() {
  const {aboutRoute, featuredProducts, language} =
    useLoaderData<typeof loader>();

  return (
    <>
      <BackgroundVideo />
      <Section className="text-center uppercase text-lg lg:text-2xl philosopher">
        <h2>Let’s plié, roll up, squat, child pose, and brunch together.</h2>
      </Section>
      {featuredProducts && (
        <Suspense>
          <Await resolve={featuredProducts}>
            {(response) => {
              if (
                !response ||
                !response?.products ||
                !response?.products?.nodes
              ) {
                return <></>;
              }
              return (
                <ProductSwimlane
                  products={response.products}
                  title="Featured Products"
                  count={4}
                />
              );
            }}
          </Await>
        </Suspense>
      )}
      <div className="p-10 flex justify-center">
        <a
          href={`${
            language === 'EN' ? '' : language === 'ES' ? '/es-es' : '/sl-si'
          }/products`}
          className="bg-primary w-fit text-contrast px-6 py-2 rounded-2xl uppercase"
        >
          {language === 'EN'
            ? utilities.see_products_button.EN
            : language === 'ES'
            ? utilities.see_products_button.ES
            : utilities.see_products_button.SL}
        </a>
      </div>
      <div className="flex justify-center py-10">
        <img
          src="/images/supple-drop2.jpeg"
          alt="Supple Drop II"
          className="w-[400px] object-cover h-full"
        />
      </div>
      {/* <section className="w-full"> */}
      {/* <div className="flex flex-col xl:flex-row xl:h-[70vh] w-full mb-4"> */}
      {/* <div className="flex-1 h-full relative">
            <video
              className="object-cover w-full h-full hidden xl:block"
              autoPlay
              loop
              muted
              playsInline
            >
              <source src="/videos/supple.mp4" type="video/mp4" />
            </video>
          </div> */}
      {/* <div className="flex-1 h-full flex">
            <div className="flex flex-col justify-center gap-4 p-8">
              <h2 className="philosopher text-5xl">ESSENTIA COLLECTION</h2>
              <p className="cormorant text-lg">
                {language === 'EN'
                  ? collection_section.description.EN
                  : language === 'ES'
                  ? collection_section.description.ES
                  : collection_section.description.SL}
              </p>
              <h3 className="italic philosopher text-2xl">
                {' '}
                {language === 'EN'
                  ? collection_section.title2.EN
                  : language === 'ES'
                  ? collection_section.title2.ES
                  : collection_section.title2.SL}
              </h3>
              <p className="cormorant text-lg">
                {language === 'EN'
                  ? collection_section.description2.EN
                  : language === 'ES'
                  ? collection_section.description2.ES
                  : collection_section.description2.SL}
              </p>
              <p className="cormorant text-lg">
                {language === 'EN'
                  ? collection_section.audrey.EN
                  : language === 'ES'
                  ? collection_section.audrey.ES
                  : collection_section.audrey.SL}
              </p>
              <p className="cormorant text-lg">
                {language === 'EN'
                  ? collection_section.brigitte.EN
                  : language === 'ES'
                  ? collection_section.brigitte.ES
                  : collection_section.brigitte.SL}
              </p>
              <p className="cormorant text-lg">
                {language === 'EN'
                  ? collection_section.cyd.EN
                  : language === 'ES'
                  ? collection_section.cyd.ES
                  : collection_section.cyd.SL}
              </p>
              <p className="cormorant text-lg">
                {' '}
                {language === 'EN'
                  ? collection_section.leggings.EN
                  : language === 'ES'
                  ? collection_section.leggings.ES
                  : collection_section.leggings.SL}
              </p>
              <a
                href={`${
                  language === 'EN'
                    ? ''
                    : language === 'ES'
                    ? '/es-es'
                    : '/sl-si'
                }/collections/essentia`}
                className="bg-primary w-fit text-contrast px-6 py-2 rounded-2xl uppercase"
              >
                {language === 'EN'
                  ? collection_section.button.EN
                  : language === 'ES'
                  ? collection_section.button.ES
                  : collection_section.button.SL}
              </a>
            </div>
          </div> */}
      {/* </div> */}
      {/* <div className="flex flex-col sm:flex-row gap-4 sm:h-[75vh] my-4">
          <div className="flex-1">
            <a href="https://supplewear.com/products/audrey-bodysuit-burgundy">
              <img
                src="/images/products/audrey-burgundy.jpg"
                alt="product"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
          <div className="flex-1">
            <a href="https://supplewear.com/products/briggite-bodysuit-landscape-green">
              <img
                src="/images/products/brigitte-green.jpg"
                alt="product"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
          <div className="flex-1">
            <a href="https://supplewear.com/products/cyd-bodysuit-beige">
              <img
                src="/images/products/cyd-beige.jpg"
                alt="product"
                className="h-full w-full object-cover"
              />
            </a>
          </div>
        </div>
      </section> */}
      <AboutSection aboutRoute={aboutRoute} />
    </>
  );
}

const COLLECTION_CONTENT_FRAGMENT = `#graphql
  fragment CollectionContent on Collection {
    id
    handle
    title
    descriptionHtml
    heading: metafield(namespace: "hero", key: "title") {
      value
    }
    byline: metafield(namespace: "hero", key: "byline") {
      value
    }
    cta: metafield(namespace: "hero", key: "cta") {
      value
    }
    spread: metafield(namespace: "hero", key: "spread") {
      reference {
        ...Media
      }
    }
    spreadSecondary: metafield(namespace: "hero", key: "spread_secondary") {
      reference {
        ...Media
      }
    }
  }
  ${MEDIA_FRAGMENT}
` as const;

const HOMEPAGE_SEO_QUERY = `#graphql
  query seoCollectionContent($handle: String, $country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    hero: collection(handle: $handle) {
      ...CollectionContent
    }
    shop {
      name
      description
    }
  }
  ${COLLECTION_CONTENT_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/products
export const HOMEPAGE_FEATURED_PRODUCTS_QUERY = `#graphql
  query homepageFeaturedProducts($country: CountryCode, $language: LanguageCode, $tag: String)
  @inContext(country: $country, language: $language) {
    products(first: 8, query: $tag) {
      nodes {
        ...ProductCard
      }
    }
  }
  ${PRODUCT_CARD_FRAGMENT}
` as const;

// @see: https://shopify.dev/api/storefront/current/queries/collections
export const FEATURED_COLLECTIONS_QUERY = `#graphql
  query homepageFeaturedCollections($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
    collections(
      first: 4,
      sortKey: UPDATED_AT
    ) {
      nodes {
        id
        title
        handle
        image {
          altText
          width
          height
          url
        }
      }
    }
  }
` as const;

export const ABOUT_SECTION_QUERY = `#graphql
query getOurStory($country: CountryCode, $language: LanguageCode)
  @inContext(country: $country, language: $language) {
  route: metaobject(handle: {type: "image_with_text", handle: "our-story"}) {
    type
    handle
    image: field(key: "image") {
      value
      reference {
        ... on MediaImage {
          image {
            altText
            url
            width
            height
          }
        }
      }
    }
    title: field(key: "title") {
      value
    }
    description: field(key: "description") {
      value
    }
    cta: field(key: "cta") {
      value
    }
    cta_link: field(key: "cta_link") {
      value
    }
  }
}
` as const;
