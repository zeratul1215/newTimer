import React, { useContext } from 'react';
import { noop } from '@linktivity/link-utils';

export interface BaseContextProps {
  openMenu: boolean;
  setOpenMenu: React.Dispatch<React.SetStateAction<boolean>>;
}

const defaultContext = {
  openMenu: false,
  setOpenMenu: noop
};

export const BaseContext =
  React.createContext<BaseContextProps>(defaultContext);

export const useBaseContext = () => useContext(BaseContext);
