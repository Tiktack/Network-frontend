import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Outer = styled.div`
  background: #333336;
  height: 40px;
`;

export const Button = styled.button`
  background: #333336;
  height: 40px;
  color: #fff;
  border-style: none;
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  &&& {
    display: inline-block;
  }
`;
