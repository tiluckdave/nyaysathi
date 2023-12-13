import { storage } from '@/lib/firebase';

export const uploadFile = async (file) => {
    const storageRef = storage.ref();
    const fileRef = storageRef.child(file.name);
    // make public to get url
    await fileRef.put(file);
    const url = await fileRef.getDownloadURL();
    return url;
}