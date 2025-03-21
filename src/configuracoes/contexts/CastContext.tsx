import React, { createContext, useCallback } from "react";
import GoogleCast, { useRemoteMediaClient } from "react-native-google-cast";

interface HitProps {
  children: any;
}

type CastData = {
  loadMedia: (media: any) => void;
};

export const CastContext = createContext<CastData>({ loadMedia: () => {} });

function CastProvider({ children }: HitProps): JSX.Element {
  const client = useRemoteMediaClient();

  // Função loadMedia com verificação de client antes de chamar
  const loadMedia = useCallback(
    async (media: any) => {
      if (!client) {
        console.log("Client do Cast não está disponível.");
        return;
      }

      try {
        await client.loadMedia({
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
            mediaTracks: [], // Pode adicionar logicamente suas legendas aqui
          },
        });

        GoogleCast.showExpandedControls();
      } catch (error) {
        console.log(error, "--> cast error");
      }
    },
    [client] // O hook depende do client
  );

  return (
    <CastContext.Provider value={{ loadMedia }}>
      {children}
    </CastContext.Provider>
  );
}

export default CastProvider;
