import { Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';

type BrandLogoProps = {
  text?: string;
  size?: number;
  showMark?: boolean;
};

export function BrandLogo({ text = 'AMIR2X', size = 26, showMark = false }: BrandLogoProps) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {showMark ? (
        <View
          style={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: (size * 0.8) / 2,
            backgroundColor: BrandColors.charcoal,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: BrandColors.white,
              fontSize: size * 0.45,
              fontWeight: '800',
              fontFamily: BrandFonts.display,
              lineHeight: size * 0.45,
            }}
          >
            A
          </Text>
        </View>
      ) : null}
      <Text
        style={{
          fontSize: size,
          fontWeight: '800',
          color: BrandColors.charcoal,
          fontFamily: BrandFonts.display,
          letterSpacing: 0.5,
        }}
      >
        {text}
      </Text>
    </View>
  );
}
