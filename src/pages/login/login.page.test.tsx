import userEvent from '@testing-library/user-event';
import { renderWithRedux } from '../../helpers/test.helpers';
import LoginPage from './login.page';

describe('Login', () => {
  it('shold show erros when trying to submit filling all required filds', async () => {
    const { getByText, findByText } = renderWithRedux(<LoginPage />, {} as any);

    const submitButton = getByText('Entrar');

    userEvent.click(submitButton);
    await findByText('O e-mail é obrigatório.');
    getByText('A senha é obrigatória.');
  });
});
