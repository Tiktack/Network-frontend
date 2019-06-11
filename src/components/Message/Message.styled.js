import styled, { css } from 'styled-components';

export const Bubble = styled.div`
  background: #333336;
  font-size: 13px;
  font-weight: 600;
  padding: 12px 13px;
  border-radius: 5px 5px 5px 0px;
  color: #fff;
  margin-bottom: 2px;
  ${props => props.right === 1
    && css`
      text-align: right;
    `}
`;
