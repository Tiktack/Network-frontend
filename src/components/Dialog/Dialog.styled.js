import styled from 'styled-components';
import { List as ListAntd } from 'antd';

export const Container = styled.div`
  overflow: auto;
  height: 100%;
  margin-bottom: 10px;
`;

export const InputContainer = styled.div`
  background-color: #444446;
  display: flex;
  flex-direction: row;
`;

export const StyledList = styled(ListAntd)`
  overflow: auto;
  height: 100%;
  margin-bottom: 10px;
`;
