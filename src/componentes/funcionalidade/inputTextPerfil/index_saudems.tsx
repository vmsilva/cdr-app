import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { TextInputProps, View } from "react-native";

import { useTheme } from "react-native-paper";
import { useField } from "@unform/core";

import { Container, TextInput, Icon } from "./styles";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  radius?: boolean;
  label: any;
  background: any;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputTextPerfil: React.RefForwardingComponent<
  InputRef,
  InputProps | any
> = ({ altura, background, name, icon, radius = true, label, multiline = false, ...rest }, ref) => {
  const { colors } = useTheme();
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

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
      path: "value",
      setValue(refe: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = "";
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <View
        style={{
          borderBottomColor: CustomDefaultTheme.colors.cinzaEscuro,
        }}
      >
        <View
          
        >
          <CustomText
            style={{
              fontSize: 15,
              color: '#434343'
            }}
          >
            {label}
          </CustomText>
        </View>
        <TextInput
          selectionColor={CustomDefaultTheme.colors.text}
          //selection={{ start: 10, end: 10 }}
          style={{
            minHeight: altura != undefined ?  altura : 25,
            paddingHorizontal: 1,
            paddingVertical: 5,
            borderRadius:99,
            backgroundColor: background != undefined ? background : 'transparent'
          }}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={CustomDefaultTheme.colors.TextInput}
          color={CustomDefaultTheme.colors.fontPrimaria}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: any) => {console.log(value)
            inputValueRef.current.value = value;
          }}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          numberOfLines={10}
          {...rest}
        />
      </View>
    </>
  );
};

export default forwardRef(InputTextPerfil);
