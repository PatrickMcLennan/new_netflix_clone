import { rem } from 'polished';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  padding-top: ${rem(`20px`)};
  padding-bottom: ${rem(`20px`)};
  color: var(--gray);
`;

export default function Footer() {
  return (
    <StyledFooter className="global-footer">
      <p className="p">Netflix Canada</p>
    </StyledFooter>
  );
}
