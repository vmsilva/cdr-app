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
  height: 45px;
  padding: 0 10px;
  background: ${CustomDefaultTheme.colors.textMensagemBackground};

  margin-bottom: 8px;
  border-width: 0px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.multiline &&
    css`
      height: 120px;
      align-items: flex-start;
      padding-top: 10px;
    `}

  ${(props) =>
    props.radius &&
    css`
      border-radius: 9px;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: ${props.colors.primary};
    `}
`;

export const Container2 = styled.View<ContainerProps>`
  width: 100%;
  height: 45px;
  padding: 0 16px;
  //background: ${CustomDefaultTheme.colors.backgroundInputMSG};

  margin-bottom: 8px;
  border-width: 1px;
  border-color: #fff;

  flex-direction: row;
  align-items: center;

  ${(props) =>
    props.multiline &&
    css`
      height: 120px;
      align-items: flex-start;
      padding-top: 10px;
    `}

  ${(props) =>
    props.radius &&
    css`
      border-radius: 9px;
    `}

  ${(props) =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${(props) =>
    props.isFocused &&
    css`
      border-color: #FFF;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;

export const Icon = styled(Feather)`
  margin-right: 16px;
`;
