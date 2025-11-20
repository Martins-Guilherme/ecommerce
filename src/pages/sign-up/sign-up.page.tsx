import { FiLogIn } from 'react-icons/fi';
import {
  AuthError,
  createUserWithEmailAndPassword,
  AuthErrorCodes,
} from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { useForm } from 'react-hook-form';
import validator from 'validator';

import CustomButton from '../../components/custom-button/custom-button.components';
import CustomInput from '../../components/custom-input/custom-input.components';
import InputErrorMessage from '../../components/input-error-message/input-error-message.component';
import Header from '../../components/header/header.component';

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from './sign-up.styles';

import { auth, db } from '../../config/firebase.config';
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../contexts/user.context';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/loading.component';

interface SignUpForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    watch,
  } = useForm<SignUpForm>();

  const watchPassword = watch('password');

  const handleSubmmitPress = async (data: SignUpForm) => {
    setIsLoading(true);
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password,
      );
      console.log({ userCredentials });

      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        email: userCredentials.user.email,
        firstName: data.firstName,
        lastName: data.lastName,
        provider: 'firebase',
      });
    } catch (error) {
      const _error = error as AuthError;

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        setError('email', { type: 'alreadyInUse' });
        return;
      }
    } finally {
      setIsLoading(false);
    }
  };

  const { isAuthenticated } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated]);

  return (
    <>
      <Header />
      {isLoading && <Loading />}
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              $hasError={!!errors?.firstName}
              {...register('firstName', {
                required: true,
              })}
              placeholder="Digite seu nome"
            />
            {errors?.firstName?.type === 'required' && (
              <InputErrorMessage message="O nome é obrigatório." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              $hasError={!!errors?.lastName}
              {...register('lastName', {
                required: true,
              })}
              placeholder="Digite seu sobrenome"
            />
            {errors?.lastName?.type === 'required' && (
              <InputErrorMessage message="O sobrenome é obrigatório." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>E-mail</p>
            <CustomInput
              $hasError={!!errors?.email}
              {...register('email', {
                required: true,
                validate: (value) => {
                  return validator.isEmail(value);
                },
              })}
              placeholder="Digite seu e-mail"
            />
            {errors?.email?.type === 'required' && (
              <InputErrorMessage message="O e-mail é obrigatório." />
            )}
            {errors?.email?.type === 'alreadyInUse' && (
              <InputErrorMessage message="O e-mail já foi utilizado." />
            )}
            {errors?.email?.type === 'alreadyInUse'}
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage message="Por favor, insira um e-mail valido." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              $hasError={!!errors.password}
              {...register('password', {
                required: true,
                minLength: 6,
              })}
              placeholder="Digite sua senha"
              type="password"
            />
            {errors?.password?.type === 'required' && (
              <InputErrorMessage message="A senha é obrigatória." />
            )}
            {errors?.password?.type === 'minLength' && (
              <InputErrorMessage message="O valor minimo da senha são 6 digitos." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Confirme sua senha</p>
            <CustomInput
              $hasError={!!errors.passwordConfirmation}
              {...register('passwordConfirmation', {
                required: true,
                validate: (value) => {
                  return value === watchPassword;
                },
              })}
              placeholder="Digite novamente sua senha"
              type="password"
            />
            {errors?.passwordConfirmation?.type === 'required' && (
              <InputErrorMessage message="A confirmação de senha é obrigatória." />
            )}
            {errors?.passwordConfirmation?.type === 'validate' && (
              <InputErrorMessage message="As senhas não conferem." />
            )}
          </SignUpInputContainer>
          <CustomButton
            onClick={() => handleSubmit(handleSubmmitPress)()}
            startIcon={<FiLogIn size={18} />}
          >
            Criar Conta
          </CustomButton>
        </SignUpContent>
      </SignUpContainer>
    </>
  );
};

export default SignUpPage;
