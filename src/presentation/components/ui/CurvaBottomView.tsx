import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

const CurvaBottomView = () => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const height = 80; // más altura para que se note más la curva

  return (
    <Svg
      height={height}
      width={width}
      viewBox={`0 0 ${width} ${height}`}
      style={{position: 'absolute', top: 0, left: 0}}>
      <Path
        fill={colors.primary}
        d={`
          M0,0
          H${width}
          V${height * 0.5}
          C${width * 0.66},${height} ${width * 0.33},${height} 0,${height * 0.5}
          Z
        `}
      />
    </Svg>
  );
};

export default CurvaBottomView;
