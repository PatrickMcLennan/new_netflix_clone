import CreateUserForm from '../components/CreateAccountForm';
import { CreateUserInput, useCreateUserMutation } from '../types/generated.types';

export default function CreateAccount() {
  const [createAccountMutation, { loading, data, error }] = useCreateUserMutation({
    onCompleted: something => console.log(something)
  });

  const onSubmit = ({ firstName, lastName, email, password }: CreateUserInput) =>
    useCreateUserMutation({
      variables: {
        newUser: {
          firstName,
          lastName,
          email,
          password
        }
      }
    });

  return (
    <main className="global-main">
      <h1 className="h1">Create Account</h1>
      <CreateUserForm onSubmit={onSubmit} />
    </main>
  );
}
