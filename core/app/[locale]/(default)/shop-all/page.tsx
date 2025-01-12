//This page needs to receive the data from the getProducts and organize it 
//using the product card compoonent. It's using the productCardCarousel component for now
//In the future I can lay out each product card on the webpade. 

import type { Metadata } from 'next';
import { ProductCard as ComponentProductCard } from '~/components/ui/product-card';
import { ProductCard } from '~/components/product-card';
import { getProducts } from './page-data';
import { removeEdgesAndNodes } from '@bigcommerce/catalyst-client';
import { ProductCardCarousel } from '~/components/product-card-carousel';


export default async function WebPage() {
    const data = await getProducts();
    const allProducts = removeEdgesAndNodes(data.site.products)

    return (
      <div className="mx-auto mb-10 flex flex-col justify-center gap-8 lg:w-2/3">
        <ProductCardCarousel
            products={allProducts}
            showCart={false}
            showCompare={false}
            title={'Shop All'}
        />
      </div>
    );
  }
  

export const runtime = 'edge';
