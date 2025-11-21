import { createContext, FunctionComponent, useState } from 'react';

import Category from '../types/category-types';

import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase.config';
import { categoryConverter } from '../converters/firebase.converters';

interface ICategoryContextProps {
  categories: Category[];
  fetchCategories: () => Promise<void>;
  isLoading: boolean;
}

interface IContextProvider {
  children?: any;
}

export const CategoryContext = createContext<ICategoryContextProps>({
  isLoading: false,
  categories: [],
  fetchCategories: () => Promise.resolve(),
});

const CategoryContextProvider: FunctionComponent<IContextProvider> = ({
  children,
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsloading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsloading(true);
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter),
      );

      const categoriesFromFirestore: Category[] = [];
      querySnapshot.forEach((doc) => {
        categoriesFromFirestore.push(doc.data());
      });
      setCategories(categoriesFromFirestore);
    } catch (err) {
      console.log({ err });
    } finally {
      setIsloading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{ categories, isLoading, fetchCategories }}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export default CategoryContextProvider;
