import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { TextInputProps } from "react-native";

import { useTheme, Text } from "react-native-paper";
import { useField } from "@unform/core";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Container, TextInput, Icon, Container2 } from "./styles";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  label: string;
  radius?: boolean;
  container2: any;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputSecundarioMensagem: React.RefForwardingComponent<
  InputRef,
  InputProps
> = (
  { name, label, icon, container2, radius = true, multiline = false, ...rest },
  ref
) => {
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

  const COMPONENTECONTEUDO = () => {
    return (
      <>
        <Icon
          name={icon}
          size={20}
          color={
            isFocused || isFilled
              ? CustomDefaultTheme.colors.placeholderText
              : CustomDefaultTheme.colors.placeholderText
          }
        />
        <TextInput
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={CustomDefaultTheme.colors.placeholderText}
          color={container2 != undefined && "#FFF"}
          defaultValue={defaultValue}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={(value: any) => {
            inputValueRef.current.value = value;
          }}
          multiline={multiline}
          textAlignVertical={multiline ? "top" : "center"}
          numberOfLines={10}
          {...rest}
        />
      </>
    );
  };

  return (
    <>
      <Text style={{ display: "none", color: "#FFF", height: hp("3%") }}>
        {label}
      </Text>
      {container2 == undefined ? (
        <TouchableWithoutFeedback
          onPress={() => inputElementRef.current.focus()}
        >
          <Container
            isFocused={isFocused}
            isErrored={!!error}
            colors={CustomDefaultTheme.colors}
            radius={radius}
            multiline={multiline}
          >
            <Icon
              name={icon}
              size={20}
              color={
                isFocused || isFilled
                  ? CustomDefaultTheme.colors.colorTextInputMensagem
                  : CustomDefaultTheme.colors.colorTextInputMensagem
              }
            />
            <TextInput
              ref={inputElementRef}
              keyboardAppearance="dark"
              placeholderTextColor={CustomDefaultTheme.colors.colorTextInputMensagem}
              color={container2 != undefined && "#FFF"}
              defaultValue={defaultValue}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              onChangeText={(value: any) => {
                inputValueRef.current.value = value;
              }}
              multiline={multiline}
              textAlignVertical={multiline ? "top" : "center"}
              numberOfLines={10}
              {...rest}
            />
          </Container>
        </TouchableWithoutFeedback>
      ) : (
        <Container2
          isFocused={isFocused}
          isErrored={!!error}
          colors={CustomDefaultTheme.colors}
          radius={radius}
          multiline={multiline}
        >
          <COMPONENTECONTEUDO />
        </Container2>
      )}
    </>
  );
};

export default forwardRef(InputSecundarioMensagem);
