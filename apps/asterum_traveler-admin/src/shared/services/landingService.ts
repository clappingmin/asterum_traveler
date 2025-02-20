import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { db, storage } from '../firebaseConfig';
import { Album, SliderImage } from '@asterum/types';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { v4 as uuidv4 } from 'uuid';

export const imageUpload = async (
  image: File,
  imageId: string,
  saveType: 'slider' | 'discography'
) => {
  try {
    if (!image) return;

    const storageRef = ref(storage, `landing/${saveType}/${imageId}`);
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

/**
 * 슬라이더 이미지 가져오기
 * @return {Promise<SliderImage[]>}
 */
export async function getSliderImages(): Promise<SliderImage[]> {
  try {
    const imagesRef = collection(db, 'landing-slider');

    const q = query(imagesRef, orderBy('order'));

    const querySnapshot = await getDocs(q);
    const images: SliderImage[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        order: data.order ?? -1,
        imageUrl: data.imageUrl ?? '',
      } as SliderImage;
    });

    return images;
  } catch (e) {
    return [];
  }
}

export async function setSliderImage(sliderImage: SliderImage, order: number): Promise<boolean> {
  try {
    // FIXME: 드래그앤드랍 추가 후 order 방식 수정 필요
    // FIXME: 리오더링 알고리즘도 필요
    await setDoc(doc(db, 'landing-slider', sliderImage.id), { ...sliderImage, order });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getViewdSliderImages(): Promise<SliderImage[]> {
  try {
    const imagesRef = collection(db, 'landing-slider');

    const q = query(imagesRef, where('order', '!=', -1), orderBy('order'));

    const querySnapshot = await getDocs(q);
    const images: SliderImage[] = querySnapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: data.id,
        order: data.order ?? 0,
        imageUrl: data.imageUrl ?? '',
      } as SliderImage;
    });

    return images;
  } catch (e) {
    console.log(e);
    return [];
  }
}

/**
 * 슬라이더 이미지 삭제
 * @param {string }targetId
 * @return {Promise<boolean>}
 */
export async function deleteDBSliderImage(targetId: string): Promise<boolean> {
  try {
    await deleteDoc(doc(db, 'landing-slider', targetId));

    const targetRef = ref(storage, `landing/slider/${targetId}`);
    await deleteObject(targetRef);

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function addAlbum(
  albumCover: File,
  albumName: string,
  releaseDate: string
): Promise<string> {
  try {
    if (!albumCover) return '';

    const albumId = uuidv4();

    const storageRef = ref(storage, `landing/discography/${albumId}`);
    await uploadBytes(storageRef, albumCover);
    const downloadURL = await getDownloadURL(storageRef);

    const targetAlbum: Album = {
      id: albumId,
      imageUrl: downloadURL,
      albumName,
      releaseDate,
    };

    await setDoc(doc(db, 'discography', albumId), targetAlbum);

    return downloadURL;
  } catch (error) {
    console.log(error);
    return '';
  }
}
