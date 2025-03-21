import React, { useCallback, useMemo, useRef } from 'react';
import { View, Text, Button } from 'react-native';
import BottomSheet from "@gorhom/bottom-sheet";

import Styles from './styles';
import { CustomDefaultTheme } from '../../../configuracoes/styles/Theme';

const CustomBottomSheet = () => {
  // ref
  //const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const sheetRef = useRef<any>(null);

  // variables
  const snapPoints = useMemo(() => ['0%', '50%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    sheetRef.current?.expand();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
      <View style={Styles.container}>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
      
        <BottomSheet ref={sheetRef} snapPoints={["1%", 950]}>
            <View
              style={{
                backgroundColor: CustomDefaultTheme.colors.primary,
                padding: 16,
                height: 350,
              }}
            >
            </View>
          </BottomSheet>
      </View>
  );
};

export default CustomBottomSheet;