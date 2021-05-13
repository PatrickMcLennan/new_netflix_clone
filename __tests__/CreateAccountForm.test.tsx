import React from 'react';
import { cleanup, render, waitFor } from '@testing-library/react';
import CreateAccountForm, { CREATE_ACCOUNT_FORM_ID } from '../components/CreateAccountForm';
import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../styles/resets.styles';

afterEach(cleanup);

const onSubmit = jest.fn();

const validFirstName = `Testing`;
const invalidFirstName = ``;

const validLastName = `User`;
const invalidLastName = ``;

const validEmail = `testing@testing.com`;
const invalidEmail = `testing`;

const validPassword = `password`;
const invalidPassword = ``;

const invalidPasswordConfirm1 = ``;
const invalidPasswordConfirm2 = `not_the_same_password`;

const { queryByTestId } = render(
  <ThemeProvider theme={theme}>
    <CreateAccountForm onSubmit={onSubmit} />
  </ThemeProvider>
);

test(`<CreateAccountForm />`, async () => {
  const firstNameInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-firstName-input`);
  const lastNameInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-lastName-input`);
  const emailInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-email-input`);
  const passwordInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-password-input`);
  const confirmPasswordInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-passwordConfirm-input`);
  const submitInput = queryByTestId(`${CREATE_ACCOUNT_FORM_ID}-submit-input`);

  userEvent.click(submitInput);
  expect(onSubmit).not.toHaveBeenCalled();

  [invalidFirstName, validFirstName].forEach(value => {
    fireEvent.input(firstNameInput, { target: { value } });
    userEvent.click(submitInput);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  [invalidLastName, validLastName].forEach(value => {
    fireEvent.input(lastNameInput, { target: { value } });
    userEvent.click(submitInput);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  [invalidEmail, validEmail].forEach(value => {
    fireEvent.input(emailInput, { target: { value } });
    userEvent.click(submitInput);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  [invalidPassword, validPassword].forEach(value => {
    fireEvent.input(passwordInput, { target: { value } });
    userEvent.click(submitInput);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  [invalidPassword, invalidPasswordConfirm1, invalidPasswordConfirm2].forEach(value => {
    fireEvent.input(confirmPasswordInput, { target: { value } });
    userEvent.click(submitInput);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  fireEvent.input(confirmPasswordInput, { target: { value: validPassword } });
  userEvent.click(submitInput);

  await waitFor(() => {
    expect(onSubmit).toHaveBeenCalledTimes(1);
    expect(passwordInput.value).toBe(confirmPasswordInput.value);
    expect(onSubmit).toBeCalledWith({
      email: validEmail,
      password: validPassword,
      firstName: validFirstName,
      lastName: validLastName,
      passwordConfirm: validPassword
    });
  });
});
