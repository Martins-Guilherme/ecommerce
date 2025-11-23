import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firebase.config';

import { categoryConverter } from '../../converters/firebase.converters';

import { FunctionComponent, useEffect, useState } from 'react';

import Category from '../../types/category-types';

import Loading from '../loading/loading.component';

import { BiChevronLeft } from 'react-icons/bi';

import {
  Container,
  CategoryTitle,
  IconContainer,
  ProductsContainer,
} from './category-details.styles';
import { useNavigate } from 'react-router-dom';

import { ProductItem } from '../product-item/product-item.components';

interface CategoryDetailsProps {
  categoryId: string;
}
const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId,
}) => {
  const [category, setCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        setIsLoading(true);
        const querySnapshot = await getDocs(
          query(
            collection(db, 'categories').withConverter(categoryConverter),
            where('id', '==', categoryId),
          ),
        );
        const category = querySnapshot.docs[0]?.data();
        setCategory(category);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  console.log(category);
  if (isLoading) return <Loading />;
  return (
    <Container>
      <CategoryTitle>
        <IconContainer>
          <BiChevronLeft onClick={handleBackClick} size={36} />
        </IconContainer>
        <p>Exporar {category?.displayName}</p>
      </CategoryTitle>

      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </ProductsContainer>
    </Container>
  );
};

export default CategoryDetails;
