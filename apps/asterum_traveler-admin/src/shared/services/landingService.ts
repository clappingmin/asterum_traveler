import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebaseConfig';

export const imageUpload = async (
  image: File,
  imageId: string,
  saveType: 'slider' | 'discography'
) => {
  if (!image) return;

  const storageRef = ref(storage, `landing/${saveType}/${imageId}`);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};
