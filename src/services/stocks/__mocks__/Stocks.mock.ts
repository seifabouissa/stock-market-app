import {NasdaqExchangeStocksResponse} from '../../../shared/types';

interface NasdaqExchangeStocksRes {
  results: NasdaqExchangeStocksResponse;
}

export const getMockedNasdaqExchangeStocks = jest
  .fn()
  .mockImplementation(
    (
      requestedCount: number,
      limit: number,
      search: string,
    ): Promise<NasdaqExchangeStocksRes> => {
      if (limit > 2) {
        return Promise.reject(
          new Error(
            'Failed to parse query parameters from URL: The limit is too high',
          ),
        );
      }
      if (requestedCount >= 5) {
        return Promise.reject(
          new Error(
            "Failed to parse query parameters from URL: Key: 'ListTickersQueryParam.Limit' Error: Field validation for 'Limit' failed on the 'max' tag",
          ),
        );
      }
      return Promise.resolve({
        results: {
          nasdaqExchangeStocks: search
            ? [
                {
                  ticker: 'AACG',
                  name: 'ATA Creativity Global American Depositary Shares',
                  market: 'stocks',
                  locale: 'us',
                  primary_exchange: 'XNAS',
                  type: 'ADRC',
                  active: true,
                  currency_name: 'usd',
                  cik: '0001420529',
                  composite_figi: 'BBG000V2S3P6',
                  share_class_figi: 'BBG001T125S9',
                  last_updated_utc: '2024-05-17T00:00:00Z',
                },
                {
                  ticker: 'AAME',
                  name: 'Atlantic American Corp',
                  market: 'stocks',
                  locale: 'us',
                  primary_exchange: 'XNAS',
                  type: 'CS',
                  active: true,
                  currency_name: 'usd',
                  cik: '0000008177',
                  composite_figi: 'BBG000B9XB24',
                  share_class_figi: 'BBG001S5N8T1',
                  last_updated_utc: '2025-02-07T00:00:00Z',
                },
              ]
            : [],
          count: search ? 2 : 0,
        },
      });
    },
  );
