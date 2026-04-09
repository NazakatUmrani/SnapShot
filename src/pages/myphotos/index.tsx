import { useUserAuth } from '@/context/userAuthContext';
import { getPostsByUserId } from '@/db/post.service';
import type { MyPost, Post } from '@/types/types';
import { type FunctionComponent, useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import { toast } from 'react-toastify';

interface IMyPhotosProps {}

const MyPhotos: FunctionComponent<IMyPhotosProps> = () => {
  const {user} = useUserAuth();
  
  const [posts, setPosts] = useState<MyPost[]>([]);

  const getAllPosts = async (id: string) => {
    try {
      const q = await getPostsByUserId(id);
      const tempArr: MyPost[] = [];
      if(q.size > 0){
        q.forEach((doc) => {
          const data = doc.data() as Post;
          const objRes = {
            id: doc.id,
            ...data
          }
          tempArr.push(objRes as MyPost);
        });
        setPosts(tempArr);
      } else {
        console.log('No posts found');
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to get posts');
    }
  }

  useEffect(() => {
    if(user){
      getAllPosts(user.uid);
    }
  }, []);

  return (
    <div className='flex justify-center w-full h-full p-5'>
      <div className='border max-w-3xl w-full'>
        <h3 className='bg-foreground text-background text-lg text-center p-2'>
          My Photos
        </h3>
        <div className='p-8 h-full'>
          <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
            {posts ? (
              posts.map((post) => (
                <div key={post.id} className='relative'>
                  <div className='absolute top-0 left-0 transition-all duration-300 bg-transparent hover:bg-accent/60 w-full h-full'>
                    <div className="*:hidden group flex flex-col justify-center items-center h-full w-full">
                      <FaHeart className='group-hover:block' />
                      <div className='group-hover:block'>{post.likes}</div>
                    </div>
                  </div>
                  <img
                    src={`${post.images[0].cdnUrl}/-/progressive/yes/-/scale_crop/300x300/center`}
                    alt={post.caption}
                    className='w-full h-full object-cover rounded-lg'
                  />
                </div>
              ))
            ) : (
              <div>No posts</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPhotos;
