import { renderWithRedux } from '../../helpers/test.helpers';
import Checkout from './checkout.component';

describe('Checkout', () => {
  it('Shold show correct products and total price', () => {
    const { getByText } = renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: {
          products: [
            {
              id: '1',
              imageUrl: 'image_url',
              name: 'Lorem',
              price: 100,
              quantity: 1,
            },
            {
              id: '2',
              imageUrl: 'image_url',
              name: 'Ipsum',
              price: 200,
              quantity: 4,
            },
            {
              id: '3',
              imageUrl: 'image_url',
              name: 'Dolor',
              price: 300,
              quantity: 5,
            },
          ],
        },
      } as any,
    });
    getByText('Total: R$2400.00');
    getByText('Finalizar compra');
    getByText(/Checkout/i);
  });

  it('Should show empty message if cart is empty and not show checkout button', () => {
    const { getByText, queryByText } = renderWithRedux(<Checkout />, {
      preloadedState: {
        cartReducer: {
          products: [],
        },
      } as any,
    });
    getByText(/Voltar as compras/i);

    expect(queryByText(/Finalizar compra/i)).toBeNull();
  });
});
