import ReactTestRenderer from 'react-test-renderer';
import StockList from '..';
import {Text} from 'react-native';

const stock = {
  ticker: 'AACG',
  name: 'ATA Creativity Global American Depositary Shares',
};

describe('Stock list component renders correctly', () => {
  it('Stock list component renders correctly', () => {
    const renderer = ReactTestRenderer.create(
      <StockList ticker={stock.ticker} name={stock.name} />,
    );
    const instance = renderer.root;
    const textElement = instance.findAllByType(Text);
    const ticker = textElement[0].props.children;
    const name = textElement[1].props.children;
    expect(ticker).toBe(stock.ticker);
    expect(name).toBe(stock.name);
  });

  it('Check if stock list component matches the snapshot', () => {
    const stockListRenderer = ReactTestRenderer.create(
      <StockList ticker={stock.ticker} name={stock.name} />,
    );
    const tree = stockListRenderer.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
