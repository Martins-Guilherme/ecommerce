import { useEffect, useState } from 'react';
import './categories.styles.css';

import { getDocs, collection } from 'firebase/firestore';

import { db } from '../../config/firebase.config';
import Category from '../../types/category-types';
import { categoryConverter } from '../../converters/firebase.converters';

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
          <h1>Categorias</h1>
        </div>
      </div>
    </>
  );
};

export default Categories;
