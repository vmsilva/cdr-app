import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps, Text, Touchable, TouchableWithoutFeedback } from 'react-native';

import { useTheme } from 'react-native-paper';
import { useField } from '@unform/core';

import { Container, TextInput, Icon } from './styles';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme'

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  radius?: boolean;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const Input: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, icon, radius = true, multiline = false, ...rest},
  ref,
) => {
  const {colors} = useTheme();
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

  return (
    <>
      <TouchableWithoutFeedback
        onPress={handleInputFocus}
      >
      <Container
        isFocused={isFocused}
        isErrored={!!error}
        colors={CustomDefaultTheme.colors}
        radius={radius}
        multiline={multiline}>
        <Icon
          name={icon}
          size={20}
          color={isFocused || isFilled ? CustomDefaultTheme.colors.placeholderText : CustomDefaultTheme.colors.placeholderText}
        />
        <TextInput
          selectionColor="#999"
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={CustomDefaultTheme.colors.placeholderText}
          color={CustomDefaultTheme.colors.textInputClaro}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value:any) => {
            inputValueRef.current.value = value;
          }}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          numberOfLines={10}
          {...rest}
        />
      </Container>
      </TouchableWithoutFeedback>
    </>
  );
};

export default forwardRef(Input);
