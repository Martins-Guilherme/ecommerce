import { renderWithRedux } from '../../helpers/test.helpers';
import Product from '../../types/products-types';
import { ProductItem } from './product-item.components';

describe('Product item', () => {
  it('Should show correct product', () => {
    const product: Product = {
      id: '1',
      imageUrl: 'image_url',
      name: 'Boné',
      price: 100,
    };
    const { getByText } = renderWithRedux(<ProductItem product={product} />, {
      preloadedState: {} as any,
    });

    getByText(/boné/i);
    getByText('R$100.00');
    getByText('Adicionar ao carrinho')
  });
});
