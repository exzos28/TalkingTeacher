import {useCallback, useEffect, useRef, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {
  action,
  comparer,
  observable,
  onBecomeObserved,
  onBecomeUnobserved,
} from 'mobx';

import {batchDisposers, Disposer} from '../structure';

export default function useNavigationGetIsFocused() {
  const navigation = useNavigation();
  const route = useRoute();
  const disposer = useRef<Disposer>();
  const [isFocusedBox] = useState(() => {
    const box = observable.box(navigation.isFocused(), {
      name: `${route.name}#${route.key} focus`,
      deep: false,
      equals: comparer.identity,
      proxy: false,
      autoBind: false,
    });
    const listener = action(() => box.set(navigation.isFocused()));
    disposer.current = batchDisposers(
      onBecomeObserved(box, () => {
        navigation.addListener('focus', listener);
        navigation.addListener('blur', listener);
      }) as Disposer,
      onBecomeUnobserved(box, () => {
        navigation.removeListener('focus', listener);
        navigation.removeListener('blur', listener);
      }) as Disposer,
    );
    return box;
  });
  useEffect(() => disposer.current, []);
  return useCallback(() => isFocusedBox.get(), [isFocusedBox]);
}
