import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import HomeScreen from '..';
import {FlatList, Text} from 'react-native';

const mockStocks = [
  {
    ticker: 'AACG',
    name: 'ATA Creativity Global American Depositary Shares',
  },
  {ticker: 'AAME', name: 'Atlantic American Corp'},
];

// Mock the store first
const mockGetNasdaqExchangeStocks = jest.fn();
const mockIncreaseLimit = jest.fn();

// Mock store with a function to allow dynamic updates
const mockStoreState = {
  nasdaqExchangeStocks: [],
  search: '',
  isLoading: false,
  isError: false,
  errorMessage: '',
  hasMoreData: true,
  limit: 10,
  getNasdaqExchangeStocks: mockGetNasdaqExchangeStocks,
  increaseLimit: mockIncreaseLimit,
};

jest.mock('../../../store/stocks', () => ({
  UseStocksStore: jest.fn(selector => selector(mockStoreState)),
}));

// Mock styles
jest.mock('../styles', () => ({
  styles: {
    container: {},
    listContainer: {},
    listWrapper: {},
    footer: {},
    footerText: {},
    loadMorBtn: {},
    loadMoreText: {},
    input: {},
    stockContainer: {},
    stockWrapper: {},
    stockName: {},
    stockTicker: {},
    emptyContainer: {},
    emptyText: {},
    modalContainer: {},
    modalContent: {},
    modalText: {},
    retryButton: {},
    retryText: {},
  },
}));

// Mock React Native components
jest.mock('react-native', () => ({
  FlatList: 'FlatList',
  Platform: {
    OS: 'ios',
  },
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  View: 'View',
  StyleSheet: {
    create: jest.fn(),
  },
}));

// Mock child components
jest.mock('../components/stockList', () => 'StockList');
jest.mock('../components/emptyList', () => 'EmptyList');
jest.mock('../components/header', () => 'Header');
jest.mock('../../../shared/components/modal', () => 'StockModal');

describe('Home screen component renders correctly', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    Object.assign(mockStoreState, {
      nasdaqExchangeStocks: [],
      search: '',
      isLoading: false,
      isError: false,
      errorMessage: '',
      hasMoreData: true,
      limit: 20,
      getNasdaqExchangeStocks: mockGetNasdaqExchangeStocks,
      increaseLimit: mockIncreaseLimit,
    });
  });

  it('Renders correctly with initial state', () => {
    const tree = ReactTestRenderer.create(<HomeScreen />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('GetNasdaqExchangeStocks called on mount', () => {
    ReactTestRenderer.create(<HomeScreen />);
    expect(mockGetNasdaqExchangeStocks).toHaveBeenCalled();
  });

  it('Renders stock list with data', () => {
    Object.assign(mockStoreState, {nasdaqExchangeStocks: mockStocks});

    const renderer = ReactTestRenderer.create(<HomeScreen />);
    const instance = renderer.root;
    const flatList = instance.findByType(FlatList);
    expect(flatList.props.data).toEqual(mockStocks);
  });

  it('Handles end reached and loads more data', () => {
    const renderer = ReactTestRenderer.create(<HomeScreen />);
    const instance = renderer.root;
    const flatList = instance.findByType(FlatList);
    flatList.props.onEndReached();

    expect(mockIncreaseLimit).toHaveBeenCalled();
    expect(mockGetNasdaqExchangeStocks).toHaveBeenCalled();
  });

  it('Shows no more stocks message when hasMoreData is false', () => {
    Object.assign(mockStoreState, {
      hasMoreData: false,
      isLoading: false,
      isError: false,
    });

    const renderer = ReactTestRenderer.create(<HomeScreen />);
    const instance = renderer.root;
    const flatList = instance.findByType(FlatList);
    const FooterComponent = flatList.props.ListFooterComponent;
    const footerInstance = ReactTestRenderer.create(FooterComponent());
    const footerTexts = footerInstance.root.findAllByType(Text);
    const noMoreStocksText = footerTexts.find(
      text => text.props.children === 'No More Stocks To Be Fetched',
    );
    expect(noMoreStocksText).toBeDefined();
  });
});
