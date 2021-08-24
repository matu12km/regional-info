import React, { useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';
import { RootStore, RootStoreT } from '../stores/RootStore';

import { ChakraProvider } from '@chakra-ui/react';
import { observer } from 'mobx-react-lite';

export const StoreContext = React.createContext({} as RootStoreT);

export const StoreProvider: React.FC = ({ children }) => {
  const store = useLocalStore(RootStore);

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

// simplifies imports
export const useStore = () => {
  return useContext(StoreContext);
};

export const MuiThemeContext = React.createContext({});

export const MuiThemeProvider: React.FC = observer(({ children }) => {
  const { themeStore } = useStore();

  return <ChakraProvider theme={themeStore.theme}>{children}</ChakraProvider>;
});
