import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";


export function AlertNotfier(dados: any) {
  switch(dados.tipo){
    case 'error':

    Alert.alert(dados.msg);
    break;
    case 'success':
      Alert.alert(dados.msg);
      break;
  }
}

export function handleOpenDrawer() {
  const navigation = useNavigation() as any;

  navigation.openDrawer();
}

