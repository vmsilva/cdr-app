import React, { useContext, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import { Drawer } from "react-native-paper";
import FastImage from "react-native-fast-image";

// Config
import { useAuth } from "../../hooks/auth";
import { CustomDefaultTheme } from "../../styles/Theme";

// Componentes
import CustomText from "../../../componentes/componentes/customText";
import VersoesApp from "../../../componentes/versaoApp";

// Imagens
import IMAGEMLOGO from "../../../assets/logo.png";
import LOGOMENU from '../../../assets/logomenu.png';
import { UtilContext } from "../../contexts/UtilContext";
import { useNavigation, useRoute } from "@react-navigation/native";
import { removerQueues } from "../../../../trackPlayerServices";
import { PlayerContext } from "../../contexts/PlayerContext";

//SVGS
import ZoeIcone from "../../../componentes/funcionalidade/ZoeIcone";



const ICONESIZE = 19;

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const navigation = useNavigation() as any;
  const route = useRoute();
  const [expanded, setExpanded] = React.useState(false);
  const { arrayEmpresasUsuario } = useAuth();
  const handlePress = () => setExpanded(!expanded);
  const { signOut, user, cliente } = useAuth();
  const { setEmpresa, setHome } = useContext(UtilContext);
  const { setExibePlayer } = useContext(PlayerContext);

  // mata audio player
  const MATAPLAYERAUDIO = async () => {
    try {
      await removerQueues();

      setExibePlayer(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = () => {
    MATAPLAYERAUDIO();
    setHome([]);
    setEmpresa([]);
    props.navigation.closeDrawer();
    setTimeout(() => signOut(), 1);
  };

  const handleNavigate = (string) => {
    navigation.navigate(string);
  };

  useEffect(() => {
    const currentRouteName = route.name;
    console.log("Drawer Navigator - Tela atual:", route);
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView
        style={{ backgroundColor: CustomDefaultTheme.colors.bottomTab }}
        {...props}
      >
        <View style={styles.drawerContent}>
          <View style={{ marginTop: 20 }} />
          <View
            style={{
              paddingHorizontal: 15,
              //width: wp("100"),
              //height: hp("7"),
              flex: 1,
            }}
          >
            <FastImage
              source={LOGOMENU}
              style={{
                width: 100,
                height: 60,
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
          </View>
          <Drawer.Section
            style={[
              {
                //display: cliente.layout ? "flex" : "none",
                width: 400,
                paddingHorizontal: 15,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.drawerbutton}
              onPress={() => handleNavigate("HomeDrawer")}
            >
              <ZoeIcone name="icone-home" width={ICONESIZE} height={ICONESIZE} />
              <CustomText textType="montserratBold" style={styles.fonteMenu}>
                Home
              </CustomText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.drawerbutton}
              onPress={() => handleNavigate("MensagemDrawer")}
            >
              <ZoeIcone name="icone-centraldeinteratividade"  width={ICONESIZE} height={ICONESIZE} />
              <CustomText textType="montserratBold" style={styles.fonteMenu}>
                Canal de Interatividade
              </CustomText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.drawerbutton}
              onPress={() => handleNavigate("PerfilDrawer")}
            >
              <ZoeIcone name="icone-user" width={ICONESIZE} height={ICONESIZE} />
              <CustomText textType="montserratBold" style={styles.fonteMenu}>
                Minha Conta
              </CustomText>
            </TouchableOpacity>

            {user && (
              <TouchableOpacity
                style={styles.drawerbutton}
                onPress={handleSignOut}
              >
                <ZoeIcone name="icone-sair" width={ICONESIZE} height={ICONESIZE} />
                <CustomText textType="montserratBold" style={styles.fonteMenu}>
                  Sair
                </CustomText>
              </TouchableOpacity>
            )}

            {/* 
            <Drawer.Item
              //labelStyle={{marginLeft: 10, position: 'absolute'}}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu} >Home</CustomText>}
              icon={({ color, size }) => (
                <SVGHOME width={ICONESIZE} height={ICONESIZE} />
              )}
              onPress={() => handleNavigate("HomeDrawer")}
            />
            <Drawer.Item
              style={{
                display: arrayEmpresasUsuario.length > 1 ? "flex" : "none",
              }}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu}>Cliente</CustomText>}
              icon={({ color, size }) => (
                <MDCIcon
                  name="database"
                  size={size}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              )}
              onPress={() => handleNavigate("EmpresaDrawer")}
            />
            <Drawer.Item
              style={{
                display: arrayEmpresasUsuario.length > 1 ? "flex" : "none",
              }}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu}>Configurações</CustomText>}
              icon={({ color, size }) => (
                <FontAwesome
                  name="gear"
                  size={size}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              )}
              onPress={() => handleNavigate("ConfiguracoesDrawer")}
            />
            <Drawer.Item
              style={{
              }}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu}>Frequência</CustomText>}
              icon={({ color, size }) => (
                <FontAwesome
                  name="clock-o"
                  size={size}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              )}
              onPress={() => handleNavigate("FrequenciaDrawer")}
            />

            <Drawer.Item
              style={{
              }}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu}>Notas</CustomText>}
              icon={({ color, size }) => (
                <FontAwesome
                  name="file-text"
                  size={size}
                  color={CustomDefaultTheme.colors.iconsPrimaryColor}
                />
              )}
              onPress={() => handleNavigate("BoletimDrawer")}
            />
            <Drawer.Item
              style={{
              }}
              label={<CustomText textType="montserratBold" style={styles.fonteMenu}>Canal de Interatividade</CustomText>}
              icon={({ color, size }) => (
                <SVGEXPLORE width={ICONESIZE} height={ICONESIZE} />
              )}
              onPress={() => handleNavigate("MensagemDrawer")}
            />
            {user && (
              <Drawer.Item
                style={
                  {
                    //display: arrayEmpresasUsuario.length > 1 ? "flex" : "none"
                  }
                }
                label={<CustomText textType="montserratBold" style={styles.fonteMenu} >Minha Conta</CustomText>}
                icon={({ color, size }) => (
                  <SVGMINHACONTA width={ICONESIZE} height={ICONESIZE} />
                )}
                onPress={() => handleNavigate("PerfilDrawer")}
              />
            )}
            */}
          </Drawer.Section>
          <DrawerItemList {...props} />
        </View>
      </DrawerContentScrollView>
      <View
        style={{
          bottom: 20,
          paddingHorizontal: 20,
          width: "100%",
          //backgroundColor: '#0F0'
        }}
      >
        <VersoesApp
          styleText={{
            paddingVertical: 10,
          }}
          fontSize={10}
          color={"#000"}
        />
      </View>
    </View>
  );
};

export default DrawerContent;

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
    //backgroundColor: '#30F',
    paddingHorizontal: 10,
  },
  userInfoSection: {
    paddingLeft: 20,
    paddingBottom: 20,
  },
  title: {
    fontSize: 16,
    marginTop: 3,
    fontWeight: "bold",
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 15,
  },
  bottomDrawerSection: {
    borderTopColor: "#FFF",
    borderTopWidth: 0.1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  fonteMenu: {
    left: 10,
    color: '#FFF'
  },
  drawerbutton: {
    flexDirection: "row",
    alignItems: "center",
    height: 50,
  },
});
