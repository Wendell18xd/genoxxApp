import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const CurvaView = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();

  return (
    <Svg
      height={40}
      width={width}
      viewBox={`0 0 ${width} 40`}
      style={{position: 'absolute', bottom: 0, left: 0}}>
      <Path
        fill={colors.background}
        d={`
          M0,40
          C${width * 0.33},0 ${width * 0.66},0 ${width},40
          L${width},40
          L0,40
          Z
        `}
      />
    </Svg>
  );
};

export default CurvaView;
