import userEvent from '@testing-library/user-event';
import * as firebaseAuth from 'firebase/auth';

import { renderWithRedux } from '../../helpers/test.helpers';
import LoginPage from './login.page';
import { findAllByText } from '@testing-library/dom';

jest.mock('firebase/auth');

describe('Login', () => {
  it('shold show erros when trying to submit filling all required filds', async () => {
    const { getByText, findByText } = renderWithRedux(<LoginPage />, {} as any);

    const submitButton = getByText('Entrar');

    userEvent.click(submitButton);
    await findByText('O e-mail é obrigatório.');
    getByText('A senha é obrigatória.');
  });

  it('should show error if email is invalid', async () => {
    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <LoginPage />,
      {} as any,
    );

    const emailInput = getByPlaceholderText(/Digite seu e-mail/i);

    userEvent.type(emailInput, 'invalid_email');

    const submitButton = getByText('Entrar');

    userEvent.click(submitButton);
    await findByText(/por favor, insira um e-mail válido./i);
  });

  it('should show an error if email is not found', async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: firebaseAuth.AuthErrorCodes.USER_DELETED,
      }),
    );

    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <LoginPage />,
      {} as any,
    );

    const emailInput = getByPlaceholderText(/digite seu e-mail/i);

    userEvent.type(emailInput, 'lorem@ipsum.com');

    const passwordInput = getByPlaceholderText(/digite sua senha/i);

    userEvent.type(passwordInput, '12345678');

    const submitButton = getByText('Entrar');

    userEvent.click(submitButton);

    await findByText(/O e-mail não foi encontrado./i);
  });

  it('should show an error if password is not validate', async () => {
    const mockFirebaseAuth = firebaseAuth as any;

    mockFirebaseAuth.signInWithEmailAndPassword.mockImplementation(() =>
      Promise.reject({
        code: firebaseAuth.AuthErrorCodes.INVALID_PASSWORD,
      }),
    );

    const { getByText, findByText, getByPlaceholderText } = renderWithRedux(
      <LoginPage />,
      {} as any,
    );

    const emailInput = getByPlaceholderText('Digite seu e-mail');

    userEvent.type(emailInput, 'lorem@ipsum.com');

    const passwordIput = getByPlaceholderText('Digite sua senha');

    userEvent.type(passwordIput, '123456');

    const submitButon = getByText('Entrar');

    userEvent.click(submitButon);

    await findByText(/a senha está incorreta./i);
  });
});
