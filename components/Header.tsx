import Link from 'next/link';
import Image from 'next/image';
import styled, { css } from 'styled-components';
import { useUser } from '../stores/useUser';
import { flexin, tablet } from '../styles/helpers.styles';
import { rem } from 'polished';
import { imageLoader } from '../constants';

const StyledHeader = styled.header`
  ${flexin({ jc: `space-between` })}

  .logo {
    display: block;
    max-height: ${rem(`100px`)};
    max-width: ${rem(`250px`)};

    img {
      display: block;
      max-width: 100%;
    }
  }

  .nav {
    position: relative;
  }

  .hamburger {
    display: none;

    ${tablet(css`
      ${flexin({ jc: `flex-start`, ai: `stretch`, fd: `column` })}
    `)}
  }

  .ul {
    ${flexin({ jc: `flex-start` })};
  }

  .li {
    &:not(:last-of-type) {
      margin-right: ${rem(`10px`)};
    }
  }
`;

export default function Header() {
  const { hasAuth } = useUser(({ hasAuth }) => ({ hasAuth }));
  return (
    <StyledHeader className="global-header">
      <Link href="/">
        <a className="logo">
          <Image src="/logo.png" alt="Netflix Logo" width={250} height={100} priority={true} loader={imageLoader} />
        </a>
      </Link>
      <nav className="nav">
        <button className="hamburger">
          <span className="top"></span>
          <span className="middle"></span>
          <span className="bottom"></span>
        </button>
        <ul className="ul">
          {!hasAuth ? (
            <>
              <li className="li">
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/create-account">
                  <a>Create Account</a>
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="li">
                <Link href="/movies">
                  <a>Movies</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/tv">
                  <a>TV</a>
                </Link>
              </li>
              <li className="li">
                <Link href="/me">
                  <a>Me</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </nav>
    </StyledHeader>
  );
}
