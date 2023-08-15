// BiblePageBottomSheet.tsx
import React, { forwardRef, useRef, useImperativeHandle, useMemo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native'

type Props = {
  selectedColor: string;
  setSelectedColor: (color: string) => void;
  selectedVerses: string[];
  onVersePress: () => void;
};

type Ref = {
  expand: () => void;
  collapse: () => void;
};

const BiblePageBottomSheet = forwardRef<Ref, Props>(({ selectedColor, setSelectedColor, selectedVerses, onVersePress }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => ['10%', '45%'], []);
  const navigation = useNavigation()

  useImperativeHandle(ref, () => ({
    expand: () => {
      bottomSheetRef.current?.expand();
    },
    collapse: () => {
      bottomSheetRef.current?.collapse();
    },
  }));

  const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'indigo'];

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose={true}
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button}
          onPress={() => {
            console.log(selectedVerses); // Add this line
            navigation.navigate('BiblePost', { selectedVerses });
          }}
        >
          <Text style={styles.buttonText}>Create a revelation</Text>
        </TouchableOpacity>
        <View style={styles.colorContainer}>
          {colors.map((color, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.colorButton, { backgroundColor: color }]}
              onPress={() => setSelectedColor(color)}
            />
          ))}
        </View>
      </View>
    </BottomSheet>
  );
});


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    marginTop: 20,
    width: '80%',
    backgroundColor: '#282C35',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  colorContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '80%'
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 4
  }
});

export default BiblePageBottomSheet;
