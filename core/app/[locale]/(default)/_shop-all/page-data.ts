//This page is deprecated since I figured out how to make pages using the 
// Products > categories tab in the Big Commerce dashboard

// //This page needs to fetch all the products using a graphql query 

// import { cache } from 'react';

// import { getSessionCustomerAccessToken } from '~/auth';
// import { client } from '~/client';
// import { graphql } from '~/client/graphql';
// import { revalidate } from '~/client/revalidate-target';

// import { ProductCardCarouselFragment } from '~/components/product-card-carousel/fragment';

// const ProductPageQuery = graphql(`
// query productListing {
//     site {
//         products {
//             edges {
//                 node {
//                 ...ProductCardCarouselFragment
//                 }
//             }
//         }
//     }
// }`, 
// [ProductCardCarouselFragment],
// );

// //function that makes the query and builds the data object
// export const getProducts = cache(async () => {
//   const customerAccessToken = await getSessionCustomerAccessToken();

//   const { data } = await client.fetch({
//     document: ProductPageQuery,  
//     customerAccessToken,
//     fetchOptions: customerAccessToken ? { cache: 'no-store' } : { next: { revalidate } },
//   });

//   return data;
// });