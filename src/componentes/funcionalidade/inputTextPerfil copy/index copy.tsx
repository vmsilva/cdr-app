import React, { useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import {
  View,
  ViewStyle,
  //TextInput,
} from "react-native";
import { TextInputProps } from 'react-native';
import { useField } from '@unform/core';

import Styles from './styles';
import { TextInput } from './styles';
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";

type InputTextPerfilProps = {
  style?: ViewStyle | ViewStyle[];
  label: any;
  placeholder: any;
  returnKeyType: any;
  placeholderTextColor: any;
  color: any;
  name: any;
};

interface InputProps extends TextInputProps {
  style?: ViewStyle | ViewStyle[];
  label: any;
  placeholder: any;
  returnKeyType: any;
  placeholderTextColor: any;
  color: any;
  name: any;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputTextPerfil: React.RefForwardingComponent<InputRef, InputProps|any> = ({
  name,
  style,
  label,
  placeholder,
  returnKeyType,
  placeholderTextColor,
  color, ...rest
},
ref) => {
  const [keyBoardIsOpen, setKeyBoardIsOpen] = useState<boolean>(false);
  const inputElementRef = useRef<any>(null);
  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);

  const handleInputFocus = useCallback(() => {
    setIsFocused(true);
  }, []);

  const handleInputBlur = useCallback(() => {
    setIsFocused(false);
    setIsFilled(!!inputValueRef.current.value);
  }, []);

  useImperativeHandle(ref, () => ({
    focus() {
      inputElementRef.current.focus();
    },
  }));

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(refe: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({text: value});
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);


  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomWidth: 0.5,
        borderBottomColor: CustomDefaultTheme.colors.cinzaEscuro,
        padding: 10,
      }}
    >
      <CustomText style={{
        color: color != undefined ? color : '#FFF',
        fontSize: 15
      }}>{label}</CustomText>
      <TextInput
        blurOnSubmit
        ref={inputElementRef}
        onChangeText={(value:any) => {
          inputValueRef.current.value = value;
        }}
        placeholder={placeholder != undefined ? placeholder : "Escreva mensagem...."}
        placeholderTextColor={placeholderTextColor != undefined ? placeholderTextColor : "#FFF"}
        returnKeyType={returnKeyType != undefined ? returnKeyType : "send"}
        style={[Styles.textInput]}
        defaultValue={defaultValue}
        {...rest}
      />
    </View>
  );
};

export default InputTextPerfil;
