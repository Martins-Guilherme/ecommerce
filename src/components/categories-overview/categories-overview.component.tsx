import { FunctionComponent, useContext, useEffect } from 'react';
import { Container } from './categories-overview.styles';

import { CategoryContext } from '../../contexts/category.context';

import CategoryOverview from '../category-overview/category-overview.component';
import Loading from '../loading/loading.component';

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading, fetchCategories } =
    useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  if (isLoading) return <Loading />;
  return (
    <Container>
      {categories.map((item) => (
        <CategoryOverview key={item.id} category={item}></CategoryOverview>
      ))}
    </Container>
  );
};

export default CategoriesOverview;
