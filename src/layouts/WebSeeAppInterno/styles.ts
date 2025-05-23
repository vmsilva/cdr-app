import styled from 'styled-components/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../configuracoes/styles/Theme';
import { Text as TextPaper } from 'react-native-paper';
import { TouchableOpacity as GestureButton } from 'react-native-gesture-handler';
import { TouchableOpacityProps,StyleSheet , Platform } from 'react-native';

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
  botaoFlutuante:{
      backgroundColor: '#a21a1a',
  }
  ,buttonConteudo:{
        backgroundColor: 'transparent' ,
        position: 'absolute',       
    },textButton:{
        padding: hp('0.1%'),
        color: '#FFF',
        fontSize: 18,
        //backgroundColor: '#0303069c',
        marginLeft: wp('70%'),
        height: hp('3.5%'),
        width: wp('12%'),
        position: 'absolute',
        marginTop: hp('89%'),
        borderRadius: 15,
    }
});

export default Styles;
