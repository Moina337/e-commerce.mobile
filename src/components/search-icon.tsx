import { Text } from 'react-native';
import type { StyleProp, TextStyle } from 'react-native';

type SearchIconProps = {
  size?: number;
  color?: string;
  style?: StyleProp<TextStyle>;
};

export function SearchIcon({ size = 20, color = '#000000', style }: SearchIconProps) {
  return (
    <Text style={[{ fontSize: size, color, lineHeight: size + 4 }, style]} allowFontScaling={false}>
      ⌕
    </Text>
  );
}
