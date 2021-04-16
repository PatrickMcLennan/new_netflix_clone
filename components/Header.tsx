import Link from 'next/link';
import { useUser } from '../stores/useUser';

export default function Header() {
  const { hasAuth } = useUser(({ hasAuth }) => ({ hasAuth }));
  return (
    <header className="global-header">
      <nav className="nav">
        {!hasAuth && (
          <>
            <Link href="/login">
              <a>Login</a>
            </Link>
            <Link href="/create-account">
              <a>Create Account</a>
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}
