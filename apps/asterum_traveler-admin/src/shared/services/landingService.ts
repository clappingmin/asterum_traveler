import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { SliderImage } from '@asterum/types';
import { doc, setDoc } from 'firebase/firestore';

export const imageUpload = async (
  image: File,
  imageId: string,
  saveType: 'slider' | 'discography'
) => {
  try {
    if (!image) return;

    const storageRef = ref(storage, `landing/${saveType}/${image.name}`);
    await uploadBytes(storageRef, image);
    const downloadURL = await getDownloadURL(storageRef);

    const targetImage: SliderImage = {
      id: imageId,
      order: -1,
      imageUrl: downloadURL,
    };

    await setDoc(doc(db, 'landing-slider', imageId), targetImage);

    return downloadURL;
  } catch (e) {
    console.log(e);
  }
};
