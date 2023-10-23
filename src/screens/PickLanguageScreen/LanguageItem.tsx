import React from 'react';
import {View} from 'react-native';
import {observer} from 'mobx-react-lite';
import {sized, useTheme, variance} from '../../core';
import {Text} from '@ui-kitten/components';
import {SvgProps} from 'react-native-svg';
import {RippleButton} from '../../components/RippleButton';
import {CheckSvg} from '../../assets/svg/colorless';
import {Language} from '../../core/Language';

export type ListItem = {
  Icon: React.ComponentType<SvgProps>;
  text: string;
  value: Language;
};

export type LanguageSettingsScreenItemProps = {
  item: ListItem;
  onPress: () => void;
  selected: boolean;
};

export default observer(function LanguageItem({
  item,
  onPress,
  selected,
}: LanguageSettingsScreenItemProps) {
  const Icon = item.Icon;
  const theme = useTheme();
  return (
    <Root onPress={onPress}>
      <Icon width={30} height={22} />
      <LanguageText selected={selected}>{item.text}</LanguageText>
      <CheckIconView>
        {selected && <CheckIcon color={theme.palette['color-primary-400']} />}
      </CheckIconView>
    </Root>
  );
});

const CheckIcon = sized(CheckSvg, 20);

const Root = variance(RippleButton)(() => ({
  root: {
    height: 70,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
}));

const LanguageText = variance(Text)(theme => ({
  root: {
    fontSize: 20,
    marginLeft: 15,
    color: theme.palette['text-basic-color'],
  },
  selected: {
    color: theme.palette['color-primary-400'],
  },
}));

const CheckIconView = variance(View)(() => ({
  root: {
    marginLeft: 'auto',
  },
}));
