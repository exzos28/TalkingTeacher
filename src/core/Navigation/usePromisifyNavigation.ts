import {useCallback, useEffect, useRef} from 'react';

import {RouteProp} from '@react-navigation/core/src/types';
import {ParamListBase, useNavigation, useRoute} from '@react-navigation/native';

type PromiseResolve<R> = (_: R | undefined) => void;

export default function usePromisifyNavigation<
  R extends RouteProp<ParamListBase>,
>(navigate: () => void) {
  const navigation = useNavigation();
  const route = useRoute<R>();
  const promiseResolveRef = useRef<PromiseResolve<R['params']>>();
  useEffect(
    () =>
      navigation.addListener('focus', () => {
        if (promiseResolveRef.current === undefined) {
          return;
        }
        const params = route.params;
        navigation.setParams(undefined);
        if (params) {
          promiseResolveRef.current(params);
        } else {
          promiseResolveRef.current(undefined);
        }
        promiseResolveRef.current = undefined;
      }),
    [navigation, route.params],
  );

  const promisifyNavigate = useCallback((): Promise<R['params']> => {
    navigate();
    return new Promise((resolve: PromiseResolve<R['params']>) => {
      promiseResolveRef.current = resolve;
    }) as Promise<R['params']>;
  }, [navigate]);

  return {promisifyNavigate};
}
