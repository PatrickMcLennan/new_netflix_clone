import { cleanup, render } from '@testing-library/react';
import LoginForm, { LOGIN_FORM_ID } from '../components/LoginForm';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/resets.styles';

afterEach(cleanup);

const onSubmit = jest.fn();

const validEmail = `testing@testing.com`;
const invalidEmail = `testing`;

const invalidPassword = ``;
const validPassword = `password`;

const { queryByTestId, debug } = render(
  <ThemeProvider theme={theme}>
    <LoginForm onSubmit={onSubmit} />
  </ThemeProvider>
);

test(`<LoginForm />`, async () => {
  const emailInput = queryByTestId(`${LOGIN_FORM_ID}-email-input`);
  const passwordInput = queryByTestId(`${LOGIN_FORM_ID}-password-input`);

  const submit = queryByTestId(`${LOGIN_FORM_ID}-submit`);

  userEvent.click(submit);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.input(emailInput, { target: { value: invalidEmail } });
  userEvent.click(submit);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.input(emailInput, { target: { value: validEmail } });
  userEvent.click(submit);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.input(passwordInput, { target: { value: invalidPassword } });
  userEvent.click(submit);
  expect(onSubmit).not.toHaveBeenCalled();

  fireEvent.input(passwordInput, { target: { value: validPassword } });
  userEvent.click(submit);

  debug();
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toBeCalledWith({ email: validEmail, password: validPassword });
});
