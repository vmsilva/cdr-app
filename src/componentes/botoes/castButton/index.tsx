import React from 'react';
import GoogleCast, { CastButton, useRemoteMediaClient } from 'react-native-google-cast';
import { montaJsonVideo } from '../../../configuracoes/utils/utils';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

interface castButtonProps {
  item: any;
  color: any;
  //isCasting
}

const CastButtom: React.FC<any> = ({ item, color, isCasting }) => {
  const client = useRemoteMediaClient()

  if (client) {
    //isCasting(true)
    if(item != undefined)
      setTimeout(()=>{
        if(item.imagem_logo_tv != undefined){
          let ITEMVIDEO = {hls: item.hls, imagem_v_video: item.imagem_logo_tv, titulo_video: item.titulo_video};
          loadMedia(ITEMVIDEO)
        }else{
          loadMedia(item)
        }
      },100)
    
  }else{
    //isCasting(false)
  }

  const loadMedia = (media: any) => {
    console.log('loadingmedia chromecast');
    client.loadMedia({
      autoplay: true,
      mediaInfo: {
        contentUrl: media.hls ? media.hls : media.hls_path,
        metadata: {
          images: [
            {
              url: media.url_thumb_video,
            },
          ],
          title: media.titulo_video,
          type: "movie",
        },
      },
    });

    //GoogleCast.showExpandedControls();
  };

  return(<CastButton style={{ width: 24, height: 24, tintColor: color == undefined ? '#FFF' : CustomDefaultTheme.colors.CastIconColor }} />); 
}

export default CastButtom;
