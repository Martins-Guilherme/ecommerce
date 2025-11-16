import { FunctionComponent } from 'react';

import Category from '../../types/category-types';
import { CategoryItemContainer, CategoryName } from './category-item.styles';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  return (
    <>
      <CategoryItemContainer backgroundImage={category.imageUrl}>
        <CategoryName>
          <p>{category.displayName}</p>
          <p>Explorar</p>
        </CategoryName>
      </CategoryItemContainer>
    </>
  );
};

export default CategoryItem;
