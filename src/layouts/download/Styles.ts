import { StyleSheet, Dimensions } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../configuracoes/styles/Theme";

const Styles = StyleSheet.create({
  containerScroll: {
    height: "100%",
  },
  itemVideo: {
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    //borderBottomWidth: 0.2,
    borderBottomColor: "#FFF",
    flexDirection: "row",
    justifyContent: "space-between",
    width: wp("100"),
  },
  blocoBotoesPlay: {
    paddingRight: "5%",
    width: "100%",
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  blocoTextoPlay: {
    paddingLeft: "5%",
    width: "95%",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  contentTab: {
    backgroundColor: "transparent",
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: "2.5%",
    borderRadius: 99,
    marginLeft: 5,
    marginRight: 5,
  },
  containerIcons: {
    width: 24,
    height: 24,
    borderRadius: 30,
    backgroundColor: CustomDefaultTheme.colors.cinzaGov,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Styles;
