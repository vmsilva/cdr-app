import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  colors: any;
  radius: boolean;
  multiline: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 45px; 
  padding: 0 16px;
  background: ${CustomDefaultTheme.colors.preto};

  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${CustomDefaultTheme.colors.fontPrimaria};

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.multiline &&
    css`
      height: 200px;
      align-items: flex-start;
      padding-top: 10px;
    `}

  ${(props) =>
    props.radius &&
    css`
      border-radius: 99px;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.colors.fontPrimaria};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  justify-content: flex-start;
  color: #FFFF;
  text-align: left;
`; // right

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
