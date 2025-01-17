// Connect the consumer to the business on a deeper level
// Provide contextual insight into why the founders created the business
// Share the business’s core values, mission, beliefs, and vision
// Answer any questions that consumers may have about the business

//need to make an email sign up component. 

import type { Metadata } from 'next';

import { Image } from '~/components/image';
import { Link } from '~/components/link';

import AboutUsPageBanner from './AboutUsPageBanner.jpg';

interface Props {
  params: Promise<{
    blogId: string;
  }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  return {
    title: 'About Us',
    description: 'About the founders of Yeni Dunya',
    keywords: 'about us founders vision future sustainability',
  };
}

export default async function AboutUsPage({ params }: Props) {


  return (
    <div className="mx-auto max-w-5xl">
      {/* <h1 className="mb-2 text-3xl font-black lg:text-5xl">About Us</h1>

        <div className="mb-8 flex">
            <small className="text-base text-gray-500"></small> */}
        {/* </div> */}
        <div className="flex flex-wrap mb-6">
            <h1 className='w-full lg:w-1/3 flex-auto p-10 place-content-center font-bold text-3xl front-grey'>
                At Yeni Dünya we believe in a new world
            </h1>
            <Image
                alt={'a sailboat sailing towards misty towers on an overcast day'}
                className="flex-auto w-full lg:w-2/3 object-cover object-center rounded-full"
                height={600}
                src={AboutUsPageBanner}
                width={700}
            />
        </div>
        <div className="mb-6 flex flex-wrap justify-between bg-primary/10 p-4 rounded-lg sm:h-80 lg:h-96">
          <div className='place-content-center w-full lg:w-1/2'>
          <p className='mb-5 text-lg'>
            Our clothing is made using ASColor blanks due to the fantastic weight, style, and durability of the shirts. 
          </p>
          <p className='mb-5 text-lg'>
            We donate 50% of our profit to conservation locally in Chicago and Illinois. Our aim is to improve and expand natural areas for wildlife in the Chicago river and to restore prarie throughout Illinois.
          </p>
          <p className='mb-5 text-lg'>
            As we grow we hope to donate up to 99% of our profit to conservation efforts throughout the United States.         
          </p>
          </div>
          <h3 className="w-full lg:w-1/2 text-right p-10 place-content-center text-3xl font-bold text-primary">
            We prioritize quality and conservation 
          </h3>
        </div>
        {/* <div className='flex w-full place-content-center'>
            <Image
                alt={'linebreak'}
                className="w-8 md:w-16 object-cover object-center"
                height={100}
                src={WebsiteLineBreak}
                width={200}
            />
        </div> */}
        <div> 
            {/* <h3 className='w-full text-center p-10  font-bold'>
                To hear more about upcoming news, conservation efforts, and deals leave your email address here!
            </h3> */}
            
        </div>
    </div>
  );
}

export const runtime = 'edge';
