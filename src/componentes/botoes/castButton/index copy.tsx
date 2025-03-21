import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import GoogleCast, { CastButton, useRemoteMediaClient, useMediaStatus, useStreamPosition } from 'react-native-google-cast';
import {
  Dialog, 
  Portal
} from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TBCIMAGEM from '../../../assets/adaptive-icon.png';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';

interface ChromeCastProps {
  media: any
}

const CastButtom: React.FC<ChromeCastProps> = ({ media }) => {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);
  const hideDialog = () => setVisible(false);
  // This will automatically rerender when client is connected to a device
  // (after pressing the button that's rendered below)
  const client = useRemoteMediaClient()
  const sessionManager = GoogleCast.getSessionManager()

  if(client){

    client.loadMedia({
      mediaInfo: {
        contentUrl: TBCIMAGEM,//'https://tbcflix.com.br/assets/images/tbcflix.com.br/portal-logo-base.png?upd=1675427218',
        contentType: 'image/png',
      },
    });

    return (
      <>
        <TouchableOpacity
          onPress={()=> {
            showDialog();
          }}
        >
          <MaterialCommunityIcons name="cast-connected" size={24} color="#FFF" />
        </TouchableOpacity>
        <Portal>
          <Dialog 
              style={{
                  borderWidth:0,
                  backgroundColor: CustomDefaultTheme.colors.background,
                  height: hp('100'),
                  //width: wp('100'),
                  //right: wp('5')
              }} 
              visible={visible} 
              onDismiss={hideDialog}
          >
              <Dialog.ScrollArea>
              <TouchableOpacity
                  style={{
                    flexDirection:'row', 
                    justifyContent:'center',
                    backgroundColor: 'transparent' ,
                    marginTop: hp('3'), 
                    marginBottom: 20
                  }}
                  onPress={() => hideDialog()}
              >
                  <CustomText 
                    textType="medium" 
                    style={{
                      fontSize: 20,
                      color:CustomDefaultTheme.colors.text, 
                      fontWeight: '800', 
                      textDecoration: 'sublime'
                      }}
                  >
                    Fechar
                  </CustomText>
              </TouchableOpacity>
              <ScrollView 
                  contentContainerStyle={{paddingHorizontal: 24}}
                  showsHorizontalScrollIndicator={false}
                  style={{
                      width: wp('100'),
                      maxHeight: hp('74'),
                      right: 40
                  }}
              >

                <TouchableOpacity
                  onPress={()=> GoogleCast.showExpandedControls()}
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <MaterialCommunityIcons name="remote-tv" size={35} color={CustomDefaultTheme.colors.text} />
                  <CustomText 
                    textType="medium"
                    style={{color: CustomDefaultTheme.colors.text}}
                  >
                    Controles
                  </CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={()=> {
                    alert('teste');
                    return;
                    sessionManager.endCurrentSession()
                    hideDialog()
                  }}
                  style={{
                    flexDirection: 'row'
                  }}
                >
                  <MaterialCommunityIcons name="remote-tv" size={35} color={CustomDefaultTheme.colors.text} />
                  <CustomText 
                    textType="medium"
                    style={{color: CustomDefaultTheme.colors.text}}
                  >
                    Desconectar
                  </CustomText>
                </TouchableOpacity>
                  
              </ScrollView>
              </Dialog.ScrollArea>
          </Dialog>
        </Portal>
      </>
    )
  }

  return(<CastButton style={{ width: 24, height: 24, tintColor: '#FFF' }} />); 

}

export default CastButtom;
