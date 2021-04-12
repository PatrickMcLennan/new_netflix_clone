import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { LoginInput } from '../generated/generated';

type Props = {
  onSubmit: (formValues: LoginInput) => any;
};

export const LOGIN_FORM_ID = `login-form`;

const formSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required()
});

export default function LoginForm({ onSubmit }: Props) {
  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({ resolver: yupResolver(formSchema) });

  return (
    <form
      data-testid={`${LOGIN_FORM_ID}`}
      onSubmit={handleSubmit((values: LoginInput) => onSubmit(values))}
      className={`${LOGIN_FORM_ID}`}
    >
      <label data-testid={`${LOGIN_FORM_ID}-email-label`} htmlFor={`email${errors.email ? ` error` : ``}`}>
        <span className="span" data-testid={`${LOGIN_FORM_ID}-label-span`}>
          Email <sup className="sup">*</sup>
        </span>
        <input
          aria-required="true"
          data-testid={`${LOGIN_FORM_ID}-email-input`}
          type="email"
          className="email-input"
          name="email"
          {...register(`email`, { required: true })}
        />
      </label>
      <label htmlFor={`password${errors.password ? ` error` : ``}`}>
        <span className="span">
          Email <sup className="sup">*</sup>
        </span>
        <input
          aria-required="true"
          data-testid={`${LOGIN_FORM_ID}-password-input`}
          type="password"
          className="password-input"
          name="password"
          {...register(`password`, { required: true })}
        />
      </label>
      <label className={`${LOGIN_FORM_ID}-submit-label`} htmlFor={`${LOGIN_FORM_ID}-submit`}>
        <input
          className={`${LOGIN_FORM_ID}-submit`}
          data-testid={`${LOGIN_FORM_ID}-submit`}
          type="submit"
          value="Log In"
        />
      </label>
    </form>
  );
}
