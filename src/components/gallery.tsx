import * as React from 'react';
import Image1 from '@/assets/images/Image1.jpg';
import Image2 from '@/assets/images/Image2.jpg';
import Image3 from '@/assets/images/Image3.jpg';
import Image4 from '@/assets/images/Image4.jpg';

interface IGalleryProps {
}

const Gallery: React.FunctionComponent<IGalleryProps> = (props) => {
  return <div className='hidden lg:block w-3/5'>
        <div className='grid grid-cols-2 gap-2'>
          <img 
            src={Image1}
            alt="Image 1"
            className='w-2/3 h-auto aspect-video rounded-3xl place-self-end'
          />
          <img 
            src={Image2}
            alt="Image 2"
            className='w-2/4 h-auto aspect-auto rounded-3xl'
          />
          <img 
            src={Image3}
            alt="Image 3"
            className='w-2/4 h-auto aspect-auto rounded-3xl place-self-end'
          />
          <img 
            src={Image4}
            alt="Image 4"
            className='w-2/3 h-auto aspect-video rounded-3xl'
          />
        </div>
      </div>;
};

export default Gallery;