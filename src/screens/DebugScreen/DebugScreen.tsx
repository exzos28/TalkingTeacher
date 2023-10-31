import React from 'react';
import {Button} from 'react-native';

import {observer} from 'mobx-react-lite';
import {ScrollView} from 'react-native-gesture-handler';

import AuthSection from './AuthSection';
import LogsSection from './LogsSection';
import SentrySection from './SentrySection';
import {Bubble} from '../../components/basic';
import {Sentry} from '../../core/Sentry';

export type DebugScreenProps = {
  goToLog(): void;
  onDisableDebugPress(): void;
};

export default observer(function DebugScreen({
  goToLog,
  onDisableDebugPress,
}: DebugScreenProps) {
  return (
    <ScrollView>
      <AuthSection />

      <SentrySection />
      <LogsSection onOpenLogsPress={goToLog} />
      <Bubble>
        <Button
          title="Crash!"
          onPress={() => {
            Sentry.captureException(new Error('First error'));
          }}
        />
        <Button
          title="Native crash!"
          onPress={() => {
            Sentry.nativeCrash();
          }}
        />
        <Button title="Disable debug" onPress={onDisableDebugPress} />
      </Bubble>
    </ScrollView>
  );
});
