import {observer} from 'mobx-react-lite';
import {sized, useTheme, variance} from '../../core';
import {RectButton} from 'react-native-gesture-handler';
import React from 'react';
import {PauseSvg, PlaySvg} from '../../assets/svg/colorless';

type PlayPauseProps = {
  isPlaying: boolean;
  onPlayPress(): void;
  onPausePress(): void;
};
export const PlayPause = observer(
  ({isPlaying, onPlayPress, onPausePress}: PlayPauseProps) => {
    const theme = useTheme();
    const iconColor = theme.palette['color-primary-500'];
    const onPress = isPlaying ? onPausePress : onPlayPress;
    return (
      <RootButton hitSlop={10} onPress={onPress}>
        {isPlaying ? (
          <PauseIcon color={iconColor} />
        ) : (
          <PlayIcon color={iconColor} />
        )}
      </RootButton>
    );
  },
);

const PlayIcon = sized(PlaySvg, 15);
const PauseIcon = sized(PauseSvg, 15);

const RootButton = variance(RectButton)(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20 / 4,
    width: 30,
    height: 30,
    margin: -5,
  },
}));
