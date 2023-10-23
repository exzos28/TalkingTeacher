import React from 'react';
import {observer} from 'mobx-react-lite';
import {variance} from '../../core';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {PADDING} from '../constants';
import LottieView from 'lottie-react-native';
import {Text} from '@ui-kitten/components';
import {StyleSheet} from 'react-native';
import {useStrings} from '../../core/Root/hooks';

export type HoldSpeechButtonProps = {
  isSpeaking: boolean;
  onSpeechStartPress(): void;
  onSpeechFinishPress(): void;
};

export const HoldSpeechButton = observer(
  ({
    isSpeaking,
    onSpeechStartPress,
    onSpeechFinishPress,
  }: HoldSpeechButtonProps) => {
    const strings = useStrings();
    return (
      <ContentButton
        pressed={isSpeaking}
        onPressIn={onSpeechStartPress}
        onPressOut={onSpeechFinishPress}>
        {isSpeaking ? (
          <Animation />
        ) : (
          <ButtonText category="c2">{strings['chat.holdTalk']}</ButtonText>
        )}
      </ContentButton>
    );
  },
);

const ANIMATION_SIZE = 150;

const Animation = () => (
  <LottieView
    progress={20}
    autoPlay
    style={styles.lottie}
    source={require('../../assets/lottie/audio-wave.json')}
  />
);
const styles = StyleSheet.create({
  lottie: {
    height: ANIMATION_SIZE,
    width: 300,
    marginVertical: -(ANIMATION_SIZE / 2.6),
  },
});

const ContentButton = variance(TouchableWithoutFeedback)(theme => ({
  root: {
    borderRadius: 5,
    height: 70,
    padding: PADDING,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.palette['color-primary-500'],
  },
  pressed: {
    backgroundColor: theme.palette['color-primary-hover'],
  },
}));

const ButtonText = variance(Text)(theme => ({
  root: {
    color: theme.palette['color-basic-400'],
    fontSize: 17,
  },
}));
