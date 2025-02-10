import React, {FC} from 'react';
import {Image, Keyboard, TextInput, View} from 'react-native';
import {styles} from './styles';
import {UseStocksStore} from '../../../../store/stocks';
import UseDebounce from '../../../../shared/hooks/UseDebounce';

const Header: FC = (): JSX.Element => {
  const {debounce} = UseDebounce();
  const {setSearch} = UseStocksStore(state => ({
    setSearch: state.setSearch,
  }));

  const setSearchResults = (text: string) => {
    setSearch(text);
    Keyboard.dismiss();
  };

  const debouncedSearch = debounce(setSearchResults, 1000);

  const handleSearch = (text: string) => {
    debouncedSearch(text);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/images/nasdaq.png')}
        style={{width: 100, height: 50}}
        resizeMode="contain"
      />
      <TextInput
        placeholder="Search"
        placeholderTextColor="#000"
        style={styles.input}
        onChangeText={handleSearch}
      />
    </View>
  );
};

export default Header;
