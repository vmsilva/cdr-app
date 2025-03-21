import React, { useEffect, useState } from "react";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ScrollView, View } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
// component
import Styles from "./Styles";
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";

import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { Avatar } from "react-native-paper";
import { useAuth } from "../../configuracoes/hooks/auth";
import AccordionBoletim from "../../componentes/body/accordionBoletim";
import { getData } from "../../configuracoes/services/request";
import Loading from "../../componentes/funcionalidade/Loading";

const BoletimPage: React.FC<any> = (props) => {
  const { user } = useAuth();
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [boletim, setBoletim] = useState<any>([]);

  const buscaBoletim = async () => {
    try {
      setIsLoading(true);
      console.log("busca boletim");
      let parametros = {
        rota: "/avaliacoes/notas",
        parametros: `token=${user.token}`,
        showNotification: false,
        showLogError: true,
      };
      const response = (await getData(parametros)) as any;

      console.log(response.data.data);
      setBoletim(response.data.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    if (isFocused) {
      buscaBoletim();
    }
    return () => {};
  }, [isFocused]);

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={false}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              //props.navigation.goBack();
              navigation.navigate('HomeDrawer');
            }}
          >
            <View
              style={{
                backgroundColor: "#0000006b",
                width: 40,
                height: 40,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
                borderRadius: 199,
                paddingRight: 3,
              }}
            >
              <FontAwesome name="angle-left" size={27} color={CustomDefaultTheme.colors.branco} />
            </View>
          </TouchableOpacity>
        }
        titulo={"Notas"}
        headerRight={
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View
              style={{
                right: 10,
                marginRight: 10,
              }}
            ></View>
            <View
              style={{
                right: 0,
                marginTop: -5,
              }}
            ></View>
          </View>
        }
      />
    );
  };

  const ITEMACCORDION = [
    {
      periodo: "1 Bimestre",
      ementas: [
        {
          materia: "Lingua Portuguesa",
          cod_boletim: 1,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "Matemática",
          cod_boletim: 2,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "História",
          cod_boletim: 3,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
      ],
    },
    {
      periodo: "2 Bimestre",
      ementas: [
        {
          materia: "Lingua Portuguesa",
          cod_boletim: 10,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "Matemática",
          cod_boletim: 12,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
        {
          materia: "História",
          cod_boletim: 22,
          avaliacao: "9,5",
          frequencia: "100%",
          observacoes: "Parabens",
        },
      ],
    },
  ] as any;

  return (
    <>
      <View
        style={[Styles.headerContent]}
      >
        <COMPONENTEHEADER />
      </View>

      <ScrollView
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        style={{
          paddingTop: 0,
          flex: 1,
          padding: "5%",
        }}
      >
        <View
          style={{
            //backgroundColor: "#FFF",
            width: "100%",
            height: 100,
            flexDirection: "row",
          }}
        >
          <View>
            {user.url_avatar ? (
              <Avatar.Image
                source={{ uri: user.url_avatar }}
                size={80}
                style={{ marginTop: 10 }}
              />
            ) : (
              <Avatar.Icon
                icon={() => (
                  <FontAwesome5 name="user-alt" size={wp("20%")} color="#FFF" />
                )}
                size={80}
                style={{
                  marginTop: 0,
                  backgroundColor: "transparent",
                  borderWidth: 1,
                  borderColor: "#FFF",
                }}
              />
            )}
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "center",
              paddingLeft: 10,
            }}
          >
            <CustomText
              style={{ color: CustomDefaultTheme.colors.primary, fontSize: 20 }}
            >
              {user.nome}
            </CustomText>
          </View>
        </View>

        <AccordionBoletim  titulo={'Notas'} item={boletim} isExpanded={false}/>
       
      </ScrollView>

      {isLoading && <Loading />}
    </>
  );
};

export default BoletimPage;
