import prompt, { PromptOptions } from 'react-native-prompt-android';

type PromptButton = {
  text?: string;
  onPress?: (message: string) => void;

  /** @platform ios */
  style?: 'default' | 'cancel' | 'destructive';
};

interface Options {
  title?: string;
  message?: string;
  callbackOrButtons?: ((value: string) => void) | Array<PromptButton>;
  options?: PromptOptions;
}

export const showPromt = ({
  title = '',
  message = '',
  callbackOrButtons,
  options,
}: Options): void => {
  prompt(title, message, callbackOrButtons, options);
};
