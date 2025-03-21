import React, { useContext, useEffect } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { NativeModules, Platform, TouchableOpacity } from "react-native";
import { UtilContext } from "../../../configuracoes/contexts/UtilContext";

const { PipModule } = NativeModules;

interface PipButtonProps {}

const PipButton: React.FC<PipButtonProps> = ({}) => {
  const { setPip } = useContext(UtilContext);

  // ativa pip mode
  const handlePip = () => {
    setPip(true);
    PipModule.enterPipMode();
    return;
  };

  if(Platform.OS == 'ios'){
    return <></>;
  }

  return (
    <>
      <TouchableOpacity onPress={handlePip}>
        <MaterialIcons name={"picture-in-picture"} size={24} color="#FFF" />
      </TouchableOpacity>
    </>
  );
};

export default PipButton;
