import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps, TextStyle } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useField } from '@unform/core';

import CustomText from '../componentes/customText';
import { CustomDarkTheme } from '../../configuracoes/styles/Theme';

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  label: string;
  radius?: boolean;
  mode: string;
  multiline: boolean;
  style:  TextStyle | TextStyle[];
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputTextPaper: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, label, icon, radius = true, multiline = false,mode , style,...rest},
  ref,
) => {
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
    <>
      <TextInput
        ref={inputElementRef}
        style={[{...passedStyles}]}
        //keyboardType="numeric"
        mode="outlined"
        label={<CustomText textType="light">{label}</CustomText>}
        right={<CustomText textType="light">{label}</CustomText>}
        theme={CustomDarkTheme}
        name={name}

        keyboardAppearance="dark"
        color="#FFF"
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
    </>
  );
};

export default forwardRef(InputTextPaper);
