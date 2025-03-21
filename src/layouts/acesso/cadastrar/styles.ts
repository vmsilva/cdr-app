import styled from 'styled-components/native';
import { Text, Button } from 'react-native-paper';
import { MaterialCommunityIcons as MDIcon }  from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { TouchableOpacityProps,StyleSheet } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';


export const AvatarContainer = styled.View`
  padding: 10px;
`;

export const EditAvatarButton = styled.TouchableOpacity`
  width: 30%;
  height: 30%;
  border-radius: 30px;
  align-items: center;
  justify-content: center;

  background-color: ${CustomDefaultTheme.colors.buttonPrimary};
  position: absolute;
  bottom: 15%;
  right: 10%;
`;

export const EditAvatarIcon = styled(MDIcon).attrs({
  name: 'camera',
  size: wp('5%'),
  color: '#FFF'
})``;
export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 0 30px 140px;
`;

export const Title = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  /* font-family: 'RobotoSlab-Medium'; */
  margin: 20px 0 24px;
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: 5px;
`;

const Styles = StyleSheet.create({
  container: {},
  texto: {
    //color: '#FFF'
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
    marginBottom: hp('1%'),
  },
  logo:{
    width: 200,
    height: 200
  },
  termos:{
    color: '#FFF'
  }, 
  tooltipText:{
    color: CustomDefaultTheme.colors.primary
  },bannerContainer: {
    /*marginTop: -1000,
    paddingTop: 1000,
    alignItems: "center",
    overflow: "hidden",*/
  },
  b2: {
    height: 150,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: CustomDefaultTheme.colors.iconsPrimaryColor,
  }
});

export default Styles;