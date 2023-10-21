import {useCallback, useLayoutEffect, useState} from 'react';

import {ParamListBase, RouteProp, useRoute} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {action, observable} from 'mobx';

import {batchDisposers, Disposer} from '../structure';

export default (navigation: StackNavigationProp<ParamListBase>) => {
  const route = useRoute<RouteProp<ParamListBase>>();
  const [box] = useState(() =>
    observable.box(true, {name: `${route.name} transition`}),
  );
  useLayoutEffect(() => {
    const onStart = action(() => box.set(true));
    const onEnd = action(() => box.set(false));
    return batchDisposers(
      navigation.addListener('transitionStart', onStart) as Disposer,
      navigation.addListener('transitionEnd', onEnd) as Disposer,
    );
  }, [box, navigation]);
  return useCallback(() => box.get(), [box]);
};
