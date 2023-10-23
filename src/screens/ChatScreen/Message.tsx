import React from 'react';
import {observer} from 'mobx-react-lite';
import {variance} from '../../core';
import {View} from 'react-native';
import {Text} from '@ui-kitten/components';
import {useRoot} from '../../core/Root/hooks';
import {PlayPause} from './PlayPauseButton';
import {PADDING} from '../constants';

export type MessageProps = {
  playPossible: boolean;
  isPlaying: boolean;
  inverted: boolean;
  text: string;
  onPlayPress(): void;
  onPausePress(): void;
};

export const Message = observer(
  ({
    inverted,
    playPossible,
    isPlaying,
    text,
    onPlayPress,
    onPausePress,
  }: MessageProps) => {
    const {windowDimensionsState} = useRoot();
    const width = windowDimensionsState.window.width;
    return (
      <ContainerView>
        <RootView style={{maxWidth: width * 0.8}} inverted={inverted}>
          <ContentView inverted={inverted}>
            <TextView>
              <Text>{text}</Text>
            </TextView>
            {playPossible && (
              <PlayView>
                <PlayPause
                  onPlayPress={onPlayPress}
                  onPausePress={onPausePress}
                  isPlaying={isPlaying}
                />
              </PlayView>
            )}
          </ContentView>
        </RootView>
      </ContainerView>
    );
  },
);

const ContainerView = variance(View)(() => ({
  root: {
    paddingVertical: PADDING / 2,
    paddingHorizontal: PADDING,
  },
}));

const RootView = variance(View)(() => ({
  root: {
    alignSelf: 'flex-start',
  },
  inverted: {
    alignSelf: 'flex-end',
  },
}));

const ContentView = variance(View)(theme => ({
  root: {
    borderRadius: 5,
    backgroundColor: theme.palette['background-basic-color-1'],
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.palette['border-basic-color-2'],
  },
  inverted: {
    flexDirection: 'row-reverse',
  },
}));

const TextView = variance(View)(() => ({
  root: {
    flexShrink: 1,
  },
}));

const PlayView = variance(View)(() => ({
  root: {
    alignSelf: 'flex-end',
  },
}));
