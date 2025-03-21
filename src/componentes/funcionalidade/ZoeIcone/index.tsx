import React, { ReactNode, useEffect, useMemo, useRef, useState } from "react";

// svg
import SVGHOME from "../../../assets/svg/icone-home.svg"
import SVGHOMEDARK  from "../../../assets/svg/icone-home-dark.svg";
import SVGBUSCA from "../../../assets/svg/icone-busca.svg";
import SVGBUSCADARK from "../../../assets/svg/icone-busca-dark.svg";

import SVGCENTRALDEINTERATIVIDADE from "../../../assets/svg/icone-centraldeinteratividade.svg";
import SVGCENTRALDEINTERATIVIDADEDARK from "../../../assets/svg/icone-centraldeinteratividade-dark.svg";

import SVGPLAY from "../../../assets/svg/icone-play.svg";

import SVGBOOKMARK from "../../../assets/svg/icone-bookmark.svg";
import SVGBOOKMARKDARK from "../../../assets/svg/icone-bookmark-dark.svg";

import SVGDOWNLOAD from "../../../assets/svg/icone-download.svg";
import SVGDOWNLOADDARK from "../../../assets/svg/icone-download-dark.svg";

import SVGBARSCOLORIDO from "../../../assets/svg/icone-menu-azul.svg";
import SVGBARS from "../../../assets/svg/icone-menu.svg";

import SVGBUSCACOLORIDO from "../../../assets/svg/icone-busca-azul.svg";

import SVGSAIR  from '../../../assets/svg/icone-sair.svg';

import SVGUSER from '../../../assets/svg/icone-minhaconta.svg'

type ZoeIconeProps = {
  children: ReactNode;
  name: any;
  width: any;
  height: any;
};

const ZoeIcone: React.FC<any | ZoeIconeProps> = ({
  name,
  width,
  height,
  children,
}) => {
  const ICONE = useMemo(() => {
    switch (name) {
      case "icone-user":
        return(<SVGUSER width={width} height={height} />)
        break
      case "icone-play":
        return(<SVGPLAY width={width} height={height} />)
        break
      case "icone-busca":
        return(<SVGBUSCA width={width} height={height} />)
        break
      case "icone-busca-dark":
        return(<SVGBUSCADARK width={width} height={height} />)
        break
      case "icone-home":
        return(<SVGHOME width={width} height={height} />)
        break;
      case "icone-home-dark":
        return(<SVGHOMEDARK width={width} height={height} />)
        break;
      case "icone-centraldeinteratividade":
        return(<SVGCENTRALDEINTERATIVIDADE width={width} height={height} />)
        break;
      case "icone-centraldeinteratividade-dark":
        return(<SVGCENTRALDEINTERATIVIDADEDARK width={width} height={height} />)
        break;
      case "icone-bookmark":
        return(<SVGBOOKMARK width={width} height={height} />)
        break;
      case "icone-bookmark-dark":
        return(<SVGBOOKMARKDARK width={width} height={height} />)
        break;
      case "icone-download":
        return(<SVGDOWNLOAD width={width} height={height} />)
        break;
      case "icone-download-dark":
        return(<SVGDOWNLOADDARK width={width} height={height} />)
        break;
      case "icone-menu-blue":
        return(<SVGBARSCOLORIDO width={width} height={height} />)
        break;
      case "icone-menu":
        return(<SVGBARS width={width} height={height} />)
        break;
      case "icone-busca-azul":
        return(<SVGBUSCACOLORIDO width={width} height={height} />)
        break;
      case "icone-sair":
        return(<SVGSAIR width={width} height={height} />)
        break;
    }
  }, []);

  return <>{ICONE}</>;
};

export default ZoeIcone;

/* SVGBUSCACOLORIDO
import SVGBUSCAR from "../../../assets/svg/icone-busca.svg";
import SVGBUSCARDARK from "../../../assets/svg/iconizer-icone-busca_dark.svg";
import SVGHOME from "../../../assets/svg/icone-home.svg";
import SVGHOMEDARK from "../../../assets/svg/iconizer-icone-home_dark.svg";
import SVGEXPLORE from "../../../assets/svg/icone-centraldeinteratividade.svg";
import SVGEXPLOREDARK from "../../../assets/svg/iconizer-icone-centraldeinteratividade_dark.svg";
import SVGBOOKMARK from "../../../assets/svg/icone-bookmark.svg";
import SVGBOOKMARKDARK from "../../../assets/svg/iconizer-icone-bookmark_dark.svg";
import SVGDOWNLOAD from "../../../assets/svg/icone-download.svg";
import SVGDOWNLOADDARK from "../../../assets/svg/iconizer-icone-download_dark.svg";

*/
