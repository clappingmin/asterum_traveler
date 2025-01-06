import { Product } from './../../../../../packages/types/interfaces/report.interface';
import { v4 as uuidv4 } from 'uuid';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { collection, doc, getDocs, query, setDoc } from 'firebase/firestore';
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
 * @return {Promise<string>} product id
 */
export async function addProduct(prdocut: ProductBase): Promise<string> {
  try {
    const productId = uuidv4();

    await setDoc(doc(db, 'products', productId), { id: productId, ...prdocut });
    return productId;
  } catch (e) {
    throw e;
  }
}

/**
 * 제품 가져오기
 * @return {Promise<Product[]>}
 */
export async function getProducts(): Promise<Product[]> {
  try {
    const q = query(collection(db, 'products'));

    const querySnapshot = await getDocs(q);
    const products: Product[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        productName: data.productName ?? '',
        productBrand: data.productBrand ?? '',
        productThumbnail: data.productThumbnail ?? '',
      } as Product;
    });

    return products;
  } catch (e) {
    return [];
  }
}
