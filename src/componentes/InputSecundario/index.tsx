import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef,
  useState,
  useCallback,
} from 'react';
import { TextInputProps, TextInput } from 'react-native';

import { useTheme, Text } from 'react-native-paper';
import { useField } from '@unform/core';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Icon } from './styles';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';
import CustomText from '../componentes/customText';
import { applyCepMask, applyCpfMask, applyPhoneMask } from '../../configuracoes/utils/utils';
interface InputProps extends TextInputProps {
  name: string;
  icon: string;
  label: string;
  radius?: boolean;
  mask: any;
}

interface InputValueReference {
  value: string;
}

interface InputRef {
  focus(): void;
}

const InputSecundario: React.RefForwardingComponent<InputRef, InputProps> = (
  {name, label, icon, radius = true, multiline = false, mask, keyboardType, ...rest},
  ref,
) => {
  const {colors} = useTheme();
  const inputElementRef = useRef<any>(null);

  const {registerField, defaultValue = '', fieldName, error} = useField(name);
  const inputValueRef = useRef<InputValueReference>({value: defaultValue});

  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
  const [formattedValue, setFormattedValue] = useState(
    mask === "phone" ? applyPhoneMask(defaultValue) : defaultValue
  );

  const handleInputFocus = useCallback(() => {
    //alert('focus')
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

  /*useEffect(() => {
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
  }, [fieldName, registerField]);*/

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

  return (
    <>
      <CustomText textType='montserratMedium' style={{display: label ? 'flex' : 'none', color:'#FFF', height: hp('3%')}}>{label}</CustomText>
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
          color={isFocused || isFilled ? CustomDefaultTheme.colors.placeholderText : CustomDefaultTheme.colors.placeholderText}
        />
        <TextInput
          style={{
            flex: 1,
            //backgroundColor: '#FF0',
            height: '100%',
            width: '100%'
          }}
          //keyboardType={keyboardType}
          selectionColor="#999"
          ref={inputElementRef}
          keyboardAppearance="dark"
          keyboardType={keyboardType ? keyboardType : 'default'}
          placeholderTextColor={CustomDefaultTheme.colors.placeholderText}
          color={CustomDefaultTheme.colors.textInputClaro}
          defaultValue={defaultValue}
          value={formattedValue} // Usa o valor formatado
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          onChangeText={handleChangeText}
          multiline={multiline}
          textAlignVertical={multiline ? 'top' : 'center'}
          numberOfLines={10}
          textContentType="none"
          autoCorrect={false} // Desativa a correção automática
          autoComplete="off" // Desativa o preenchimento automático (versões mais recentes)
          autoCompleteType="off" // Desativa o preenchimento automático (versões mais antigas)
          spellCheck={false}
          {...rest}
        />
      </Container>
    </>
  );
};

export default forwardRef(InputSecundario);
