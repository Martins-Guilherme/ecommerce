import { FunctionComponent, useContext, useEffect } from 'react';
import { Container } from './categories-overview.styles';
import { useDispatch } from 'react-redux';

import { fetchCategories } from '../../store/reducers/category/category.actions';
import { useAppSelector } from '../../hooks/redux.hooks';

import CategoryOverview from '../category-overview/category-overview.component';
import Loading from '../loading/loading.component';

const CategoriesOverview: FunctionComponent = () => {
  const dispatch = useDispatch();

  const { categories, isLoading } = useAppSelector(
    (state) => state.categoryReducer,
  );

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(fetchCategories() as any);
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
