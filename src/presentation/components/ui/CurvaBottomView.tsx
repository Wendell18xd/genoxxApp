import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const CurvaBottomView = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const height = 80;

  const adjustedWidth = width + 2;

  return (
    <Svg
      height={height}
      width={adjustedWidth}
      viewBox={`0 0 ${adjustedWidth} ${height}`}
      style={{position: 'absolute', top: 0, left: 0}}>
      <Path
        fill={colors.primary}
        d={`
          M0,0
          H${adjustedWidth}
          V${height * 0.5}
          C${adjustedWidth * 0.66},${height} ${
          adjustedWidth * 0.33
        },${height} 0,${height * 0.5}
          Z
        `}
      />
    </Svg>
  );
};

export default CurvaBottomView;
