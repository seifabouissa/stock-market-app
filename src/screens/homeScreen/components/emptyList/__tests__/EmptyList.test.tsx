import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import {Text} from 'react-native';
import EmptyList from '..';

describe('Empty list component renders correctly', () => {
  it('Empty list component renders correctly', () => {
    ReactTestRenderer.create(<EmptyList />);
  });
});

describe('No stocks found text renders correctly', () => {
  it('No stocks found text renders correctly', () => {
    const renderer = ReactTestRenderer.create(<EmptyList />);
    const instance = renderer.root;
    const textElement = instance.findByType(Text);
    expect(textElement.props.children).toBe('No stocks found');
  });
});
