import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { ProductBase } from '@asterum/types';

export const imageUpload = async (image: File) => {
  if (!image) return;

  const storageRef = ref(storage, `products/${image.name}`);
  await uploadBytes(storageRef, image);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
};

/**
 *  제품 추가하기
 * @param {ProductBase} prdocut
 */
export async function addProduct(prdocut: ProductBase) {
  const productId = uuidv4();

  console.log(productId);

  setDoc(doc(db, 'products', productId), { id: productId, ...prdocut }).catch((e) => {
    console.log(e);
    // TODO: 에러 핸들링
  });
}
