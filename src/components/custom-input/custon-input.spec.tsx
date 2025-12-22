import { render} from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import CustomInput from './custom-input.components';

describe('Custom Input', () => {
  it('should render with error if has error is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={true} />,
    );
    const input = getByPlaceholderText('lorem ipsum');

    // True: ecSgWf
    expect(input).toHaveClass('ecSgWf');
  });

  it('should render without error if "$hasError" is false', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={false} />,
    );
    const input = getByPlaceholderText('lorem ipsum');

    // False: lmDDhP
    expect(input).toHaveClass('lmDDhP');
  });

  it('should change value when user types', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={false} />,
    );
    const input = getByPlaceholderText('lorem ipsum');

    // fireEvent.change(input, { target: { value: 'Dolar Sit' } });
    userEvent.type(input, 'Dolar Sit')
    
    getByDisplayValue('Dolar Sit');
  });
});
