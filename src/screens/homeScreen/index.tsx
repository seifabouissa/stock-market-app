import React, {FC, useCallback, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {UseStocksStore} from '../../store/stocks';
import {NasdaqExchangeStocks} from '../../shared/types';
import StockList from './components/stockList';
import EmptyList from './components/emptyList';
import Header from './components/header';
import {styles} from './styles';
import StockModal from '../../shared/components/modal';

const HomeScreen: FC = (): JSX.Element => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const {
    nasdaqExchangeStocks,
    search,
    isLoading,
    isError,
    errorMessage,
    hasMoreData,
    limit,
    getNasdaqExchangeStocks,
    increaseLimit,
  } = UseStocksStore(state => ({
    nasdaqExchangeStocks: state.nasdaqExchangeStocks,
    search: state.search,
    isLoading: state.isLoading,
    isError: state.isError,
    errorMessage: state.errorMessage,
    hasMoreData: state.hasMoreData,
    limit: state.limit,
    getNasdaqExchangeStocks: state.getNasdaqExchangeStocks,
    increaseLimit: state.increaseLimit,
  }));

  const renderErrorMsg = (showModal: boolean) => {
    return (
      <>
        <Text style={styles.footerText}>{errorMessage}</Text>
        <TouchableOpacity
          onPress={() => {
            getNasdaqExchangeStocks();
            showModal && setModalVisible(false);
          }}
          style={styles.loadMorBtn}>
          <Text style={styles.loadMoreText}>Load More Manually</Text>
        </TouchableOpacity>
      </>
    );
  };

  const renderItem = useCallback(({item}: {item: NasdaqExchangeStocks}) => {
    return <StockList ticker={item.ticker} name={item.name} />;
  }, []);

  const renderEmptyList = useCallback(() => {
    return <EmptyList />;
  }, []);

  const renderFooter = useCallback(() => {
    return (
      <View style={styles.footer}>
        {isLoading && <ActivityIndicator size="large" color="#0397C8" />}

        {!isLoading && !isError && !hasMoreData && (
          <Text style={styles.footerText}>No More Stocks To Be Fetched</Text>
        )}

        {!isLoading && isError && renderErrorMsg(false)}
      </View>
    );
  }, [isLoading, isError, errorMessage, hasMoreData]);

  const handleEndReached = () => {
    if (!isLoading && !isError && hasMoreData) {
      increaseLimit();
      getNasdaqExchangeStocks();
    }
  };

  useEffect(() => {
    getNasdaqExchangeStocks();
  }, [search, limit]);

  useEffect(() => {
    if (!isLoading && isError) {
      setModalVisible(true);
    }
  }, [isLoading, isError]);

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.listContainer}>
        <View style={styles.listWrapper}>
          <FlatList
            data={nasdaqExchangeStocks}
            numColumns={2}
            renderItem={renderItem}
            ListEmptyComponent={renderEmptyList}
            ListFooterComponent={renderFooter}
            showsVerticalScrollIndicator={false}
            onEndReachedThreshold={0.1}
            onEndReached={handleEndReached}
            columnWrapperStyle={{
              gap: 10,
            }}
            contentContainerStyle={{
              gap: 10,
              flexGrow: 1,
              paddingBottom: Platform.OS === 'android' ? 30 : 0,
            }}
          />
        </View>
        {!isLoading && isError && (
          <StockModal modalVisible={modalVisible}>
            {renderErrorMsg(true)}
          </StockModal>
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
