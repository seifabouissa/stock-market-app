import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FC} from 'react';
import HomeScreen from '../screens/homeScreen';

const {Navigator, Screen} = createNativeStackNavigator();

const HomeNavigator: FC = (): JSX.Element => {
  return (
    <Navigator>
      <Screen
        name="Home"
        component={HomeScreen}
        options={{headerShown: false}}
      />
    </Navigator>
  );
};

export default HomeNavigator;
