import envConfig from 'react-native-config';
import axios from 'axios';
import {
  NasdaqExchangeStocksParams,
  NasdaqExchangeStocksResponse,
} from '../../shared/types';

const getNasdaqExchangeStocks = async (
  limit: number,
  search: string,
): Promise<NasdaqExchangeStocksResponse | {error: string}> => {
  try {
    const params: NasdaqExchangeStocksParams = {
      market: 'stocks',
      exchange: 'XNAS',
      active: true,
      limit,
      search,
      apiKey: envConfig.API_KEY!,
    };
    const nasdaqExchangeStocks = await axios.get(envConfig.API_URL!, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${envConfig.API_KEY}`,
      },
      params,
    });
    return {
      nasdaqExchangeStocks: nasdaqExchangeStocks.data.results,
      count: nasdaqExchangeStocks.data.count,
    };
  } catch (error: any) {
    const errorMessage =
      error?.response?.data?.error ||
      error?.message ||
      'Failed to fetch stocks';
    return {error: errorMessage};
  }
};

export {getNasdaqExchangeStocks};
