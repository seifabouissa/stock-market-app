import {getNasdaqExchangeStocks} from '../index';
import {getMockedNasdaqExchangeStocks} from '../__mocks__/Stocks.mock';

const errorMessage =
  "Failed to parse query parameters from URL: Key: 'ListTickersQueryParam.Limit' Error:Field validation for 'Limit' failed on the 'max' tag";

jest.mock('react-native-config', () => ({
  API_URL: 'https://api.polygon.io/v3/reference/tickers',
  API_KEY: 'WVKkJbUc3M82eMzGr_dV77F4lRfrkBXi',
}));

describe('Get Nasdaq Exchange Stocks', () => {
  it('Nasdaq exchange stocks should fetched successfully', async () => {
    const result = await getNasdaqExchangeStocks(10, 'Aa');
    if ('nasdaqExchangeStocks' in result) {
      expect(result.nasdaqExchangeStocks.length).toBeGreaterThan(0);
    }
  });

  it('Nasdaq exchange stocks should failed to be fetched due to huge limit', async () => {
    const result = await getNasdaqExchangeStocks(1200, 'Apple');
    if ('error' in result) {
      expect(result.error).toBe(errorMessage);
    }
  });
});

describe('Get mocked nasdaq exchange stocks', () => {
  it('Nasdaq exchange stocks should be fetched successfully', async () => {
    const requestedCount = 4;
    const returnedCount = 2;
    const results = await getMockedNasdaqExchangeStocks(
      requestedCount,
      2,
      'Aa',
    );
    if ('nasdaqExchangeStocks' in results.results) {
      expect(
        results.results.nasdaqExchangeStocks.length,
      ).toBeGreaterThanOrEqual(returnedCount);
    }
  });
});
