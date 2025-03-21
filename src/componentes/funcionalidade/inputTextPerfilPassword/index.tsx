import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from "react";
import { TextInputProps, TouchableWithoutFeedback, View } from "react-native";
import { FontAwesome5,Ionicons } from "@expo/vector-icons";
import { TextInput } from "react-native-paper";
import { useTheme } from "react-native-paper";
import { useField } from "@unform/core";

import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

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

const inputTextPerfilPassword: React.RefForwardingComponent<
  InputRef,
  InputProps | any
> = (
  {
    altura,
    background,
    name,
    icon,
    radius = true,
    label,
    multiline = false,
    ...rest
  },
  ref
) => {
  const { colors } = useTheme();
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [hide, setHide] = useState<boolean>(true);

  const show = () => setHide(!hide);

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
          flexDirection: "row",
          justifyContent: 'space-between',
          width: "100%",
        }}
      >
        <View
          style={{
            width: "78%",
            height: 40,
            borderRadius: 50,
          }}
        >
          <TextInput
            theme={{colors: {text: '#FFF'}}}
            secureTextEntry={hide}
            selectionColor={CustomDefaultTheme.colors.textInputEscuro}
            activeUnderlineColor="transparent"
            underlineColor="transparent"
            style={{
              height: 40,
              backgroundColor: "transparent",
              borderColor: 'transparent',
              //color: CustomDefaultTheme.colors.textInputEscuro
            }}
            color={CustomDefaultTheme.colors.textInputEscuro}
            ref={inputElementRef}
            textContentType="password"
            keyboardAppearance="dark"
            placeholderTextColor={CustomDefaultTheme.colors.branco}
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
        </View>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            width: "20%",
          }}
        >
          <TouchableWithoutFeedback
            onPress={show}
          >
            <View
              style={[
                {
                  width: 35,
                  height: 35,
                  padding: 5,
                  borderRadius: 99,
                  backgroundColor: CustomDefaultTheme.colors.backgroundIndiceCardVideo,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <Ionicons
                name={hide ? "eye" : "eye-off"}
                size={15}
                color={CustomDefaultTheme.colors.fontIndiceCardVideo}
              />
            </View>
          </TouchableWithoutFeedback>
          <View style={{width:5}} />
          <TouchableWithoutFeedback
            style={{
            }}
          >
            <View
              style={[
                {
                  width: 35,
                  height: 35,
                  padding: 5,
                  borderRadius: 99,
                  backgroundColor: CustomDefaultTheme.colors.backgroundIndiceCardVideo,
                  justifyContent: "center",
                  alignItems: "center",
                },
              ]}
            >
              <FontAwesome5
                name="pen"
                size={15}
                color={CustomDefaultTheme.colors.fontIndiceCardVideo}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </>
  );
};

export default forwardRef(inputTextPerfilPassword);
