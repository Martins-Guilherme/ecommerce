import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../../helpers/test.helpers';
import SignUpPage from './sign-up.page';

describe('Sign Up', () => {
  it('should show error when trying to submit without filling all ', async () => {
    const { getByText, findByText } = renderWithRedux(
      <SignUpPage />,
      {} as any,
    );

    const submitButon = getByText('Criar Conta', { selector: 'button' });

    userEvent.click(submitButon);

    await findByText(/o nome é obrigatório./i);
    getByText(/o sobrenome é obrigatório./i);
    getByText(/o e-mail é obrigatório./i);
    getByText(/a senha é obrigatória./i);
  });
});
