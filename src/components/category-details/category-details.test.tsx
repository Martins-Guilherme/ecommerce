import * as firebase from 'firebase/firestore';
import { renderWithRedux } from '../../helpers/test.helpers';
import Category from '../../types/category-types';
import CategoryDetails from './category-details.components';

jest.mock('firebase/firestore');

describe('Category details', () => {
  it('should and show fetch categories and its products', async () => {
    const mockedFirestore = firebase as any;

    mockedFirestore.getDocs.mockImplementation(async () => ({
      docs: [
        {
          data(): Category {
            return {
              id: '1',
              displayName: 'Lorem Ipsum',
              imageUrl: 'Image-url',
              name: 'lorem-ipsum',
              products: [
                { id: '1', name: 'Boné', price: 100, imageUrl: 'image_url' },
              ],
            };
          },
        },
      ],
    }));

    mockedFirestore.query.mockImplementation(() => {});

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    mockedFirestore.where.mockImplementation(() => {});

    const { findByText, getByText } = renderWithRedux(
      <CategoryDetails categoryId="any_id" />,
      { preloadedState: {} as any },
    );

    await findByText('Adicionar ao carrinho');
    getByText('Boné');
    findByText('Explorar Lorem Ipsum');
    findByText('R$100');
  });
});
