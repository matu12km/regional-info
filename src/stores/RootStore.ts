import { createContext, useContext } from 'react';
import { useLocalStore } from 'mobx-react-lite';

import { BugStore } from './BugStore';
import { ComplaintStore } from './ComplaintStore';
import { ThemeStore } from './ThemeStore';
import { EditorStateStore } from './EditorStateStore';
import { ImagesStore } from './ImagesStore';

export const RootStore = () => {
  return {
    bugStore: useLocalStore(BugStore),
    themeStore: useLocalStore(ThemeStore),
    imagesStore: useLocalStore(ImagesStore),
    complaintStore: useLocalStore(ComplaintStore),
    editorStateStore: useLocalStore(EditorStateStore),
  };
};

export type RootStoreT = ReturnType<typeof RootStore>;
