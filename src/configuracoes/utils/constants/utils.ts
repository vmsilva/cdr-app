export function millisToSecond(millis: number) {
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds;
}

export function millisToMin(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0) as any;

  return minutes + ":" + (seconds < 10 ? "0" : "") + seconds as any;
  //return minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function millisToMinutesSeconds(millis) {
  let totalSeconds = millis / 1000;
  let hours = Math.floor(totalSeconds / 3600);
  totalSeconds %= 3600;
  let minutes = Math.floor(totalSeconds / 60);
  let seconds = totalSeconds % 60;

  minutes = String(minutes).padStart(2, "0") as any;
  hours = String(hours).padStart(2, "0") as any;
  seconds = String(seconds).padStart(2, "0") as any;

  return `${hours}:${minutes}:${
    seconds.split(".")[0].length == 1
      ? `0${seconds.split(".")[0]}`
      : seconds.split(".")[0]
  }`;
}

export const TEMPORADAOBJETO = {
	apresentacao_apresentador_temporada: "",
	apresentadores_temporada: [],
	cod_categoria: "",
	cod_categoria_temporada: "",
	duracao_formatada: "",
	duracao_total: 0,
	duracao_total_time: "",
	nome_apresentador_temporada: "",
	nome_temporada: "",
	ordem_temporada: "",
	palestrantes_temporada: [
	   {
		  cod_aovivos: [],
		  cod_cliente: "",
		  cod_palestrante: "",
		  departamentos: [],
		  descricao_palestrante: "",
		  nome_palestrante: "",
		  ordem_palestrante: "",
		  redes_sociais_palestrante: [],
		  status_palestrante: "",
		  subnome_palestrante: "",
		  titulacao_palestrante: "",
		  url_foto_palestrante: ""
	   }
	],
	subtitulo_apresentador_temporada: "",
	url_foto_apresentador_temporada: "",
	videos: {}
}

export const DIASSEMANA = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

export const MESSTRING = [
  "",
  "Janeiro",
  "Fevereiro",
  "Março",
  "Abril",
  "Maio",
  "Junho",
  "Julho",
  "Agosto",
  "Setembro",
  "Outubro",
  "Novembro",
  "Dezembro",
];

export const MES = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12
];

export const MESES = [{},
	{
		"ano": "2023",
		"mes": "01",
		"nome": "JANEIRO 2023"
	},
	{
		"ano": "2023",
		"mes": "02",
		"nome": "FEVEREIRO 2023"
	},
	{
		"ano": "2023",
		"mes": "03",
		"nome": "MARCO 2023"
	},
	{
		"ano": "2023",
		"mes": "04",
		"nome": "ABRIL 2023"
	},
	{
		"ano": "2023",
		"mes": "05",
		"nome": "MAIO 2023"
	},
	{
		"ano": "2023",
		"mes": "06",
		"nome": "JUNHO 2023"
	},
	{
		"ano": "2023",
		"mes": "07",
		"nome": "JULHO 2023"
	},
	{
		"ano": "2023",
		"mes": "08",
		"nome": "AGOSTO 2023"
	},
	{
		"ano": "2023",
		"mes": "09",
		"nome": "SETEMBRO 2023"
	},
	{
		"ano": "2023",
		"mes": "10",
		"nome": "OUTUBRO 2023"
	},
	{
		"ano": "2023",
		"mes": "11",
		"nome": "NOVEMBRO 2023"
	},
	{
		"ano": "2023",
		"mes": "12",
		"nome": "DEZEMBRO 2023"
	},
];


export const BIBLIOTECADIGITAL = [
	
	{	
		cod_categoria: 3,
		url_foto_v_categoria: 'https://cursocompletodepedagogia.com/wp-content/uploads/2022/09/download-livro-de-lingua-inglesa-9-ano.png#main',
		source:{
			uri: "https://storage.googleapis.com/edocente-content-production/PNLD/PNLD_2020/TIME_TO_SHARE/9ANO/TTSHARE_9ano_PR.pdf",
			cache: true,
		  }
	},
	{	
		cod_categoria: 4,
		url_foto_v_categoria: 'http://www.educadores.diaadia.pr.gov.br/arquivos/Image/livros_didaticos/quimica.png',
		source:{
			uri: "http://www.educadores.diaadia.pr.gov.br/arquivos/File/livro_didatico/quimica.pdf",
			cache: true,
		  }
	},
	{	
		cod_categoria: 1,
		url_foto_v_categoria: 'https://m.media-amazon.com/images/I/41eVtpfJ5kL._SX329_BO1,204,203,200_.jpg',
		source:{
			uri: "http://samples.leanpub.com/thereactnativebook-sample.pdf",
			cache: true,
		  }
	},
	{	
		cod_categoria: 2,
		url_foto_v_categoria: 'https://m.media-amazon.com/images/I/51+3Tyc0Q+L._SY344_BO1,204,203,200_.jpg',
		source:{
			uri: "https://www.caceres.mt.gov.br/fotos_institucional_downloads/2.pdf",
			cache: true,
		  }
	}
] as any;

export function convertTime(inputTime) {
	console.log(inputTime, '--->> minutosss')
    // Separar a string de tempo em partes
    const parts = inputTime.split(':');
    
    // Converter partes para números
    const hours = parseInt(parts[0], 10);
    const minutes = parseInt(parts[1], 10);
    const seconds = parseInt(parts[2], 10);
    
    // Calcular o tempo total em segundos
    const totalSeconds = (hours * 3600) + (minutes * 60) + seconds;
    
    // Verificar o maior valor para determinar a unidade de tempo
    if (hours > 0) {
        return hours > 1 ? `${hours} Horas` : `${hours} Hora`;
    } else if (minutes > 0) {
        return minutes > 1 ? `${minutes} Minutos de conteúdo no total` : `${minutes} Minuto de conteúdo no total`;
    } else {
        return seconds > 1 ? `${seconds} Segundos de conteúdo no total` : `${seconds} Segundo de conteúdo no total`;
    }
}

export function convertSeconds(inputSeconds) {
    // Calcular o número de horas, minutos e segundos
    const hours = Math.floor(inputSeconds / 3600);
    const remainingSecondsAfterHours = inputSeconds % 3600;
    const minutes = Math.floor(remainingSecondsAfterHours / 60);
    const seconds = remainingSecondsAfterHours % 60;
    
    // Construir a string de saída
    let result = '';
    if (hours > 0) {
        result += `${hours} hora${hours > 1 ? 's' : ''}`;
    }
    if (minutes > 0) {
        if (result) result += ' e ';
        result += `${minutes} minuto${minutes > 1 ? 's' : ''}`;
    }
    if (seconds > 0) {
        if (result) result += ' e ';
        result += `${seconds} segundo${seconds > 1 ? 's' : ''}`;
    }
    
    return result;
}

export const FAKECATEGORIA = {
	apresentacao_apresentador: "Categoria falsa",
	arquivos_categoria: [],
	cod_categoria: "0",
	cod_categoria_pai: "0",
	cod_classificacao_indicativa: "1",
	cod_cliente: "1506",
	configuracoes_categoria: [],
	descricao_categoria: "",
	informacoes_categoria: "",
	nome_apresentador: "Casa Folha Apresentador",
	nome_categoria: "Categoria Fake Categoria",
	ordem_categoria: "0",
	sinopse_categoria: "",
	status_categoria: "1",
	subtitulo_apresentador: "Fake",
	url_fhd_categoria: "",
	url_foto_apresentador: "https://cdnc.goveduca.com.br/storage/categorias/1506/2024-07-09_14-27-28_268115_48c2db20.jpg",
	url_foto_categoria: "https://cdnc.goveduca.com.br/storage/categorias/1506/https://cdnc.goveduca.com.br/storage/categorias/1506/2024-07-09_14-27-27_268115_jornada-do.png",
	url_foto_full_categoria: "https://cdnc.goveduca.com.br/storage/categorias/1506/2024-07-09_14-27-28_268115_7d43db53.jpg",
	url_foto_v_categoria: "https://cdnc.goveduca.com.br/storage/categorias/1506/2024-07-09_14-27-27_268115_3f9f05c7.jpg",
	videos: []
}

