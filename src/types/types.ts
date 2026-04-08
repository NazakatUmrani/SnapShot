import type { OutputFileEntry } from '@uploadcare/react-uploader';
import { type IconType } from 'react-icons';

export interface NavItem {
  name: string;
  link: string;
  icon: IconType;
}

export interface UserSignUp {
    email: string;
    password: string;
    confirmPassword: string
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface PhotoMeta {
    cdnUrl: string;
    uuid: string;
}

export interface Post {
    caption: string;
    images: PhotoMeta[];
    likes: number;
    userLikes: [];
    userId: string | null;
    date: Date;
}

export interface FileEntry {
    files: OutputFileEntry[];
}