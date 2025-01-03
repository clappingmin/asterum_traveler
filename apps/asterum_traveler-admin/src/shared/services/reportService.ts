import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const imageUpload = async (image: File) => {
  if (!image) return;

  const storageRef = ref(storage, `images/${image.name}`);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
