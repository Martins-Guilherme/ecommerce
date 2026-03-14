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

  it('should show error when filling an invalid e-mail', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {} as any,
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, 'invalid_email');

    const submit = getByText('Criar Conta', { selector: 'button' });
    userEvent.click(submit);

    await findByText('Por favor, insira um e-mail valido.');
  });

  it('should show error when password and password confirmation are diferent', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {} as any,
    );

    const passwordInput = getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, '123456');

    const passwordConfirmation = getByPlaceholderText(
      /digite novamente sua senha/i,
    );
    userEvent.type(passwordConfirmation, '123456789');

    const submit = getByText('Criar Conta', { selector: 'button' });
    userEvent.click(submit);

    await findByText('As senhas não conferem.');
  });

  it('should show error when password has less than 6 characters', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <SignUpPage />,
      {} as any,
    );

    const passwordInput = getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, '12345');

    const submit = getByText('Criar Conta', { selector: 'button' });
    userEvent.click(submit);

    await findByText('O valor minimo da senha são 6 digitos.');
  });
});
