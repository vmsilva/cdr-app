import React, { useRef, useState, useEffect, useContext } from "react";
import { View, TouchableOpacity, FlatList } from "react-native";
import { useNavigation, useIsFocused } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { FontAwesome } from "@expo/vector-icons";

// Componentes
import CustomText from "../../componentes/componentes/customText";
import PageHeader from "../../componentes/header";

// Configuracoes
import Styles from "./Styles";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import CardTv from "../../componentes/body/cardTv";

const AoVivoConteudosPage: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const isFocused = useIsFocused();
  const { tvsAoVivo } = useContext(UtilContext);
  const scrollRef = useRef() as any;
  const [isLoading, setIsLoading] = useState(true);
  const [tabIndex, setTabIndex] = useState("componente_tv");

  const handleTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    if (isFocused) {
    }

    return () => {
      setIsLoading(false);
    };
  }, [isFocused]);

  // ao vivo
  const COMPONENTEAOVIVO = () => (
    <>
      <View style={[Styles.contentTab]}>
        {(
          <FlatList
            data={Object.values(tvsAoVivo)}
            renderItem={(render_I) => { 
              console.log(render_I.item, 'renderizaaaaaa ');
              return (
                <CardTv
                  item={render_I.item}
                  isFullScreen={false}
                  array={tvsAoVivo}
                />
              );
            }}
          />
        )}
      </View>
    </>
  );

  const COMPONENTEHEADER = () => {
    return (
      <View
        style={{
          height: hp("12"),
          backgroundColor: CustomDefaultTheme.colors.background,
        }}
      >
        <PageHeader
          headerLeft={
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
                //props.navigation.goBack();
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
                <FontAwesome
                  name="angle-left"
                  size={27}
                  color={CustomDefaultTheme.colors.branco}
                />
              </View>
            </TouchableOpacity>
          }
          titulo={"Ao Vivo"}
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
      </View>
    );
  };

  const SELECTSTYLE = {
    backgroundColor: CustomDefaultTheme.colors.primaryButton,
    borderRadius: 10,
  };

  const SELECTSTYLEFONT = {
    color: CustomDefaultTheme.colors.text,
  };

  const STYLEBUTTONLAYOU = {
    backgroundColor: CustomDefaultTheme.colors.transparent,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: CustomDefaultTheme.colors.primaryButton,
  };

  const COMPONENTEHEADERTAB = () => {
    return (
      <>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <TouchableOpacity
            style={[
              Styles.tabButton,
              tabIndex == "componente_tv" ? SELECTSTYLE : STYLEBUTTONLAYOU,
            ]}
            onPress={() => setTabIndex("componente_tv")}
          >
            <View style={[Styles.tabContentButton]}>
              <CustomText
                numberOfLines={2}
                textType="montserratSemiBold"
                style={[
                  Styles.fontTabHeader,
                  tabIndex == "componente_tv" && SELECTSTYLEFONT,
                ]}
              >
                Ao vivo
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  };

  const COMPONENTEBODYTAB = () => {
    return (
      <View
        style={{
          width: "100%",
          paddingTop: 10,
          //backgroundColor: '#FF0'
        }}
      >
        <COMPONENTEAOVIVO />
      </View>
    );
  };

  return (
    <>
      <COMPONENTEHEADER />

      <View style={[Styles.container]}>
        <COMPONENTEHEADERTAB />
        <COMPONENTEBODYTAB />
      </View>
    </>
  );
};

export default AoVivoConteudosPage;
