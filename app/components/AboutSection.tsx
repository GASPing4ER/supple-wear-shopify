import {Image} from '@shopify/hydrogen';
import {Link} from '@remix-run/react';
import type {Maybe} from 'graphql/jsutils/Maybe';
import type {
  Image as TImage,
  MetaobjectField,
  Metaobject,
} from '@shopify/hydrogen/storefront-api-types';

type TAboutRoute =
  | (Pick<Metaobject, 'handle' | 'type'> & {
      image?: Maybe<
        Pick<MetaobjectField, 'value'> & {
          reference?: Maybe<{
            image?: Maybe<Pick<TImage, 'altText' | 'url' | 'width' | 'height'>>;
          }>;
        }
      >;
      title?: Maybe<Pick<MetaobjectField, 'value'>>;
      description?: Maybe<Pick<MetaobjectField, 'value'>>;
      cta?: Maybe<Pick<MetaobjectField, 'value'>>;
      cta_link?: Maybe<Pick<MetaobjectField, 'value'>>;
    })
  | null
  | undefined;

type AboutSectionProps = {
  aboutRoute: TAboutRoute;
};

export function AboutSection({aboutRoute}: AboutSectionProps) {
  const title = aboutRoute?.title?.value;
  const description = aboutRoute?.description?.value;
  const cta = aboutRoute?.cta?.value;
  const cta_link = aboutRoute?.cta_link?.value ?? '';
  const imageUrl = aboutRoute?.image?.reference?.image?.url;
  const imageAlt = aboutRoute?.image?.reference?.image?.altText ?? '';
  const imgWidth = aboutRoute?.image?.reference?.image?.width;
  const imgHeight = aboutRoute?.image?.reference?.image?.height;

  return (
    <div className="flex h-[50vh] md:h-[70vh]">
      <div className="flex-1 bg-white text-black flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl tracking-widest philosopher">{title}</h1>
        <p className="px-10 sm:px-20 text-center text-xs sm:text-sm cormorant">
          {description}
        </p>
        <Link
          to={cta_link}
          className={`text-sm underline underline-offset-8 cormorant`}
        >
          {cta}
        </Link>
      </div>
      <div className="flex-1 hidden md:block">
        <video
          className="object-cover w-full h-full hidden xl:block"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/videos/supple.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
