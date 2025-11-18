import { BsGoogle } from 'react-icons/bs';
import { FiLogIn } from 'react-icons/fi';

import { useForm } from 'react-hook-form';
import validator from 'validator';

import CustomButton from '../../components/custom-button/custom-button.components';
import Header from '../../components/header/header.component';

import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle,
} from './login.styles';
import CustomInput from '../../components/custom-input/custom-input.components';
import InputErrorMessage from '../../components/input-error-message/input-error-message.component';
import {
  AuthError,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../config/firebase.config';

interface LoginForm {
  email: string;
  password: string;
}

const LoginPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<LoginForm>();

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      const userCrendentials = await signInWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log({ userCrendentials });
    } catch (error) {
      console.log({ error });
      const _error = error as AuthError;
      // Se a senha estiver incorreta estou associando o type de erro para o valor "mismatch"
      if (
        _error.code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS ||
        AuthErrorCodes.INVALID_IDP_RESPONSE
      ) {
        setError('email', { type: 'mismatch' });
        setError('password', { type: 'mismatch' });
      }

      // Se o e-mail estiver incorreto sera associado o valor do tipo para
    }
  };
  console.log({ errors });
  return (
    <>
      <Header />

      <LoginContainer>
        <LoginContent>
          <LoginHeadline>Entre com a sua conta</LoginHeadline>
          <CustomButton startIcon={<BsGoogle size={18} />}>
            Entrar com o Google
          </CustomButton>
          <LoginSubtitle>ou entre com seu e-mail</LoginSubtitle>
          <LoginInputContainer>
            <p>E-mail</p>
            <CustomInput
              hasError={!!errors?.email}
              placeholder="Digite seu e-mail"
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value);
                },
              })}
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage message="O e-mail é obrigatório." />
            )}
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage message="Por favor, insira um e-mail válido." />
            )}
            {errors?.email?.type === 'mismatch' && (
              <InputErrorMessage message="Por favor, insira um e-mail correto." />
            )}
          </LoginInputContainer>
          <LoginInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors?.password}
              {...register('password', {
                required: true,
              })}
              placeholder="Digite sua senha"
              type="password"
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage message="A senha é obrigatória." />
            )}
            {errors?.password?.type === 'mismatch' && (
              <InputErrorMessage message="A senha está incorreta." />
            )}
          </LoginInputContainer>

          <CustomButton
            startIcon={<FiLogIn size={18} />}
            onClick={() => handleSubmit(handleSubmitPress)()}
          >
            Entrar
          </CustomButton>
        </LoginContent>
      </LoginContainer>
    </>
  );
};

export default LoginPage;
