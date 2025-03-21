import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
  colors: any;
  radius: boolean;
  multiline: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 50px;
  padding: 0 16px;
  background: ${CustomDefaultTheme.colors.backgroundInput};

  margin-bottom: 8px;
  border-width: 1px;
  border-color: ${CustomDefaultTheme.colors.backgroundInputBorder};

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
      border-radius: 10px;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.colors.text};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
