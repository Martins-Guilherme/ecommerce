import React, { FunctionComponent, InputHTMLAttributes } from 'react';
import { CustonInputContainer } from './custon-input.styles';

interface CustomInput extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

const CustomInput: FunctionComponent<CustomInput> = React.forwardRef(
  (props, ref) => {
    return <CustonInputContainer {...props} ref={ref as any} />;
  },
);
CustomInput.displayName = 'CustomInput';

export default CustomInput;
