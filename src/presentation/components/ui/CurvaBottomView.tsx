import {useWindowDimensions} from 'react-native';
import {useTheme} from 'react-native-paper';
import Svg, {Path} from 'react-native-svg';

interface Props {
  height?: number;
}

const CurvaBottomView = ({height = 80}: Props) => {
  const {colors} = useTheme();
  const {width} = useWindowDimensions();
  const altura = height;

  const adjustedWidth = width + 2;

  return (
    <Svg
      height={altura}
      width={adjustedWidth}
      viewBox={`0 0 ${adjustedWidth} ${altura}`}
      style={{position: 'relative', top: -1, left: 0}}>
      <Path
        fill={colors.primary}
        d={`
          M0,0
          H${adjustedWidth}
          V${altura * 0.5}
          C${adjustedWidth * 0.66},${altura} ${
          adjustedWidth * 0.33
        },${altura} 0,${altura * 0.5}
          Z
        `}
      />
    </Svg>
  );
};

export default CurvaBottomView;
