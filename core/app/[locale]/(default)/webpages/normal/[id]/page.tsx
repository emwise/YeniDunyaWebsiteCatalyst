import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getWebpageData } from './page-data';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;

  const data = await getWebpageData({ id: decodeURIComponent(id) }); //original

  const webpage = data.node?.__typename === 'NormalPage' ? data.node : null;

  if (!webpage) {
    return {};
  }

  const { pageTitle, metaDescription, metaKeywords } = webpage.seo;

  return {
    title: pageTitle || webpage.name,
    description: metaDescription,
    keywords: metaKeywords ? metaKeywords.split(',') : null,
  };
}

export default async function WebPage({ params }: Props) {
  const { id } = await params;
  // console.log(id);
  // console.log("data =");
  const data = await getWebpageData({ id: decodeURIComponent(id) }); //original
  //const data = await getWebpageData({ id: 'webpages/normal/shipping-returns' }); doesnt work
  // const data = await getWebpageData({ id: '2' }); //doesnt work
  // const data = await getWebpageData({ id: 'shipping-returns' });
  // console.log("decodeURIComponent(id)");
  // console.log(decodeURIComponent(id));
  // console.log("await getWebpageData({ id: 'shipping-returns' });");
  // console.log(data);
  const webpage = data.node?.__typename === 'NormalPage' ? data.node : null;
  console.log("webpage: ", webpage);
  if (!webpage) {
    console.log("here");
    notFound();
  }

  const { name, htmlBody } = webpage;

  return (
    <div className="mx-auto mb-10 flex flex-col justify-center gap-8 lg:w-2/3">
      <h1 className="text-4xl font-black lg:text-5xl">{name}</h1>
      <div dangerouslySetInnerHTML={{ __html: htmlBody }} />
      <div>Hello World</div>
    </div>
  );
}

export const runtime = 'edge';
