import LoginForm from '../components/LoginForm';
import { useUser } from '../stores/useUser';
import { LoginInput, useLoginMutation } from '../types/generated.types';

export default function Login() {
  const { setUser } = useUser(({ setUser }) => ({ setUser }));

  const [loginMutation, { loading, data, error }] = useLoginMutation({
    onCompleted: something => {
      console.log(something);
      setUser(`hasAuth`, true);
    }
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
