import { FiLogIn } from 'react-icons/fi';

import CustomButton from '../../components/custom-button/custom-button.components';
import CustomInput from '../../components/custom-input/custom-input.components';
import InputErrorMessage from '../../components/input-error-message/input-error-message.component';
import Header from '../../components/header/header.component';

import { useForm } from 'react-hook-form';
import validator from 'validator';

import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer,
} from './sign-up.styles';

interface SignUpForm {
  name: string;
  lastName: string;
  email: string;
  password: string;
  passwordConfirmation: string;
}

const SignUpPage = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm<SignUpForm>();

  const watchPassword = watch('password');

  const handleSubmmitPress = (data: SignUpForm) => {
    console.log({ data });
  };

  return (
    <>
      <Header />
      <SignUpContainer>
        <SignUpContent>
          <SignUpHeadline>Crie sua conta</SignUpHeadline>

          <SignUpInputContainer>
            <p>Nome</p>
            <CustomInput
              hasError={!!errors?.name}
              {...register('name', {
                required: true,
              })}
              placeholder="Digite seu nome"
            />
            {errors?.name?.type === 'required' && (
              <InputErrorMessage message="O nome é obrigatório." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Sobrenome</p>
            <CustomInput
              hasError={!!errors?.lastName}
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
              hasError={!!errors?.email}
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
            {errors?.email?.type === 'validate' && (
              <InputErrorMessage message="Por favor, insira um e-mail valido." />
            )}
          </SignUpInputContainer>

          <SignUpInputContainer>
            <p>Senha</p>
            <CustomInput
              hasError={!!errors.password}
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
              hasError={!!errors.passwordConfirmation}
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
