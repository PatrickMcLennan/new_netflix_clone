import LoginForm from '../components/LoginForm';
import { LoginInput, useLoginMutation } from '../types/generated.types';

export default function Login() {
  const [loginMutation, { loading, data, error }] = useLoginMutation({
    onCompleted: something => console.log(something)
  });

  const onSubmit = ({ email, password }: LoginInput) =>
    loginMutation({
      variables: {
        userCreds: {
          email,
          password
        }
      }
    });

  return (
    <main className="global-main">
      <h1 className="h1">Log In</h1>
      <LoginForm onSubmit={onSubmit} />
    </main>
  );
}
