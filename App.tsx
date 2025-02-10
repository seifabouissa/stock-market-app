import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import MainNavigator from './src/routes/MainNavigator';

if (__DEV__) {
  require('./ReactotronConfig');
}

const App = (): JSX.Element => {
  return (
    <NavigationContainer>
      <SafeAreaView style={{flex: 1}}>
        <MainNavigator />
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default App;
