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
import { applyCepMask, applyCpfMask, applyPhoneMask } from "../../../configuracoes/utils/utils";

interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  radius?: boolean;
  label: any;
  background: any;
  mask?: "phone"; // Adicionando a prop mask
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
> = ({ altura, background, name, icon, radius = true, label, multiline = false, mask, ...rest }, ref) => {
  const { colors } = useTheme();
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = "", fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [formattedValue, setFormattedValue] = useState(
    mask === "phone" ? applyPhoneMask(defaultValue) : defaultValue
  );

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

  const handleChangeText = (value: string) => {
    let cleanedValue = value;

    // Remove a máscara para armazenar o valor limpo
    if (mask === "phone") {
      cleanedValue = value.replace(/\D/g, ""); // Remove tudo que não é número
    }

    // Aplica a máscara ao valor exibido
    let formattedValue = cleanedValue;
    if (mask === "phone") {
      formattedValue = applyPhoneMask(cleanedValue);
    }

    // Atualiza o valor do input
    inputValueRef.current.value = cleanedValue; // Armazena o valor sem máscara
    setFormattedValue(formattedValue); // Atualiza o valor formatado no estado
    if (inputElementRef.current) {
      inputElementRef.current.setNativeProps({ text: formattedValue });
    }
  };

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(refe: any, value) {
        let formattedValue = value;
  
        // Aplica a máscara ao valor recebido
        switch (mask) {
          case "phone":
            formattedValue = applyPhoneMask(value);
            break;
          case "cpf":
            formattedValue = applyCpfMask(value); // Função para máscara de CPF
            break;
          case "cep":
            formattedValue = applyCepMask(value); // Função para máscara de CEP
            break;
          // Adicione mais casos conforme necessário
          default:
            formattedValue = value; // Sem máscara
            break;
        }
  
        // Atualiza o valor do input
        inputValueRef.current.value = value; // Armazena o valor sem máscara
        setFormattedValue(formattedValue); // Atualiza o valor formatado no estado
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({ text: formattedValue });
        }
      },
      clearValue() {
        inputValueRef.current.value = "";
        setFormattedValue("");
        if (inputElementRef.current) {
          inputElementRef.current.clear();
        }
      },
    });
  }, [fieldName, registerField, mask]);

  /*
  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: "value",
      setValue(refe: any, value) {
        let formattedValue = value;

        // Aplica a máscara ao valor recebido
        if (mask === "phone") {
          formattedValue = applyPhoneMask(value);
        }

        // Atualiza o valor do input
        inputValueRef.current.value = value; // Armazena o valor sem máscara
        setFormattedValue(formattedValue); // Atualiza o valor formatado no estado
        if (inputElementRef.current) {
          inputElementRef.current.setNativeProps({ text: formattedValue });
        }
      },
      clearValue() {
        inputValueRef.current.value = "";
        setFormattedValue("");
        if (inputElementRef.current) {
          inputElementRef.current.clear();
        }
      },
    });
  }, [fieldName, registerField, mask]); */

  return (
    <>
      <View
        style={{
          borderBottomColor: CustomDefaultTheme.colors.cinzaEscuro,
        }}
      >
        <View>
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
          style={{
            minHeight: altura != undefined ? altura : 25,
            paddingHorizontal: 1,
            paddingVertical: 5,
            borderRadius: 99,
            backgroundColor: background != undefined ? background : 'transparent'
          }}
          ref={inputElementRef}
          keyboardAppearance="dark"
          placeholderTextColor={CustomDefaultTheme.colors.TextInput}
          color={CustomDefaultTheme.colors.fontPrimaria}
          value={formattedValue} // Usa o valor formatado
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText} // Usando a função personalizada
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