import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import Header from '..';
import {Image, TextInput} from 'react-native';

const imagePath = '../../../src/assets/images/nasdaq.png';

jest.mock('react-native-config', () => ({
  API_URL: 'https://api.polygon.io/v3/reference/tickers',
  API_KEY: 'WVKkJbUc3M82eMzGr_dV77F4lRfrkBXi',
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Header component renders correctly', () => {
  it('Header component renders correctly', () => {
    const renderer = ReactTestRenderer.create(<Header />);
    const instance = renderer.root;
    const imageElement = instance.findByType(Image);
    const textInputElement = instance.findByType(TextInput);
    const imageSource = imageElement.props.source.testUri;
    const inputPlaceholder = textInputElement.props.placeholder;
    expect(imageSource).toBe(imagePath);
    expect(inputPlaceholder).toBe('Search');
  });

  it('Check if header component matches the snapshot', () => {
    const {toJSON} = ReactTestRenderer.create(<Header />);
    const tree = toJSON();
    expect(tree).toMatchSnapshot();
  });
});
