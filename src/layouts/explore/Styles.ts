import { StyleSheet, Dimensions } from "react-native";

const { width: windowWidth, height: windowHeight } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: {
    paddingTop: windowHeight < 750 ? 80 :110,
    //backgroundColor: '#FF0'
  },
  contentTab: {
    //backgroundColor: "#F00",
    marginTop:5,
    alignItems: 'center'
  },
  tabButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    paddingHorizontal: '2.5%',
    borderRadius: 99,
    marginLeft:5,
    marginRight: 5
  },
});

export default Styles;
