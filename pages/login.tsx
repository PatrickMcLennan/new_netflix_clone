import LoginForm from '../components/LoginForm';
import { LoginInput } from '../types/generated.types';

export default function Login() {
  const onSubmit = (values: LoginInput) => console.log(values);
  return (
    <main className="main">
      <h1 className="h1">Log In</h1>
      <LoginForm onSubmit={onSubmit} />
    </main>
  );
}
