import {observer} from 'mobx-react-lite';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import React from 'react';
import {SvgProps} from 'react-native-svg';
import {sized, useTheme, variance} from '../../core';
import {BorderlessButton} from 'react-native-gesture-handler';
import {AngleDownSvg} from '../../assets/svg/colorless';

export type SelectedLanguageProps = {
  Icon: React.ComponentType<SvgProps>;
  label: string;
  second?: boolean;
  onPress(): void;
};

export const SelectedLanguage = observer((props: SelectedLanguageProps) => {
  const {Icon, label, second, onPress} = props;
  const theme = useTheme();
  const color = theme.palette['color-basic-100'];
  return (
    <RootButton second={second} onPress={onPress}>
      <ContentSpace>
        <IconView>
          <Icon />
        </IconView>
        <ValueText category="s1">{label}</ValueText>
      </ContentSpace>
      <View>
        <AngleDownIcon color={color} />
      </View>
    </RootButton>
  );
});

const AngleDownIcon = sized(AngleDownSvg, 30);

const RootButton = variance(BorderlessButton)(theme => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 3,
    backgroundColor: theme.palette['color-success-600'],
  },
  second: {
    backgroundColor: theme.palette['color-primary-500'],
  },
}));

const ContentSpace = variance(View)(() => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
  },
}));

const ValueText = variance(Text)(() => ({
  root: {
    fontSize: 24,
  },
}));

const IconView = variance(View)(() => ({
  root: {
    marginRight: 10,
  },
}));
