import GoogleCast, {
  useRemoteMediaClient,
} from "react-native-google-cast";

const client = useRemoteMediaClient();

export function loadingCast(dados: any) {
  

  client.loadMedia({
    autoplay: true,
    mediaInfo: {
      contentUrl: dados.hls,
      metadata: {
        images: [
          {
            url: dados.imagem_v_video,
          },
        ],
        title: dados.titulo_video,
        type: "movie",
      },
    },
  });

  GoogleCast.showExpandedControls();
}
