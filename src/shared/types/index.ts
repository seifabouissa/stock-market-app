export type NasdaqExchangeStocksParams = {
  market: string;
  exchange: string;
  active: boolean;
  apiKey: string;
  limit: number;
  search?: string;
};

export type NasdaqExchangeStocks = {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string;
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
};

export interface NasdaqExchangeStocksResponse {
  nasdaqExchangeStocks: NasdaqExchangeStocks[];
  count: number;
}
