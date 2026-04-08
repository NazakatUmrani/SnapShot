import FileUploader from '@/components/fileUploader';
import MyButton from '@/components/MyButton';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useUserAuth } from '@/context/userAuthContext';
import { createPost } from '@/db/post.service';
import type { FileEntry, PhotoMeta, Post } from '@/types/types';
import { useState, type ChangeEvent, type FunctionComponent, type SubmitEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

interface ICreatePostProps {
}

const CreatePost: FunctionComponent<ICreatePostProps> = (props) => {
  const navigate = useNavigate();
  
  const {user} = useUserAuth();
  const [fileEntry, setFileEntry] = useState<FileEntry>({
    files: []
  });
  const [post, setPost] = useState<Post>({
    caption: '',
    images: [],
    likes: 0,
    userLikes: [],
    userId: null,
    date: new Date()
  })

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setIsSubmitting(true);
      
      const photoMeta: PhotoMeta[] = fileEntry.files.map(file => {
        return {
          cdnUrl: `${file.cdnUrl}`,
          uuid: `${file.uuid}`
        }
      })
  
      if (user) {
        const newPost:Post = {
          ...post,
          images: photoMeta,
          userId: user.uid
        }
  
        await createPost(newPost);
        toast.success('Post created successfully');
        navigate('/');
      } else {
        navigate('/login');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className='flex justify-center w-full h-full p-5'>
      <div className='border max-w-3xl w-full h-full'>
        <h3 className='bg-foreground text-background text-lg text-center p-2'>
          Create a post
        </h3>
        <div className='p-8 h-full'>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col'>
              <Label 
                className='mb-4'
                htmlFor='caption'>
                  Photo Caption
              </Label>
              <Textarea 
                className='mb-8'
                id='caption'
                placeholder='Write about your photo.'
                value={post.caption}
                onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setPost({...post, caption: e.target.value})}
              />
              <div className='flex flex-col'>
                <Label 
                  className='mb-4'
                  htmlFor='photo'
                >
                  Photos
                </Label>
                <FileUploader 
                  fileEntry={fileEntry}
                  onChange={setFileEntry}
                />
                <MyButton
                  className='mt-8 w-32'
                  type='submit'
                  disabled={isSubmitting}
                  isLoading={isSubmitting}
                >Post</MyButton>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
