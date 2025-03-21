import React, { useRef, useState, useEffect, useContext, useMemo } from "react";
import { View, TouchableOpacity } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";

// config
import Styles from "./Styles";

// componentes
import PageHeader from "../../componentes/header";
import CustomText from "../../componentes/componentes/customText";
import { UtilContext } from "../../configuracoes/contexts/UtilContext";
import MosaicoVertical from "../../componentes/body/mosaicoVertical";
import { FontAwesome } from "@expo/vector-icons";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";
import MosaicoVerticalAudio from "../../componentes/body/mosaicoVerticalAudio";

const Explore: React.FC<any> = (props) => {
  const navigation = useNavigation() as any;
  const { categorias, biblioteca, podcast } = useContext(UtilContext);
  const isFocused = useIsFocused();
  const scrollRef = useRef() as any;
  const [isLoading, setIsLoading] = useState(true);
  const { item: biblioteca_digital } = 
  props.route.params != undefined ? props.route.params : "";
  const [tabIndex, setTabIndex] = useState("componente_curricular");

  const handleTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  useEffect(() => {
    if (isFocused) {
      //handleTop();

      console.log(biblioteca_digital)

      if(biblioteca_digital){
        setTabIndex(biblioteca_digital);
      }
    }

    return () => {
      setIsLoading(false);
    };
  }, [isFocused, biblioteca_digital]);

  const COMPONENTEOBJETOSCURRICULARESMEMO = useMemo(
    () => (
      <>
        <View style={[Styles.contentTab, { alignItems: "center" }]}>
          <MosaicoVertical item={categorias} tipo={"programas"} />
        </View>
      </>
    ),
    [categorias]
  );

  const COMPONENTEOBJETOSCURRICULARES = () => (
    <>
      <View style={[Styles.contentTab]}>
        <MosaicoVertical item={categorias} tipo={"programas"} />
      </View>
    </>
  );

  const COMPONENTEBIBLIOTECADIGITAL = () => (
    <>
      <View style={[Styles.contentTab]}>
        <MosaicoVertical item={biblioteca} tipo={"biblioteca_digital"} />
      </View>
    </>
  );


  const COMPONENTEPODCAST = () =>
    podcast != null &&
    podcast.playlists != undefined && (
      <>
        <View style={[Styles.contentTab]}>
          <MosaicoVerticalAudio
            numberOfLines={1}
            item={podcast.playlists}
            array={podcast.playlists}
            tipo={"podcast_tab"}
          />
        </View>
      </>
    );

  const COMPONENTEHEADER = () => {
    return (
      <PageHeader
        backgroundTransparent={true}
        headerLeft={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
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
        titulo={"Explore"}
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

  const COMPONENTEHEADERTAB = useMemo(() => {
    return (
      <>
        <View
          style={{
            top: 10,
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
          }}
        >
          <TouchableOpacity
            style={[
              Styles.tabButton,
              tabIndex == "componente_curricular"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("componente_curricular")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  fontSize: 12,
                  letterSpacing: 0.24,
                  lineHeight: 15,
                  color:
                    tabIndex == "componente_curricular"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Cursos
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              biblioteca.length == 0 && { display: "none" },
              Styles.tabButton,
              tabIndex == "biblioteca_digital"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("biblioteca_digital")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  letterSpacing: 0.24,
                  lineHeight: 15,
                  color:
                    tabIndex == "biblioteca_digital"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Biblioteca Digital
              </CustomText>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              {
                display:
                  podcast != null && podcast.playlists != undefined
                    ? "flex"
                    : "none",
              },
              Styles.tabButton,
              tabIndex == "podcast_tab"
                ? { backgroundColor: CustomDefaultTheme.colors.buttonTabexplore }
                : {
                    borderWidth: 1,
                    borderColor: CustomDefaultTheme.colors.tabButtonBorder,
                  },
            ]}
            onPress={() => setTabIndex("podcast_tab")}
          >
            <View
              style={{
                alignItems: "center",
              }}
            >
              <CustomText
                numberOfLines={2}
                textType="montserratBold"
                style={{
                  lineHeight: 15,
                  letterSpacing: 0.24,
                  color:
                    tabIndex == "podcast_tab"
                      ? "#FFF"
                      : CustomDefaultTheme.colors.tabButtonBorder,
                }}
              >
                Podcast
              </CustomText>
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }, [tabIndex]);

  const COMPONENTEBODYTAB = useMemo(() => {
    switch (tabIndex) {
      case "componente_curricular":
        return (
          <View
            style={{
              width: "100%",
            }}
          >
            {COMPONENTEOBJETOSCURRICULARESMEMO}
          </View>
        );
        break;
      case "biblioteca_digital":
        return (
          <View
            style={{
              width: "100%",
            }}
          >
            <COMPONENTEBIBLIOTECADIGITAL />
          </View> //BIBLIOTECADIGITAL
        );
        break;
      case "podcast_tab": //console.log(podcast)
        return (
          <View
            style={{
              width: "100%",
            }}
          >
            <COMPONENTEPODCAST />
          </View> //BIBLIOTECADIGITAL
        );
        break;
    }
  }, [tabIndex, categorias]);

  return (
    <>
      <COMPONENTEHEADER />
      <View style={[Styles.container]}>
        {COMPONENTEHEADERTAB}
        {COMPONENTEBODYTAB}
      </View>
    </>
  );
};

export default Explore;
