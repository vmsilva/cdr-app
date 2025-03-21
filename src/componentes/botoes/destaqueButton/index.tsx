
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRemoteMediaClient } from 'react-native-google-cast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Button } from 'react-native-paper';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';
import CastButtonPlay from '../castButtonPlay';
import { Ionicons } from '@expo/vector-icons';

// config
import styles from './styles';

interface videoProps {
  cod_video:string;
  cod_cliente:string;
  hash_video:string;
  titulo_video:string;
  descricao_video:string;
  id_cdn_video:string;
  hls_path:string;
  data_upload_video:string;
  data_liberacao_video:string;
  data_remocao_video:string;
  url_thumb_video:string;
  url_thumb_vertical_video:string;
  url_hover_vertical_video:string;
  duracao_video:string;
  json_video:string;
  url_tmp_video:string;
  tags_video:string;
  versao_streaming:string;
  ordem_video:string;
  status_video:string;
  cod_categoria:string;
}

interface DestaqueButtonProps{
  item: videoProps;
  relacionados: any;
  aoVivo: boolean;
}

const DestaqueButton: React.FC<DestaqueButtonProps> = ({item, relacionados, aoVivo}) => {
    const client = useRemoteMediaClient()
    const navigation = useNavigation();

    return(
      <>
        {
          client ? (
            <CastButtonPlay style={{backgroundColor:'#FF0'}} media={item}/>
          ):(
            <Button
                style={styles.buttonDestaque}
                contentStyle={{borderRadius: 30, height: 50, padding: 1, width: wp('82')}}
                onPress={() => navigation.navigate('PlayerDrawer',{item:item, relacionados:relacionados, aovivo:aoVivo})}
                icon={()=><Ionicons name="play-circle-outline" size={24} color="#FFF" />}
            >
                <CustomText textType='bold' style={{marginBottom: 10,textAlign: 'center',color:CustomDefaultTheme.colors.branco}}>
                    Assistir
                </CustomText>
            </Button>
          )
        }
      </>
    ); 
}

export default DestaqueButton;
