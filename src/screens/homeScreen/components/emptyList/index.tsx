import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

const EmptyList: FC = (): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>No stocks found</Text>
    </View>
  );
};

export default EmptyList;
