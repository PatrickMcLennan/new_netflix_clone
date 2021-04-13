import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserInput } from '../types/generated.types';
import { useForm } from 'react-hook-form';
import { LOGIN_FORM_ID } from './LoginForm';

type Props = {
  onSubmit: (formValues: CreateUserInput) => any;
};
export const CREATE_ACCOUNT_FORM_ID = `create-account-form`;

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
  passwordConfirm: yup.string().required(),
  firstName: yup.string().required(),
  lastName: yup.string().required()
});

export default function CreateUserForm({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  return (
    <form
      className={LOGIN_FORM_ID}
      data-testid={LOGIN_FORM_ID}
      onSubmit={handleSubmit((values: CreateUserInput) => onSubmit(values))}
    >
      <label data-testid={`${LOGIN_FORM_ID}-firstName-label`} htmlFor="firstName">
        <span className="span">
          First Name <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          name="firstName"
          id="firstName"
          type="text"
          {...register(`firstName`, { required: true })}
        />
      </label>
      <label data-testid={`${LOGIN_FORM_ID}-lastName-label`} htmlFor="lastName">
        <span className="span">
          Last Name <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          name="lastName"
          id="lastName"
          type="text"
          {...register(`lastName`, { required: true })}
        />
      </label>
      <label data-testid={`${LOGIN_FORM_ID}-email-label`} htmlFor="email">
        <span className="span">
          Email <sup className="sup">*</sup>
        </span>
        <input className="input" name="email" id="email" type="email" {...register(`email`, { required: true })} />
      </label>
      <label data-testid={`${LOGIN_FORM_ID}-password-label`} htmlFor="password">
        <span className="span">
          Password <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          name="password"
          id="password"
          type="password"
          {...register(`password`, { required: true })}
        />
      </label>
      <label data-testid={`${LOGIN_FORM_ID}-password-confirm-label`} htmlFor="password-confirm">
        <span className="span">
          Confirm Password <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          name="password-confirm"
          id="password-confirm"
          type="password"
          {...register(`password-confirm`, { required: true })}
        />
      </label>
    </form>
  );
}
