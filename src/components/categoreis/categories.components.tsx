import { useEffect, useState } from 'react';
import './categories.styles.css';

import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase.config';
import Category from '../../types/category-types';
import { categoryConverter } from '../../converters/firebase.converters';
import CategoryItem from '../category-item/category-item.component';

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
      <div className="categories-container">
        <div className="categories-content">
          {categories.map((category) => (
            <div key={category.id}>
              <CategoryItem category={category} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Categories;
