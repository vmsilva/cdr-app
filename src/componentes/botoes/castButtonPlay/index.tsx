import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useEffect } from "react";
import { Button } from "react-native-paper";
import GoogleCast, {
  useMediaStatus,
  useRemoteMediaClient,
  useStreamPosition,
} from "react-native-google-cast";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";

import { TouchableOpacity } from "react-native-gesture-handler";

interface videoProps {
    ad: any;                                                   
    ad_hit: any;                                                   
    assuntos: any;                                                   
    classificacao_indicativa_video: any;                                                   
    cod_associacao_conteudo: any;                                                   
    cod_cliente: any;                                                  
    cod_serie: any;                                                   
    cod_serie_temporada: any;                                                   
    cod_tipo_conteudo: any;                                                  
    cod_video: any;                                                   
    cod_visibilidade_conteudo: any;                                                   
    dadosSerie: any;                                                   
    data_cadastro_video: any;                                                   
    data_video: any;                                                   
    descricao_video: any;                                                   
    duracao_video: any;                                                   
    duracao_video_segundos: any;                                                   
    ficha_tecnica_video: any;                                                   
    flg_destaque: any;                                                   
    generos: any;                                                   
    grupos_conteudo: any;                                                   
    hls: any;                                                   
    imagem_fhd_video: any;                                                   
    imagem_h_video: any;                                                   
    imagem_v_video: any;                                                   
    json_video: any;                                                   
    legenda_video: any;                                                   
    ordem_serie: any;                                                  
    ordem_video: any;                                                 
    sinopse_video: any;                                                   
    status_video: any;                                                 
    storage: any;                                                  
    subgrupos_conteudo: any;                                                   
    tags: any;                                                   
    titulo_video: any;                                                   
    trailer_video: any;                                                   
    uuid_video: any;  
}

interface ChromeCastProps {
  media: videoProps;
}

//export default function Client() {
const CastButtonPlay: React.FC<ChromeCastProps> = ({ media }) => {
  const client = useRemoteMediaClient();
  const status = useMediaStatus();
  const streamPosition = useStreamPosition();

  useEffect(() => {
    const started = client?.onMediaPlaybackStarted(() =>
      console.log("playback started")
    );
    const ended = client?.onMediaPlaybackEnded(() =>
      console.log("playback ended")
    );

    return () => {
      started?.remove();
      ended?.remove();
    };
  }, [client, status]);

  if (!client) {
    return (
      <CustomText style={{ margin: 10 }}>
        Connect to a Cast device to establish a session
      </CustomText>
    );
  }

  const loadMedia = () => {
    console.log(media)
    //alert('teste'); return;
    client.loadMedia({
      autoplay: true,
      mediaInfo: {
        contentUrl: media.hls ? media.hls : media.hls_path,
        metadata: {
          images: [
            {
              url: media.imagem_v_video,
            },
          ],
          title: media.titulo_video,
          type: "movie",
        },
      },
    });

    GoogleCast.showExpandedControls();
  };

  return (
    <>
      {client && (
        <TouchableOpacity
            onPress={loadMedia}
        >
            <Button
            style={{
                backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
                height: 45,
                flexDirection: "row-reverse",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: 10,
            }}
            contentStyle={{
                borderRadius: 30,
                height: 50,
                padding: 1,
                width: wp("82"),
            }}
            icon={() => (
                <MaterialCommunityIcons
                name="cast-connected"
                size={24}
                color={CustomDefaultTheme.colors.preto}
                />
            )}
            
            >
            <CustomText
                textType="bold"
                style={{
                marginBottom: 10,
                textAlign: "center",
                color: CustomDefaultTheme.colors.preto,
                }}
            >
                Assistir
            </CustomText>
            </Button>
        </TouchableOpacity>
      )}
    </>
  );
};

export default CastButtonPlay;

function round(number: number, decimals = 1) {
  const factor = Math.pow(10, decimals);
  return Math.round(number * factor) / factor;
}
