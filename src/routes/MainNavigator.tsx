import React, {FC} from 'react';
import {UseStocksStore} from '../store/stocks';
import HomeNavigator from './HomeNavigator';

const MainNavigator: FC = (): JSX.Element => {
  const {appHasHydrated} = UseStocksStore(state => ({
    appHasHydrated: state.appHasHydrated,
  }));

  const navigatorHandler = () => {
    if (appHasHydrated) {
      return <HomeNavigator />;
    }
  };

  return navigatorHandler()!;
};

export default MainNavigator;
