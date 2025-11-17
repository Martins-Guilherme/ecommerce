import { InputErrorMessageContainer } from './input-error-message.styles';

import { FunctionComponent } from 'react';

interface InputErrorMesasgeProps {
  message: string;
}

const InputErrorMessage: FunctionComponent<InputErrorMesasgeProps> = ({
  message,
}) => {
  return <InputErrorMessageContainer>{message}</InputErrorMessageContainer>;
};

export default InputErrorMessage;
