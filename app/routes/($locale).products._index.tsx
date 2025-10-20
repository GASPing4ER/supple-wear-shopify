import {
  json,
  type MetaArgs,
  type LoaderFunctionArgs,
} from '@shopify/remix-oxygen';
import {useLoaderData} from '@remix-run/react';
import invariant from 'tiny-invariant';
import {
  Pagination,
  getPaginationVariables,
  getSeoMeta,
} from '@shopify/hydrogen';
import {useState} from 'react';

import {Section} from '~/components/Text';
import {ProductCard} from '~/components/ProductCard';
import {Grid} from '~/components/Grid';
import {PRODUCT_CARD_FRAGMENT} from '~/data/fragments';
import {getImageLoadingPriority} from '~/lib/const';
import {seoPayload} from '~/lib/seo.server';
import {routeHeaders} from '~/data/cache';
import CategoryFilter from '~/components/CategoryFilter';

const PAGE_BY = 30;

export const headers = routeHeaders;

export async function loader({
  request,
  context: {storefront},
}: LoaderFunctionArgs) {
  const variables = getPaginationVariables(request, {pageBy: PAGE_BY});

  const data = await storefront.query(ALL_PRODUCTS_QUERY, {
    variables: {
      ...variables,
      country: storefront.i18n.country,
      language: storefront.i18n.language,
    },
  });

  invariant(data, 'No data returned from Shopify API');

  const seo = seoPayload.collection({
    url: request.url,
    collection: {
      id: 'all-products',
      title: 'All Products',
      handle: 'products',
      descriptionHtml: 'All the store products',
      description: 'All the store products',
      seo: {
        title: 'All Products',
        description: 'All the store products',
      },
      metafields: [],
      products: data.products,
      updatedAt: '',
    },
  });

  const filteredProducts = {
    ...data.products,
    nodes: data.products.nodes.filter(
      (product) => !product.tags.includes('events'),
    ),
  };

  return json({
    products: filteredProducts,
    seo,
  });
}

export const meta = ({matches}: MetaArgs<typeof loader>) => {
  return getSeoMeta(...matches.map((match) => (match.data as any).seo));
};

export default function AllProducts() {
  const {products} = useLoaderData<typeof loader>();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const categories = ['leggings', 'bodysuit', 'skirt', 'pants'];

  let sortedProducts = [...products.nodes].sort((a, b) => {
    // 1️⃣ First priority: Featured tag
    const aFeatured = a.tags.includes('Featured') ? 1 : 0;
    const bFeatured = b.tags.includes('Featured') ? 1 : 0;
    if (bFeatured - aFeatured !== 0) return bFeatured - aFeatured; // Featured first

    // 2️⃣ Second priority: Color
    const colorA = a.variants.nodes[0].selectedOptions[0].value;
    const colorB = b.variants.nodes[0].selectedOptions[0].value;
    const colorComparison = colorA.localeCompare(colorB);
    if (colorComparison !== 0) return colorComparison;

    // 3️⃣ Third priority: Product type inferred from title
    const getProductType = (title: string) => {
      if (title.includes('Bodysuit')) return 'bodysuit';
      if (title.includes('Leggings')) return 'leggings';
      if (title.includes('Skirt')) return 'skirt';
      return '';
    };

    const productTypeA = getProductType(a.title);
    const productTypeB = getProductType(b.title);
    return productTypeA.localeCompare(productTypeB);
  });

  if (selectedCategory !== 'all') {
    sortedProducts = sortedProducts.filter((product) =>
      product.title.toLowerCase().includes(selectedCategory),
    );
  }
  return (
    <>
      {/* <PageHeader heading="All Products" variant="allCollections" /> */}
      <Section>
        <CategoryFilter
          categories={categories}
          onFilter={setSelectedCategory}
        />
        <Pagination connection={products}>
          {({nodes, isLoading, NextLink, PreviousLink}) => {
            const itemsMarkup = sortedProducts.map((product, i) => (
              <ProductCard
                key={product.id}
                product={product}
                loading={getImageLoadingPriority(i)}
              />
            ));

            return (
              <>
                <div className="flex items-center justify-center mt-6">
                  <PreviousLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                    {isLoading ? 'Loading...' : 'Previous'}
                  </PreviousLink>
                </div>
                <Grid data-test="product-grid">{itemsMarkup}</Grid>
                <div className="flex items-center justify-center mt-6">
                  <NextLink className="inline-block rounded font-medium text-center py-3 px-6 border border-primary/10 bg-contrast text-primary w-full">
                    {isLoading ? 'Loading...' : 'Next'}
                  </NextLink>
                </div>
              </>
            );
          }}
        </Pagination>
      </Section>
    </>
  );
}

const ALL_PRODUCTS_QUERY = `#graphql
query AllProducts(
  $country: CountryCode
  $language: LanguageCode
  $first: Int
  $last: Int
  $startCursor: String
  $endCursor: String
) @inContext(country: $country, language: $language) {
  products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
    nodes {
      ...ProductCard
      tags
    }
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
  }
}
${PRODUCT_CARD_FRAGMENT}
` as const;
