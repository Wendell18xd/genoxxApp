import {useEffect, useRef, useState} from 'react';
import {
  ActivityIndicator,
  Animated,
  Image,
  ImageStyle,
  ScrollView,
  StyleProp,
  useWindowDimensions,
  View,
} from 'react-native';
import {useAnimation} from '../../hooks/useAnimation';

interface Props {
  uri: string;
  style?: StyleProp<ImageStyle>;
  defaultImage?: any;
  isZoom?: boolean;
  restaPadding?: number;
}

const fallbackImage = require('../../../assets/images/imagen_rota.jpg');

export const FadeInImage = ({
  uri,
  style,
  defaultImage = fallbackImage,
  isZoom = false,
  restaPadding = 0,
}: Props) => {
  const {animatedOpacity, fadeIn} = useAnimation();
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  const isDisposed = useRef(false);
  const {width: screenWidth} = useWindowDimensions();

  useEffect(() => {
    // Obtener tamaño real de la imagen
    Image.getSize(
      uri,
      (originalWidth, originalHeight) => {
        const aspectRatio = originalHeight / originalWidth;
        const calculatedHeight = screenWidth * aspectRatio;
        setImageHeight(calculatedHeight - restaPadding * 2);
      },
      () => {
        setHasError(true);
        setImageHeight(200); // fallback height
      },
    );

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

  const imageComponent = (
    <Animated.Image
      source={hasError ? defaultImage : {uri}}
      onLoadEnd={onLoadEnd}
      onError={onError}
      style={[
        {
          opacity: animatedOpacity,
          height: imageHeight ?? 200,
          resizeMode: 'cover',
        },
        style,
      ]}
    />
  );

  return (
    <View style={{justifyContent: 'center', alignItems: 'center'}}>
      {isLoading && (
        <ActivityIndicator
          style={{position: 'absolute'}}
          color="grey"
          size={30}
        />
      )}
      {imageHeight &&
        (isZoom ? (
          <ScrollView
            horizontal
            maximumZoomScale={3}
            minimumZoomScale={1}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
            centerContent
            bouncesZoom>
            {imageComponent}
          </ScrollView>
        ) : (
          imageComponent
        ))}
    </View>
  );
};
