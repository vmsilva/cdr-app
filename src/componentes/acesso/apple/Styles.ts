import { StyleSheet } from 'react-native';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const styles = StyleSheet.create({  
  appleButton:{ 
    backgroundColor: CustomDefaultTheme.colors.branco,
    borderRadius: 5,
    height: 44, width: 300,
    justifyContent: 'center',
    alignItems: 'center',
  },
  appleText:{
    color: '#000',
    fontSize: 19,
    textTransform: 'none'
  },

  container: {
    //flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'yellow',
  },
  appleBtn: { height: 44, width: 300 }
});

export default styles;
