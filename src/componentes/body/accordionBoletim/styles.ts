import { StyleSheet } from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";

const styles = StyleSheet.create({
  container: {
    //borderRadius: 10,
    overflow: "hidden",
    backgroundColor: CustomDefaultTheme.colors.cinzaEscuro,
    marginBottom: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
  },
  title: {
    fontSize: 18,
    color: "#FFF",
  },
  content: {
    padding: 10,
  },
  icon: {
    padding: 10,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomWidth: 0.4,
    borderColor: '#FFF',
    padding: 10,
    backgroundColor: CustomDefaultTheme.colors.backgroundBoletim
  },
});

export default styles;
