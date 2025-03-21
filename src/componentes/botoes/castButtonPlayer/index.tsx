import { FontAwesome5, MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useEffect } from 'react';
import { Button } from 'react-native-paper';
import GoogleCast, {
    useCastDevice,
    useDevices,
    useRemoteMediaClient
} from 'react-native-google-cast';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';
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

interface ChromeCastProps {
    media: videoProps,
    item: any
}

const CastButtonPlayer: React.FC<ChromeCastProps> = ({ media }) => {
    const castDevice = useCastDevice()
    const devices = useDevices()
    const sessionManager = GoogleCast.getSessionManager();
    const client = useRemoteMediaClient()

    const loadMedia = ()=> {

        client.loadMedia({
            autoplay: true,
            mediaInfo: {
                contentUrl: media.hls_path,
                metadata: {
                    images: [
                        {
                        url:media.url_thumb_video,
                        },
                    ],
                    title: media.titulo_video,
                    type: 'movie',
                    }
            }
        });

        GoogleCast.showExpandedControls()
    }

    const handleConecta = ()=> {

        client.loadMedia({
            autoplay: true,
            mediaInfo: {
                contentUrl: media.hls_path,
                metadata: {
                    images: [
                        {
                        url:media.url_thumb_video,
                        },
                    ],
                    title: media.titulo_video,
                    type: 'movie',
                    }
            }
        });

        GoogleCast.showExpandedControls()
    }

    return (
        <>
            {
                !client ? (

                    devices.map((device) => {
                        const active = device.deviceId === castDevice?.deviceId
                    
                        return (
                          <Button
                            style={styles.btnCastPlay}
                            key={device.deviceId}
                            onPress={() =>
                              active
                                ? sessionManager.endCurrentSession()
                                : sessionManager.startSession(device.deviceId)
                            }
                            title={device.friendlyName}
                          >
                            <MaterialCommunityIcons name="cast-connected" size={24} color="#FFF" />
                          </Button>
                        )
                    })
                    
                ):
                (<>
                    <Button
                        style={styles.btnCastPlay}
                        //contentStyle={{borderRadius: 30, height: 50, padding: 1, width: wp('82')}}
                        //icon={()=><MaterialCommunityIcons name="cast-connected" size={24} color="#FFF" />}
                        onPress={() => {
                            handleConecta()
                            //loadMedia()
                        }}
                    >
                       <FontAwesome5 name="chromecast" size={24} color="#FFF" />
                    </Button>
                
                </>)
            }
        </>
    )
}

export default CastButtonPlayer;

function round(number: number, decimals = 1) {
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}