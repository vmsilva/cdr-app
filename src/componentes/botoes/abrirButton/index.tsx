import React, { useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Button } from "react-native-paper";
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

interface abrirButtonProps {
  item: any;
  page: string;
}

const AbrirButton: React.FC<abrirButtonProps> = ({ page, item }) => { return<></>
  const navigation = useNavigation();
  const { isTablet } = useContext(UtilContext);

  const handleOpenUrl = () => {
    navigation.navigate(page, {});
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenUrl}>
        <Button
          style={{
            backgroundColor: CustomDefaultTheme.colors.buttonPrimary,
            height: 45,
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 10,
            width: isTablet ? wp("20") : wp("40"),
          }}
          contentStyle={{ borderRadius: 30, height: 50, padding: 1 }}
        >
          <CustomText
            textType="bold"
            style={{
              marginBottom: 10,
              textAlign: "center",
              color: CustomDefaultTheme.colors.background,
            }}
          >
            ACESSE
          </CustomText>
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default AbrirButton;
