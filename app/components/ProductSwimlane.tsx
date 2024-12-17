import type {HomepageFeaturedProductsQuery} from 'storefrontapi.generated';

import {ProductCardSwimlane} from './ProductCardSwimlane';

const mockProducts = {
  nodes: new Array(12).fill(''),
};

type ProductSwimlaneProps = HomepageFeaturedProductsQuery & {
  title?: string;
  count?: number;
};

export function ProductSwimlane({
  title = 'Featured Products',
  products = mockProducts,
  count = 12,
  ...props
}: ProductSwimlaneProps) {
  return (
    <section {...props}>
      <div className="swimlane scroll-p-0 pt-4 pb-4 hiddenScroll ">
        {products.nodes.map((product) => (
          <ProductCardSwimlane
            product={product}
            key={product.id}
            className="snap-start w-96"
          />
        ))}
      </div>
    </section>
  );
}
