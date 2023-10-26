import React, {useMemo} from 'react';
import {observer} from 'mobx-react-lite';
import {
  Button,
  IndexPath,
  Input,
  Layout,
  Select,
  SelectItem,
  Text,
} from '@ui-kitten/components';
import {variance} from '../../core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {Gutter, Space} from '../../components/basic';
import {PADDING} from '../constants';
import {Controller, useForm} from 'react-hook-form';
import {sample} from 'lodash';
import {Difficulty, useDifficulty} from '../../useDifficulty';
import {TOPICS} from '../../containers/CreateChatContainer/TOPICS';
import {Language} from '../../core';
import {useStrings} from '../../core/Root/hooks';

export type CreateChatScreenProps = {
  onSubmit(values: CreateChatValues): void;
  isLoading: boolean;
  studiedLanguage: Language;
};

export type CreateChatValues = {
  topic: string;
  difficulty: Difficulty;
  grammarCheck: boolean;
};

export const CreateChatScreen = observer(
  ({onSubmit, isLoading, studiedLanguage}: CreateChatScreenProps) => {
    const strings = useStrings();
    const defaultTopic = useMemo(
      () => sample(TOPICS.get(studiedLanguage)),
      [studiedLanguage],
    );
    const form = useForm<CreateChatValues>({
      defaultValues: {
        topic: defaultTopic,
        difficulty: Difficulty.Light,
        grammarCheck: false,
      },
    });
    const {control, handleSubmit} = form;

    const difficultyValues = useDifficulty();

    return (
      <RootLayout level="4">
        <ContentSafeAreaView edges={['bottom']}>
          <Space>
            <Space gutter={Gutter.Small}>
              <Text category="label">{strings['createChat.topic']}</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {invalid},
                }) => (
                  <Input
                    multiline={true}
                    textStyle={styles.inputTextStyle}
                    placeholder={strings['createChat.topicPlaceholder']}
                    onChangeText={onChange}
                    onBlur={onBlur}
                    value={value}
                    status={invalid ? 'danger' : 'basic'}
                  />
                )}
                name="topic"
              />
            </Space>
            <Space gutter={Gutter.Small}>
              <Text category="label">{strings['createChat.difficulty']}</Text>
              <Controller
                control={control}
                rules={{
                  required: true,
                }}
                render={({
                  field: {onChange, onBlur, value},
                  fieldState: {invalid},
                }) => (
                  <Select
                    status={invalid ? 'danger' : 'basic'}
                    onBlur={onBlur}
                    value={difficultyValues[value]}
                    onSelect={index => onChange((index as IndexPath).row)}>
                    {difficultyValues.map(_ => (
                      <SelectItem key={_} title={_} />
                    ))}
                  </Select>
                )}
                name="difficulty"
              />
            </Space>

            {/*<Controller*/}
            {/*  control={control}*/}
            {/*  render={({field: {onChange, onBlur, value}}) => (*/}
            {/*    <Toggle*/}
            {/*      style={styles.toggle}*/}
            {/*      checked={value}*/}
            {/*      onBlur={onBlur}*/}
            {/*      onChange={onChange}>*/}
            {/*      {strings['createChat.grammarCheck']}*/}
            {/*    </Toggle>*/}
            {/*  )}*/}
            {/*  name="grammarCheck"*/}
            {/*/>*/}
          </Space>
          <ButtonView>
            {isLoading ? (
              <LoadingSpace>
                <ActivityIndicator size="large" />
                <Text category="c1">{strings['createChat.almostDone']}</Text>
              </LoadingSpace>
            ) : (
              <Button size="giant" onPress={handleSubmit(onSubmit)}>
                {strings['createChat.start']}
              </Button>
            )}
          </ButtonView>
        </ContentSafeAreaView>
      </RootLayout>
    );
  },
);

const styles = StyleSheet.create({
  toggle: {
    justifyContent: 'flex-start',
  },
  inputTextStyle: {
    minHeight: 64,
  },
});

const RootLayout = variance(Layout)(() => ({
  root: {
    flex: 1,
  },
}));

const ContentSafeAreaView = variance(SafeAreaView)(() => ({
  root: {
    flex: 1,
    padding: PADDING,
  },
}));

const ButtonView = variance(View)(() => ({
  root: {
    paddingTop: PADDING,
    marginTop: 'auto',
  },
}));

const LoadingSpace = variance(Space)(() => ({
  root: {
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
