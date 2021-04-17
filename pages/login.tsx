import Image from 'next/image';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import LoginForm from '../components/LoginForm';
import { imageLoader } from '../constants';
import { useUser } from '../stores/useUser';
import { activeStates, flexin, fontLine } from '../styles/helpers.styles';
import { LoginInput, useLoginMutation } from '../types/generated.types';

const StyledMain = styled.main`
  ${flexin({ fd: `column`, ai: `stretch` })}
  width: 60vw;
  margin: 0 auto;
  z-index: 2;

  .h1 {
    position: absolute;
    opacity: 0;
  }

  .login-form {
    ${flexin({ fd: `column` })};
    padding: ${rem(`30px`)} ${rem(`20px`)};
    width: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    border: ${rem(`1px`)} solid var(--gray);

    .legend {
      ${fontLine(rem(`35px`), rem(`40px`))};
      align-self: flex-start;
      margin-bottom: ${rem(`30px`)};
      letter-spacing: ${rem(`1px`)};
      text-align: left;
      text-transform: uppercase;
    }

    .label {
      ${flexin({ ai: `flex-start`, fd: `column` })};
      margin-bottom: ${rem(`10px`)};
      width: 100%;

      &.error {
        .sup {
          color: var(--red);
        }
      }

      &.login-form-submit-label {
        margin-top: ${rem(`10px`)};
      }
    }

    .input {
      ${fontLine(rem(`14px`), rem(`18px`))};
      width: 100%;
      padding: ${rem(`10px`)} ${rem(`20px`)};
      border-radius: var(--square);
    }

    .span {
      ${fontLine(rem(`14px`), rem(`20px`))};
      margin-bottom: ${rem(`10px`)};
    }

    .sup {
      transition: color var(--transition-fast);
    }

    .login-form-submit {
      background-color: var(--red);
      color: white;
      transition: background-color var(--transition-fast);

      ${activeStates(css`
        background-color: var(--red-hover);
      `)}
    }
  }
`;

const ImageWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  grid-area: main;

  &::after {
    display: block;
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-image: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0.5) 25%,
      rgba(0, 0, 0, 0.5) 75%,
      rgba(0, 0, 0, 1) 100%
    );
  }
`;

export default function Login() {
  const { setUser } = useUser(({ setUser }) => ({ setUser }));

  const [loginMutation] = useLoginMutation({
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
    <>
      <ImageWrapper aria-hidden="true">
        <Image
          alt="Various poster images"
          layout="fill"
          src="/login-hero.jpeg"
          loader={imageLoader}
          objectFit="cover"
          priority={true}
        />
      </ImageWrapper>
      <StyledMain className="global-main">
        <h1 aria-hidden="true" className="h1">
          All of your media in one place.
        </h1>
        <LoginForm onSubmit={onSubmit} />
      </StyledMain>
    </>
  );
}
