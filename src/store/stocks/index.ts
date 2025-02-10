import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';
import {NasdaqExchangeStocks} from '../../shared/types';
import {getNasdaqExchangeStocks} from '../../services/stocks';

type UseStocksStoreInitialState = {
  appHasHydrated: boolean;
  nasdaqExchangeStocks: NasdaqExchangeStocks[];
  limit: number;
  search: string;
  hasMoreData: boolean;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
};

type UseStocksStore = UseStocksStoreInitialState & {
  setAppHasHydrated: (state: boolean) => void;
  getNasdaqExchangeStocks: () => void;
  setIsLoading: (state: boolean) => void;
  increaseLimit: () => void;
  setSearch: (search: string) => void;
  resetState: () => void;
};

const initialState: UseStocksStoreInitialState = {
  appHasHydrated: false,
  nasdaqExchangeStocks: [],
  limit: 20,
  search: '',
  hasMoreData: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
};

export const UseStocksStore = create<UseStocksStore>()(
  devtools(
    persist(
      (set, get) => ({
        ...initialState,
        setAppHasHydrated: (state: boolean) => {
          set({appHasHydrated: state});
        },
        getNasdaqExchangeStocks: async () => {
          const {limit, search} = get();
          set({isLoading: true});
          try {
            const response = await getNasdaqExchangeStocks(limit, search);
            if ('error' in response) {
              set({
                isError: true,
                errorMessage: response.error,
              });
            } else {
              const {nasdaqExchangeStocks} = response;
              const hasMoreData = nasdaqExchangeStocks.length === limit;
              set({
                nasdaqExchangeStocks,
                hasMoreData,
                errorMessage: '',
                isError: false,
              });
            }
          } catch (error: any) {
            const errorMessage =
              error?.response?.data?.error ||
              error?.message ||
              'Failed to fetch stocks';
            set({
              isError: true,
              errorMessage,
            });
          } finally {
            set({isLoading: false});
          }
        },
        increaseLimit: () => {
          const {limit} = get();
          set({limit: limit + 10});
        },
        setSearch: (search: string) => {
          set({search});
        },
        setIsLoading: (state: boolean) => {
          set({isLoading: state});
        },
        resetState: () => {
          set({
            nasdaqExchangeStocks: [],
            search: '',
            limit: 20,
            hasMoreData: false,
            isLoading: false,
            isError: false,
            errorMessage: '',
          });
        },
      }),
      {
        name: 'stocksStore',
        storage: createJSONStorage(() => AsyncStorage),
        onRehydrateStorage: () => state => {
          state?.setAppHasHydrated(true);
          state?.resetState();
        },
      },
    ),
  ),
);
