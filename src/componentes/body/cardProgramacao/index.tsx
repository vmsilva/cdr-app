import React,{ useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import {
  useSharedValue
} from 'react-native-reanimated';
import { List } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import styles from './Styles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';
import CustomText from '../../componentes/customText';

// 2- FM 3- AM

interface CardProgramacaoProps  {
  info: any;
  item: any;
}

const CardProgramacao: React.FC<CardProgramacaoProps> = ({ info, item }) => {
  const navigation = useNavigation() as any;
  const boxHeight = useSharedValue(hp('10%'));
  const [mostraDescricao, setMostraDescricao] = useState(false);
  
  function toggleHeight() {
    boxHeight.value === hp('30%') ?
    boxHeight.value = hp('10%') :
    boxHeight.value = hp('30%');

    mostraDescricao ? setMostraDescricao(false): setMostraDescricao(true);
  };

  useEffect(()=>{
    //console.log(lembretesArray)
    return () => { 
      ;}
  },[ 
    //info, 
    //mostraDescricao, 
    //item
  ])
    
  return(
  <>
    <View style={{backgroundColor: info.flg_live == '1' ? CustomDefaultTheme.colors.aoVivoLive: 
      CustomDefaultTheme.colors.bgprogramacao, 
        borderTopRightRadius: 16, 
        borderTopLeftRadius: 16,
        borderBottomLeftRadius: 16, 
        borderBottomRightRadius: 16,
        width: wp('90'), left: wp('5')
      }}
    >
      <List.Section
        style={{backgroundColor: info.flg_live == '1' ? CustomDefaultTheme.colors.aoVivoLive: 
          CustomDefaultTheme.colors.bgprogramacao, 
          borderTopRightRadius: 16, 
          borderTopLeftRadius: 16,
          borderBottomLeftRadius: 16, 
          borderBottomRightRadius: 16,
          marginBottom:40
        }}
      >
        <View
          style={{flexDirection: 'row'}}
        >
            <View
              style={{flexDirection: 'column', width:wp('60%'), alignSelf: 'center'}}
            >
              <CustomText style={[styles.textoHora,{color: info.flg_live == '1' ? '#FFF': '#FFF'}]} >{info.hora_inicio_programacao} - {info.hora_termino_programacao}</CustomText>
              <CustomText style={[styles.textoNome,{color: info.flg_live == '1' ? '#FFF': '#FFF', fontWeight: "bold"}]}>{info.nome_programacao}</CustomText>
            </View>
            <View
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width:wp('18%'), 
                left: wp('7%'), 
              }}
            > 
              <View style={{width: 10}} />
              <TouchableOpacity
                style={{borderColor: '#FFF'}}
                onPress={(e) => toggleHeight()
                }
              >
                <View style={[
                  styles.botaoCards,
                  {
                    borderWidth: 0.6,
                    borderColor: '#FFF',
                    backgroundColor:info.flg_live == '1' ? CustomDefaultTheme.colors.cinza: CustomDefaultTheme.colors.corBotaoProgramacao,
                  }]
                }>
                  
                  {
                    mostraDescricao?
                      <AntDesign  name="minus" size={20} color="#FFF" style={{borderColor: CustomDefaultTheme.colors.cinza}} />
                    :
                      <AntDesign  name="plus" size={20} color="#FFF" style={{borderColor: CustomDefaultTheme.colors.cinza}}/>
                  }
                
                </View>
              </TouchableOpacity>
              
            </View>
        </View>
        <List.Item
          style={{
            display: mostraDescricao ? 'flex':'none',
            top:30
          }}
          title={(<>
              {
                mostraDescricao ?
                  <View style={{ 
                    }}
                  >
                    <CustomText style={{
                      color:CustomDefaultTheme.colors.preto,
                      opacity: .5
                      }}
                    >{info.descricao_programacao}</CustomText>
                  </View>
                :
                  <></>}
           
            
          </>)}
        />
      </List.Section>
    </View>
  </>
  );
}
export default CardProgramacao;
