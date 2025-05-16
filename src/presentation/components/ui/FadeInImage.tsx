import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  ImageStyle,
  StyleProp,
  View,
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  defaultImage?: any;
}

const fallbackImage = require('../../../assets/images/imagen_rota.jpg');

export const FadeInImage = ({
  uri,
  style,
  defaultImage = fallbackImage,
}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const isDisposed = useRef(false);

  useEffect(() => {
    return () => {
      isDisposed.current = true;
    };
  }, []);

  const onLoadEnd = () => {
    if (isDisposed.current) {
      return;
    }
    fadeIn({});
    setIsLoading(false);
  };

  const onError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}

      <Animated.Image
        source={hasError ? defaultImage : {uri}}
        onLoadEnd={onLoadEnd}
        onError={onError}
        style={[{opacity: animatedOpacity, resizeMode: 'cover'}, style]}
      />
    </View>
  );
};
