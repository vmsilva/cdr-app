import { StyleSheet, Platform, Dimensions } from "react-native";
import styled, { css } from 'styled-components/native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const styles = StyleSheet.create({
  textInput: {
    height: "100%",
    //borderWidth: 0.3,
    //borderColor: "#FFF",
    color: CustomDefaultTheme.colors.fontPrimaria,
    paddingHorizontal: 10,
  }
});

export default styles;

export const TextInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
`;
