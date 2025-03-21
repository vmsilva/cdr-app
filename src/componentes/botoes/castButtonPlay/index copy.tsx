import { Ionicons } from '@expo/vector-icons';
import React, { useEffect } from 'react'
import { Text } from 'react-native';
import { Button } from 'react-native-paper';
import GoogleCast, {
  MediaPlayerState,
  useMediaStatus,
  useRemoteMediaClient,
  useStreamPosition,
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
    media: videoProps
}

//export default function Client() {
const CastButtonPlay: React.FC<ChromeCastProps> = ({ media }) => {
    const client = useRemoteMediaClient()
    const status = useMediaStatus()
    const streamPosition = useStreamPosition()

    useEffect(() => {
    const started = client?.onMediaPlaybackStarted(() =>
        console.log('playback started')
    )
    const ended = client?.onMediaPlaybackEnded(() =>
        console.log('playback ended')
    )

    return () => {
        started?.remove()
        ended?.remove()
    }
    }, [client])

    if (!client){
        return (
        <Text style={{ margin: 10 }}>
            Connect to a Cast device to establish a session
        </Text>
        )
    }   

    const loadMedia = ()=> {

        client.loadMedia({
            mediaInfo: {
                contentUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/CastVideos/mp4/BigBuckBunny.mp4',
            },
        })

    }

    return (
        <>
            {!status || status.playerState === MediaPlayerState.IDLE ? (
                <Button
                    style={styles.btnCastPlay}
                    contentStyle={{borderRadius: 30, height: 50, padding: 1, width: wp('82')}}
                    icon={()=><Ionicons name="play-circle-outline" size={24} color="#FFF" />}
                    onPress={loadMedia}
                    //title={media.titulo_video}
                >
                    <CustomText textType='bold' style={{marginBottom: 10,textAlign: 'center',color:CustomDefaultTheme.colors.branco}}>
                        Assistir
                    </CustomText>
                </Button>
            ) : status.playerState === MediaPlayerState.PAUSED ? (
                <Button onPress={() => client.play()} title="Play" style={styles.btnCastPlay} >
                     <CustomText textType='bold' style={{marginBottom: 10,textAlign: 'center',color:CustomDefaultTheme.colors.branco}}>
                        Play
                    </CustomText>
                </Button>
            ) : (
                <Button onPress={() => client.pause()} style={styles.btnCastPlay} >
                    <CustomText textType='bold' style={{marginBottom: 10,textAlign: 'center',color:CustomDefaultTheme.colors.branco}}>
                        pause
                    </CustomText>
                </Button>
            )}
        </>
    )
}

export default CastButtonPlay;

function round(number: number, decimals = 1) {
  const factor = Math.pow(10, decimals)
  return Math.round(number * factor) / factor
}