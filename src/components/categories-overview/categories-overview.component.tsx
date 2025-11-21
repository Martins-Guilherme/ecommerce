import { FunctionComponent, useContext, useEffect } from 'react';
import { Container } from './categories-overview.styles';
import { CategoryContext } from '../../contexts/category.context';

const CategoriesOverview: FunctionComponent = () => {
  const { categories, fetchCategories } = useContext(CategoryContext);

  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, []);
  return (
    <Container>
      {categories.map((item) => (
        <p key={item.id}>{item.displayName}</p>
      ))}
    </Container>
  );
};

export default CategoriesOverview;
