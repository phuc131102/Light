import React, {useState, useEffect} from 'react';
import {View, Text, StatusBar, StyleSheet} from 'react-native';
import {useSafeArea} from 'react-native-safe-area-context';
import {TOPNAVI_H, BANNER_H} from './constants';
import {BasicButton} from '@phomea/react-native-buttons';
import {
  stylesed,
} from './../component/style'
const TopNavigation = props => {
  const safeArea = useSafeArea();

  const {title, scrollA} = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener(a => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container(safeArea, isFloating, isTransparent)}>
        <BasicButton title="Basic button"  />
        <Text style={styles.title(isTransparent)}>{title}</Text>
      </View>
    </>
  );
};

const styles = {
  container: (safeArea, isFloating, isTransparent) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    justifyContent: 'center',
    shadowOffset: {y: 0},
    backgroundColor: isTransparent ? '#0001' : '#FFF',
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: isTransparent => ({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: isTransparent ? '#FFF' : '#000',
  }),
  but: isTransparent =>({
    left: 10,
    color: isTransparent ? '#FFF' : '#000',
  })
  
};

export default TopNavigation;