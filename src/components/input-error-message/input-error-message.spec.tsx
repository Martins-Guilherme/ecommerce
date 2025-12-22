import { render } from '@testing-library/react';
import InputErrorMessage from './input-error-message.component';

describe('Input Error Message', () => {
  it('should show message with error color', () => {
    const { getByText } = render(<InputErrorMessage message={'lorem ipsum'} />);

    const input = getByText('lorem ipsum');

    // Vermelha: byIMFL
    expect(input).toHaveClass('byIMFL');
  });
});
