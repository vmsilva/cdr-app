import { ReactNode } from "react";

export interface videoProps {
    cod_video: any;
    cod_cliente: any;
    uuid_video: any;
    storage: any;
    cod_associacao_conteudo: any;
    cod_serie: any;
    cod_serie_temporada: any;
    cod_visibilidade_conteudo: any;
    grupos_conteudo: any;
    subgrupos_conteudo: any;
    assuntos: any;
    titulo_video: any;
    descricao_video: any;
    sinopse_video: any;
    ficha_tecnica_video: any;
    imagem_h_video: any;
    imagem_v_video: any;
    imagem_fhd_video: any;
    data_cadastro_video: any;
    data_video: any;
    classificacao_indicativa_video: any;
    trailer_video: any;
    legenda_video: any;
    json_video: any;
    duracao_video: any;
    flg_destaque: any;
    ordem_serie: any;
    ordem_video: any;
    status_video: any;
    tags: any;
    generos: any;
    duracao_video_segundos: any;
    hls: any;
    ad: any;
    ad_hit: any;
    cod_tipo_conteudo: any;
    dadosSerie: any;
  }
  
  export interface VideoPropsComponent {
    backButton: ReactNode;
    castButton: ReactNode;
    width: any;
    height: any;
    hls: string;
    thumb: string;
    publicidade: any[];
    titulo: string;
    item: videoProps[];
    seek_video: any;
    pagina_origem: any;
  }