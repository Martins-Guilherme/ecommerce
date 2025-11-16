import { FunctionComponent, InputHTMLAttributes } from 'react';
import { CustonInputContainer } from './custon-input.styles';

interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput: FunctionComponent<CustomInput> = ({ hasError, ...rest }) => {
  return (
    <>
      <CustonInputContainer hasError={hasError} {...rest} />
    </>
  );
};

export default CustomInput;
