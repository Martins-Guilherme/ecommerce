import * as firestore from 'firebase/firestore';

import Category from '../../types/category-types';
import Categories from '../categories/categories.components';

import { renderWithRedux } from '../../helpers/test.helpers';
import CategoriesOverview from './categories-overview.component';

jest.mock('firebase/firestore');

describe('Categories Overview', () => {
  it('should fetch and show categories', async () => {
    const mockedFirestore = firestore as any;

    mockedFirestore.getDocs.mockImplementation(async () => [
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
    ]);

    mockedFirestore.collection.mockImplementation(() => ({
      withConverter: () => {},
    }));

    const { findByText, getByText } = renderWithRedux(<CategoriesOverview />, {
      preloadedState: {} as any,
    });

    await findByText(/boné/i);
    getByText(/lorem ipsum/i)
    getByText('R$100.00')
  });
});
