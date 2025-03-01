'use client';

import { useTranslations } from 'next-intl';

import { FragmentOf } from '~/client/graphql';
import { Button } from '~/components/ui/button';

import { AddToCartButtonFragment } from './fragment';

export const AddToCartButton = ({
  children,
  data: product,
  className,
  loading = false,
}: {
  children?: React.ReactNode;
  data: FragmentOf<typeof AddToCartButtonFragment>;
  className?: string;
  loading?: boolean;
}) => {
  const t = useTranslations('Components.AddToCartButton');

  const buttonText = () => {
    if (product.availabilityV2.status === 'Unavailable') {
      return t('unavailable');
    }

    if (product.availabilityV2.status === 'Preorder') {
      return t('preorder');
    }

    if (!product.inventory.isInStock) {
      return t('outOfStock');
    }

    return t('addToCart');
  };

  return (
    <Button
      className='bg-transparent text-black border-black hover:border-black hover:bg-black hover:bg-opacity-10 hover:text-black disabled:text-gray-400 disabled:hover:border-gray-400 disabled:hover:bg-transparent disabled:hover:text-gray-400'
      disabled={!product.inventory.isInStock}
      loading={loading}
      loadingText={t('processing')}
      type="submit"
    >
      {children}
      {buttonText()}
    </Button>
  );
};
