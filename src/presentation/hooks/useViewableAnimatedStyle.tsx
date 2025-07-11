import {ViewToken} from 'react-native';
import {
  SharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

export function useViewableAnimatedStyle<T extends {[key: string]: any}>(
  viewableItems: SharedValue<ViewToken<T>[]>,
  itemKey: keyof T,
  item: T,
  options?: {
    scaleIn?: number;
    scaleOut?: number;
    opacityIn?: number;
    opacityOut?: number;
    duration?: number;
  },
) {
  const {
    scaleIn = 1,
    scaleOut = 0.6,
    opacityIn = 1,
    opacityOut = 0,
    duration = 300,
  } = options || {};

  const rStyle = useAnimatedStyle(() => {
    const isVisible = !!viewableItems.value
      .filter(v => v.isViewable)
      .find(v => v.item[itemKey] === item[itemKey]);

    return {
      opacity: withTiming(isVisible ? opacityIn : opacityOut, {duration}),
      transform: [
        {
          scale: withTiming(isVisible ? scaleIn : scaleOut, {duration}),
        },
      ],
    };
  }, [viewableItems, item[itemKey]]);

  return rStyle;
}
