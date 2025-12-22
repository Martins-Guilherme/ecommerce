import { render, screen } from '@testing-library/react';
import CustomInput from './custom-input.components';
import Colors from '../../theme/theme.colors';

describe('Custom Input', () => {
  it('should render error if has error is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="lorem ipsum" $hasError={true} />,
    );
    const input = getByPlaceholderText('lorem ipsum');

    // True: ecSgWf
    // False: lmDDhP
    expect(input).toHaveClass('ecSgWf');
  });
});
