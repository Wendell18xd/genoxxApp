import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const CurvaBottomView = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();

  return (
    <Svg
      height={40}
      width={width}
      viewBox={`0 0 ${width} 40`}
      style={{position: 'absolute', top: 0, left: 0}}>
      <Path
        fill={colors.primary}
        d={`
          M0,0
          H${width}
          V20
          C${width * 0.66},40 ${width * 0.33},40 0,20
          Z
        `}
      />
    </Svg>
  );
};

export default CurvaBottomView;
