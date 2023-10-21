import React from 'react';
import {observer} from 'mobx-react-lite';
import {PickLanguageScreen} from '../screens/PickLanguageScreen';
import {PickLanguageScreenProps} from '../screens/PickLanguageScreen/PickLanguageScreen';

export const PickLanguageContainer = observer(
  (props: PickLanguageScreenProps) => {
    return <PickLanguageScreen {...props} />;
  },
);
