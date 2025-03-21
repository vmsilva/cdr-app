import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import { Text as TextPaper } from 'react-native-paper';
import { TouchableOpacity as GestureButton } from 'react-native-gesture-handler';
import { TouchableOpacityProps,StyleSheet } from 'react-native';

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 40px;
`;

export const Title = styled(TextPaper)`
  font-size: 24px;

  margin: 20px 0 24px;
  font-weight: bold;
`;

export const ForgotPassword = styled.TouchableOpacity`
  margin-top: 24px;
`;
export const ForgotPasswordText = styled.Text`
  color: ${CustomDefaultTheme.colors.primary};
  font-size: 16px;
  /* font-family: 'RobotoSlab-Regular'; */
`;

export const ResetPasswordButton = styled(GestureButton)<TouchableOpacityProps>`
  height: 60px;
  width: 100%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
  background-color: #101010;
`;

export const ResetPasswordText = styled.Text`
  color: white;
  font-size: 14px;
`;

export const CloseBottomButton = styled(GestureButton)<TouchableOpacityProps>`
  align-items: center;
  justify-content: center;
`;

const Styles = StyleSheet.create({
  container: {},
  texto: {
    color: CustomDefaultTheme.colors.fontAzul
  },
  conteudoProgramacao: {
    marginTop: hp('2%')
  },
  headerConteudoProgramacao: {
    marginLeft: wp('7%'),
    color: '#FFF'
  },
  scrollView: {
    minWidth: wp('100%'),
    minHeight: wp('100%'),
  },
  logoView:{
    marginBottom: 40//hp('5%'),
  },
  logo:{
    width: 200,
    height: 180
  },
  blocoRedes:{
    marginTop: hp('5%')
  }
});

export default Styles;
