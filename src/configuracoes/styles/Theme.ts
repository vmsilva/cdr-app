import {
  DefaultTheme as PaperDefaultTheme,
  //DarkTheme as PaperDarkTheme
} from 'react-native-paper';

import {
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';

export const CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    // tags
    backgroundTags:  "#00000078",
    borderColorTags: 'transparent',

    backgroundIndiceCardVideo: '#B48A36',
    fontIndiceCardVideo: '#FFF',

    ///
    buttonTabexplore: '#B48A36',

    // sombra destaque
    corsombradestaque: '#000000',

    //carde serie
    buttonCardSerie: '#B48A36',

    //
    descricao_palestrante: '#021849',

    // 
    fontPlayerPage: '#B48A36',

    // cor texto
    headerBuscaTextColor: '#021849',

    // shadow perfil
    shadowPerfil: '#252525',
    shadowPerfil2: '#3B3B3B',

    //Campo texto para enviar mensagem ao admin
    textMensagemBackground: '#FFF',
    colorTextInputMensagem: '#000',

    // cor de fundo balão remetente
    remetenteBalao: '#transparent',
    senderBalao: '#FFF',

    // cores de fonte padrão no componente que expand os controles do player e exibe as informaoes
    textBottomsheetPlayerAudio: '#FFF',

    // botão leia mais
    leiamaisbuttoncolor: '#275074',

    // chat ao vivo
    textInputChatAoVivo: '#000',

    // bloco informacoes livro sinopse
    informacoesLivroSinopse: '#03192B',
    borderInformacoesLivro:'#707070',

    //background icones button
    backgroundIconsButton: '#B48A36', 

    //
    fontCardDownloadVideo: '#B48A36',

    //
    CastIconColor: '#35BEAF',

    //
    bottomTab: '#021849',

    // Continuar assistindo
    continuarAssistindoBackground: "#B48A36",
    backgroundSliderContinuarAssistindo: '#ffffff80',

    // button destaques
    ButtonDestaque: '#B48A36',

    // icones dashboard
    iconsHeaderScroll: '#b58845',

    // material complementar
    backgroundMaterialComplementar: '#292929',

    //perfil categoria
    tituloCategoria: '#B48A36',

    //input busca
    backgroundInputBusca: '#FFF',
    iconeSearchBar: '#021849',
    activityLoading: '#021849',

     // sinopse
    informacoesSinopse: '#292929',

     // input
     backgroundInput: '#333333',
     backgroundInputBorder: '#494949',
 
     primaryButton:  '#B48A36',
 
     // linkedin button
     backgroundButtonLinkedin: '#0e66c2',

     //gradiente
     gradiente1: '#f1f1f1',
     gradiente2: '#f1f1f1',
     gradiente3: '#f1f1f1',

     //texto componente video dashboard
     textScrollDashboard: '#021849',

    backgroundBackButton: '#0000000b',
    facebookColor: '#2674f2',
    appleColor: '#000',
    sliderTrackplayer: '#03192B',
    header: 'transparent',
    theme: '#B9161F',
    primary: '#FFF',//'#5DA57D',
    secondary: '#27272F',
    bgcarrossel: '#a21a1a',
    bgprogramacao: '#333',
    bgsliderplayer: '#a21a1a',
    bgsliderContinuar: '#318EDE',
    fontPrimaria: '#FFF00',
    fontSecundaria: '#021849',
    text: '#021849',
    textFundoEscuro: '#FFF',
    textFundoClaro: '#021849',
    icons: '#FFF',
    iconsBackgroundEscuro: '#FFF',
    background: '#f1f1f1',
    backgroundSinopseLivro: '#F0F0F0',
    surface: '#000',
    accent: '#101010',
    error: '#101010',
    onSurface: '#000',
    disabled: '#000',
    placeholder: '#101010',
    //placeholderText: '#ffffff70',
    placeholderText: '#737373',
    TextInput: '#434343',
    backdrop: '#ffffffad',
    notification: 'red',
    card: '#000',
    border: '#1A648A',
    labelInput: '#FFF',
    backgroundInputMSG: '#d2d2d2',
    backgroundTransparent: '#00000099',
    textoOpaco: '#c2c3c4db',
    corBotaoProgramacao: '#404047',
    blocoAoVivoCor:'#E2E2E2',
    corError: '#a21a1a',
    modalBackground:'#29292fde',
    modalFont: '#FFF',
    tagChipBg: '#4e4f53b3',
    aoVivoLive: '#46c254',
    gradientCard: '#555565',
    msgSucesso: '#4BB543',
    sucesso: 'green',
    aoVivoColor: '#FF3030',
    primaryTransparent: '#27272fbd',
    branco: '#FFF',
    tabButtonBorder: "#999999",
    preto: '#000',
    vermelho: '#C72928',
    cinza: '#dfdfdf',
    sliderColor: '#05BEAF',
    cinzaSecundario:'#B2B2B2',
    vermelhoLayout: '#E30A17',
    borda:'#1A648A',
    progamaSelecionado: '#34343B',
    brancoGelo: '#f7f7f7',
    cor_fundo_principal :' #FF4F28',
    cor_texto_principal : '#FFF',
    cor_fundo_barra_superior : '#000000',
    cor_texto_barra_superior : '#FFF',
    cinza_botao: '#3a3a39',
    cinzaEscuro: '#4a4a53',
    fakerBG:'#b2b2b299',
    buttonPrimary: '#B48A36',
    loading: '#FFF',
    tagBackground: '#A1A2A4',
    informacoesPlayerColor: '#191919',
    fundoAnimacao: '#029f40',
    backgroundCards: '#373938',
    backgroundCardEmpresa: '#D4D4D4',
    backgroundControlPlayer: '#0f0f0f61',
    iconsPrimaryColor: '#021849',
    //iconsPrimaryColor: '#021849',
    fontAzul: '#0D1475',
    labelCor: '#36496C',
    accordion: '#acbec0',
    backgroundLoading: '#1c43ff7a',
    backgroundLoadingSecundary: '#0f0f0f94',
    transparent: 'transparent',
    btnMinhalistaadd: '#00D735',
    gelo: '#f0f0f0',
    verde: '#00d835',
    chatRemetente: '#333333',
    chatSender: '#A9C8B0',
    fontPolitica: '#434343',
    apresentadorFont: '#FFF',
    bioapresentadorFont: '#999999',
    backgroundAulas: '#D5D5D5',
    progressColor: '#2655FF',
    azulBic: '#2655FF',
    textTituloColor: '#f9b721',
    backgroundSubtitle: '#000000c2',
    sliderAzul: '#348FDC',
    drawerBackground: '#5bb3b969',
    buttonAdd: '#39894C',
    buttonRemove: '#FF3D3D',
    cinzaGov: '#9daaae',
    lottieColor: '#000',
    backgroundSlider: '#4F4F58',
    progressoSlider: '#DB354F', //aquiii era amarelo
    visto: '#00D735',
    bordaVisto: '#46BB7B',
    backgroundBoletim: '#6c8d92',
    backgroundControlesplayer: '#00000085',
    amarelo: '#f7a833',
    textoBottomSheetDownload: '#FFF',
    loadingPlayer: '#FFF',
    borderCardColorGeral: '#00000085',
    textBottomunselect: '#92929D',

  }
};

export const CustomDarkTheme = {
  ...NavigationDarkTheme,
  //...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    //...PaperDarkTheme.colors,
    placeholder: 'white', 
    text: '#021849', 
    primary: 'white',
    underlineColor: 'transparent', 
    background: '#1F1F1F'
  },
};

