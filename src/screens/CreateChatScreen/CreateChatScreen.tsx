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
  Toggle,
} from '@ui-kitten/components';
import {variance} from '../../core';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet, View} from 'react-native';
import {Gutter, Space} from '../../components/basic';
import {PADDING} from '../constants';
import {Controller, useForm} from 'react-hook-form';
import {sample} from 'lodash';
import {TOPICS} from '../../DATA';
import {Locale} from '../../core/Localization';
import {useDifficulty} from '../../useDifficulty';

export type CreateChatScreenProps = {
  onSubmit(values: CreateChatValues): void;
};

export type CreateChatValues = {
  topic: string;
  difficulty: number;
  grammarCheck: boolean;
};

export const CreateChatScreen = observer(
  ({onSubmit}: CreateChatScreenProps) => {
    const defaultTopic = useMemo(() => sample(TOPICS.get(Locale.Russian)), []);
    const form = useForm<CreateChatValues>({
      defaultValues: {
        topic: defaultTopic,
        difficulty: 1,
        grammarCheck: true,
      },
    });
    const {control, handleSubmit} = form;

    const difficultyValues = useDifficulty();

    return (
      <RootLayout level="4">
        <ContentSafeAreaView edges={['bottom']}>
          <Space>
            <Space gutter={Gutter.Small}>
              <Text category="label">Topic:</Text>
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
                    placeholder="The topic you want to talk about"
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
              <Text category="label">Difficulty of speech:</Text>
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

            <Controller
              control={control}
              render={({field: {onChange, onBlur, value}}) => (
                <Toggle
                  style={styles.toggle}
                  checked={value}
                  onBlur={onBlur}
                  onChange={onChange}>
                  Grammar check
                </Toggle>
              )}
              name="grammarCheck"
            />
          </Space>
          <ButtonView>
            <Button size="giant" onPress={handleSubmit(onSubmit)}>
              Start!
            </Button>
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
