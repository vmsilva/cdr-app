import React, { useContext } from "react";
import { Text } from "react-native-paper";
import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  Feather,
  FontAwesome,
  AntDesign,
} from "@expo/vector-icons";

// Config
import DrawerContent from "./DrawerContent";
import TabNavigator from "../tabNavigation/TabNavigator";
import { useAuth } from "../../hooks/auth";
import { CustomDefaultTheme } from "../../styles/Theme";
import { UtilContext } from "../../contexts/UtilContext";
import { PlayerContext } from "../../contexts/PlayerContext";

// Components
import CustomText from "../../../componentes/componentes/customText";

//paginas
import Perfil from "../../../layouts/perfil";
import Sinopse from "../../../layouts/sinopse";
import WebSeeAppInterno from "../../../layouts/WebSeeAppInterno";
import VejaMais from "../../../layouts/vejaMais";
import SinopseSerie from "../../../layouts/sinopseSerie";
import Configruacoes from "../../../layouts/configuracoes";
import AoVivoPage from "../../../layouts/aoVivo";
import BookReader from "../../../layouts/bookReader";
import BoletimPage from "../../../layouts/boletim";
import FrequenciaPage from "../../../layouts/frequencia";
import MensagemPage from "../../../layouts/mensagem";
import FaleConoscoPage from "../../../layouts/faleConosco";
import SinopseLivro from "../../../layouts/sinopseLivro";
import Buscar from "../../../layouts/busca";
import Empresa from "../../../layouts/empresa";
import SinopseAudio from "../../../layouts/sinopseAudio";
import FiltroTemporada from "../../../layouts/sinopseSerie/filtroTemporada";
import FiltroPalestranteCursos from "../../../layouts/sinopseSerie/filtroPalestranteCursos";
import Explore from "../../../layouts/explore";


const DrawerNavigator = createDrawerNavigator();

const DrawerNavigatorRoutes = ({ navigation }) => {
  const { arrayEmpresasUsuario } = useAuth();
  const { base } = useContext(UtilContext);
  const { setTocando, setTab } = useContext(PlayerContext);

  return (
    <>
      <DrawerNavigator.Navigator
        id="PrincipalDrawer"
        drawerContent={(props: any) => <DrawerContent {...props} />}
        initialRouteName={"HomeDrawer"
          //arrayEmpresasUsuario.length > 1 ? "EmpresaDrawer" : "HomeDrawer"
        }
      >
         <DrawerNavigator.Screen
          name="HomeDrawer"
          component={TabNavigator} //TabNavigator
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Home</CustomText>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="book"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
          listeners={({ navigation, route }) => ({
            focus: () => {
              setTab(true);
            },
            blur: () => {
              setTab(false);
            },
          })}
        />
        
        <DrawerNavigator.Screen
          name="EmpresaDrawer"
          component={Empresa}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText textType="montserratBold" >Cliente</CustomText>,
            drawerIcon: ({ color, size }) => (
              <AntDesign
                name="database"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              //display: arrayEmpresasUsuario.length > 1 ? "flex" : "none",
              display: 'none'
            },
          })}
        />

        <DrawerNavigator.Screen
          name="ExploreDrawer"
          component={Explore}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText textType="montserratBold" >Cliente</CustomText>,
            drawerIcon: ({ color, size }) => (
              <AntDesign
                name="database"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              //display: arrayEmpresasUsuario.length > 1 ? "flex" : "none",
              display: 'none'
            },
          })}
        />

       

        <DrawerNavigator.Screen
          name="BuscaDrawer"
          component={Buscar}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Player</CustomText>,
            drawerIcon: ({ color, size }) => (
              <Feather name="search" size={24} color="#F00" />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="SinopseAudioDrawer"
          component={SinopseAudio}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Player</CustomText>,
            drawerIcon: ({ color, size }) => (
              <Feather name="search" size={24} color="#F00" />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
          listeners={({ navigation, route }) => ({
            focus: () => {
              //setTocando('SinopseAudioDrawer')
            },
            blur: () => {
              setTocando("");
            },
          })}
        />

        <DrawerNavigator.Screen
          name="PerfilDrawer"
          component={Perfil}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Sobre</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />
        
        <DrawerNavigator.Screen
          name="FiltroTemporadaDrawer"
          component={FiltroTemporada}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Seletor de temporadas</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="FiltroPalestranteCursosDrawer"
          component={FiltroPalestranteCursos}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Seletor de temporadas</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="AoVivoDrawer"
          component={AoVivoPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Ao vivo</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="SinopseDrawer"
          component={Sinopse}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Sinopse</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="SinopseLivroDrawer"
          component={SinopseLivro}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Sinopse</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
          listeners={({ navigation, route }) => ({
            focus: () => {
              //setTocando('SinopseSerieDrawer')
            },
            blur: () => {
              setTocando("");
            },
          })}
        />

        <DrawerNavigator.Screen
          name="SinopseSerieDrawer"
          component={SinopseSerie}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <Text>Sinopse</Text>,
            drawerIcon: ({ color, size }) => (
              <Feather
                name="globe"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
          listeners={({ navigation, route }) => ({
            focus: () => {
              //setTocando('SinopseSerieDrawer')
            },
            blur: () => {
              setTocando("");
            },
          })}
        />

        <DrawerNavigator.Screen
          name="VejaMaisDrawer"
          component={VejaMais}
          options={({ navigation }) => ({
            headerShown: false,
            drawerItemStyle: {
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="WebSeeAppInternoDrawer"
          component={WebSeeAppInterno}
          options={({ navigation }) => ({
            headerShown: false,
            drawerItemStyle: {
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="FaqDrawer"
          component={FaleConoscoPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerItemStyle: {
              display: "none",
            },
          })}
        />

        <DrawerNavigator.Screen
          name="BookReaderDrawer"
          component={BookReader}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Book</CustomText>,
            drawerIcon: ({ color, size }) => (
              <FontAwesome
                name="book"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: "none",
            },
          })}
          listeners={({ navigation, route }) => ({
            focus: () => {
              //setTocando('BookReaderDrawer')
            },
            blur: () => {
              setTocando("");
            },
          })}
        />

        <DrawerNavigator.Screen
          name="BoletimDrawer"
          component={BoletimPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Boletim</CustomText>,
            drawerIcon: ({ color, size }) => (
              <FontAwesome
                name="file-o"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              /*display:
                base.FLG_BOLETIM != undefined && base.FLG_BOLETIM
                  ? "flex"
                  : "none", */
              display: 'none'
            },
          })}
        />

        <DrawerNavigator.Screen
          name="FrequenciaDrawer"
          component={FrequenciaPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Frequência</CustomText>,
            drawerIcon: ({ color, size }) => (
              <AntDesign
                name="contacts"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              /*display:
                base.FLG_FREQUENCIA != undefined && base.FLG_FREQUENCIA
                  ? "flex"
                  : "none", */
              display: 'none'
            },
          })}
        />

        <DrawerNavigator.Screen
          name="MensagemDrawer"
          component={MensagemPage}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Mensagem</CustomText>,
            drawerIcon: ({ color, size }) => (
              <AntDesign
                name="message1"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: 'none'
            },
          })}
        />

        <DrawerNavigator.Screen
          name="ConfiguracoesDrawer"
          component={Configruacoes}
          options={({ navigation }) => ({
            headerShown: false,
            drawerLabel: () => <CustomText>Configurações</CustomText>,
            drawerIcon: ({ color, size }) => (
              <FontAwesome
                name="gear"
                size={24}
                color={CustomDefaultTheme.colors.iconsPrimaryColor}
              />
            ),
            drawerItemStyle: {
              borderBottomColor: "#FFF",
              borderBottomWidth: 0.4,
              width: 220,
              display: 'none'
            },
          })}
        />
      </DrawerNavigator.Navigator>
    </>
  );
};

export default DrawerNavigatorRoutes;
