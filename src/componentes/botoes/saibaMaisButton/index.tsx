import React from "react";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Button } from "react-native-paper";

// Configuracões
import { CustomDefaultTheme } from "../../../configuracoes/styles/Theme";
import CustomText from "../../componentes/customText";
import { useAuth } from "../../../configuracoes/hooks/auth";

interface saibaMaisButtonProps {
  item: any;
}

const SaibaMaisButton: React.FC<saibaMaisButtonProps> = ({
  item,
}) => {
  const navigation = useNavigation() as any;
  const { cliente } = useAuth();
  const handleOpenUrl = () => {
    navigation.navigate("SinopseSerieDrawer", { item: item, relacionados: [] });
  };

  return (
    <>
      <TouchableOpacity onPress={handleOpenUrl}>
        <Button
          style={{
            backgroundColor: cliente.layout.background ?  cliente.layout.background : CustomDefaultTheme.colors.buttonPrimary,
            height: 45,
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 99,
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
            Saiba Mais
          </CustomText>
        </Button>
      </TouchableOpacity>
    </>
  );
};

export default SaibaMaisButton;
