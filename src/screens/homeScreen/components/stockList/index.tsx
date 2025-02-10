import React, {FC} from 'react';
import {Text, View} from 'react-native';
import {styles} from './styles';

type StockListProps = {
  ticker: string;
  name: string;
};

const StockList: FC<StockListProps> = ({ticker, name}): JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.ticker}>{ticker}</Text>
      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>
    </View>
  );
};

export default StockList;
