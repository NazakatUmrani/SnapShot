import { firebaseDB } from "@/firebaseConfig";
import type { Post } from "@/types/types";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, orderBy, query, where } from "firebase/firestore";

const COLLLECTION_NAME = "posts";

export const createPost = (posts: Post) => {
    return addDoc(collection(firebaseDB, COLLLECTION_NAME), posts);
}

export const getPosts = () => {
    const q = query(collection(firebaseDB, COLLLECTION_NAME), orderBy("date", "desc"));
    return getDocs(q);
}

export const getPostByUserId = (userId: string) => {
    const q = query(collection(firebaseDB, COLLLECTION_NAME), where("userId", "==", userId));
    return getDocs(q);
}

export const getPost = (id: string) => {
    const docRef = doc(firebaseDB, COLLLECTION_NAME, id);
    return getDoc(docRef);
}

export const deletePost = (id: string) => {
    return deleteDoc(doc(firebaseDB, COLLLECTION_NAME, id));
}