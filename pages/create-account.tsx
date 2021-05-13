import Image from 'next/image';
import { rem } from 'polished';
import styled, { css } from 'styled-components';
import CreateUserForm from '../components/CreateAccountForm';
import { imageLoader } from '../constants';
import { activeStates, flexin, fontLine } from '../styles/helpers.styles';
import { CreateUserInput, useCreateUserMutation } from '../types/generated.types';

const StyledMain = styled.main`
  ${flexin({ fd: `column`, ai: `stretch` })}
  width: 60vw;
  margin: 0 auto;
  z-index: 2;

  .h1 {
    position: absolute;
    opacity: 0;
  }

  .create-account-form {
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
    }

    .create-account-form-submit-input {
      margin-top: ${rem(`10px`)};
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

    .create-account-form-submit-input {
      background-color: var(--red);
      color: white;
      letter-spacing: ${rem(`1px`)};
      text-transform: uppercase;
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

export default function CreateAccount() {
  const [createAccountMutation, { error }] = useCreateUserMutation({
    onCompleted: something => console.log(something),
    onError: err => console.error(err)
  });

  const onSubmit = ({ firstName, lastName, email, password }: CreateUserInput) =>
    createAccountMutation({
      variables: {
        newUser: {
          firstName,
          lastName,
          email,
          password
        }
      }
    });

  if (error) console.error(error?.message);

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
        <h1 className="h1">Create your account</h1>
        <CreateUserForm onSubmit={onSubmit} />
      </StyledMain>
    </>
  );
}
