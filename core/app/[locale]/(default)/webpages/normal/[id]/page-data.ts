import { Console } from 'node:console';
import { cache } from 'react';

import { client } from '~/client';
import { graphql } from '~/client/graphql';
import { revalidate } from '~/client/revalidate-target';

const NormalPageQuery = graphql(`
  query NormalPageQuery($id: ID!) {
    node(id: $id) {
      ... on NormalPage {
        __typename
        name
        htmlBody
        entityId
        seo {
          pageTitle
          metaDescription
          metaKeywords
        }
      }
    }
  }
`);

export const getWebpageData = cache(async (variables: { id: string }) => {
  console.log('Fetching data for ID:', variables.id);  // Log the id you're using
  const { data } = await client.fetch({
    document: NormalPageQuery,
    variables,
    fetchOptions: { next: { revalidate } },
  });

  // console.log('API response:', data); // Log the full response from the API
  return data;
});
