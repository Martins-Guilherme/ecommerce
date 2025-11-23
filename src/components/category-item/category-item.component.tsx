import { FunctionComponent } from 'react';

import Category from '../../types/category-types';

import { CategoryItemContainer, CategoryName } from './category-item.styles';

import { useNavigate } from 'react-router-dom';

interface CategoryItemProps {
  category: Category;
}

const CategoryItem: FunctionComponent<CategoryItemProps> = ({ category }) => {
  const navigate = useNavigate();

  const handleExplorerClick = () => {
    navigate(`/category/${category.id}`);
  };

  return (
    <>
      <CategoryItemContainer $backgroundImage={category.imageUrl}>
        <CategoryName onClick={handleExplorerClick}>
          <p>{category.displayName}</p>
          <p>Explorar</p>
        </CategoryName>
      </CategoryItemContainer>
    </>
  );
};

export default CategoryItem;
