import { useEffect, useState } from 'react';

import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase.config';
import Category from '../../types/category-types';
import { categoryConverter } from '../../converters/firebase.converters';
import CategoryItem from '../category-item/category-item.component';
import { CategoriesContainer, CategoriesContent } from './categories.styles';

const Categories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
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
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <CategoriesContainer>
        <CategoriesContent>
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryItem category={category} />
            </div>
          ))}
        </CategoriesContent>
      </CategoriesContainer>
    </>
  );
};

export default Categories;
