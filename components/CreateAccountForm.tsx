import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { CreateUserInput } from '../types/generated.types';
import { useForm } from 'react-hook-form';

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
    setError,
    handleSubmit
  } = useForm({
    resolver: yupResolver(formSchema)
  });

  const submitValidation = values => {
    if (values?.password !== values?.passwordConfirm)
      return setError(`passwordConfirm`, { type: `manual`, shouldFocus: true });
    else return onSubmit(values);
  };

  return (
    <form
      className={CREATE_ACCOUNT_FORM_ID}
      data-testid={CREATE_ACCOUNT_FORM_ID}
      onSubmit={handleSubmit(values => submitValidation(values))}
    >
      <legend className="legend">Create an Account</legend>
      <label
        className={`label${errors.firstName ? ` error` : ``}`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-firstName-label`}
        htmlFor="firstName"
      >
        <span className="span">
          First Name <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          data-testid={`${CREATE_ACCOUNT_FORM_ID}-firstName-input`}
          name="firstName"
          id="firstName"
          type="text"
          {...register(`firstName`, { required: true })}
        />
      </label>
      <label
        className={`label${errors.lastName ? ` error` : ``}`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-lastName-label`}
        htmlFor="lastName"
      >
        <span className="span">
          Last Name <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          data-testid={`${CREATE_ACCOUNT_FORM_ID}-lastName-input`}
          name="lastName"
          id="lastName"
          type="text"
          {...register(`lastName`, { required: true })}
        />
      </label>
      <label
        className={`label${errors.email ? ` error` : ``}`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-email-label`}
        htmlFor="email"
      >
        <span className="span">
          Email <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          data-testid={`${CREATE_ACCOUNT_FORM_ID}-email-input`}
          name="email"
          id="email"
          type="email"
          {...register(`email`, { required: true })}
        />
      </label>
      <label
        className={`label${errors.password ? ` error` : ``}`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-password-label`}
        htmlFor="password"
      >
        <span className="span">
          Password <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          data-testid={`${CREATE_ACCOUNT_FORM_ID}-password-input`}
          name="password"
          id="password"
          type="password"
          {...register(`password`, { required: true })}
        />
      </label>
      <label
        className={`label${errors.passwordConfirm ? ` error` : ``}`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-passwordConfirm-label`}
        htmlFor="passwordConfirm"
      >
        <span className="span">
          Confirm Password <sup className="sup">*</sup>
        </span>
        <input
          className="input"
          data-testid={`${CREATE_ACCOUNT_FORM_ID}-passwordConfirm-input`}
          name="passwordConfirm"
          id="passwordConfirm"
          type="password"
          {...register(`passwordConfirm`, { required: true })}
        />
      </label>
      <input
        className={`input ${CREATE_ACCOUNT_FORM_ID}-submit-input`}
        data-testid={`${CREATE_ACCOUNT_FORM_ID}-submit-input`}
        type="submit"
        value="Let's go"
      />
    </form>
  );
}
