import { Text, View } from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';

type BrandLogoProps = {
  text?: string;
  size?: number;
  showMark?: boolean;
};

export function BrandLogo({ text = 'KOCHILUX', size = 26, showMark = false }: BrandLogoProps) {
  const normalizedText = text.toUpperCase();
  const hasLuxAccent = normalizedText.includes('LUX');
  const luxText = hasLuxAccent ? 'LUX' : '';
  const prefixText = hasLuxAccent ? normalizedText.slice(0, -luxText.length) : normalizedText;

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {showMark ? (
        <View
          style={{
            width: size * 0.8,
            height: size * 0.8,
            borderRadius: (size * 0.8) / 2,
            backgroundColor: BrandColors.black,
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: 8,
          }}
        >
          <Text
            style={{
              color: BrandColors.white,
              fontSize: size * 0.42,
              fontWeight: '800',
              fontFamily: BrandFonts.display,
              lineHeight: size * 0.42,
            }}
          >
            K
          </Text>
        </View>
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        {hasLuxAccent ? (
          <>
            <Text
              style={{
                fontSize: size,
                fontWeight: '800',
                color: BrandColors.black,
                fontFamily: BrandFonts.display,
                letterSpacing: 0.5,
              }}
            >
              {prefixText}
            </Text>
            <Text
              style={{
                fontSize: size,
                fontWeight: '800',
                color: BrandColors.copper,
                fontFamily: BrandFonts.display,
                letterSpacing: 0.5,
              }}
            >
              {luxText}
            </Text>
          </>
        ) : (
          <Text
            style={{
              fontSize: size,
              fontWeight: '800',
              color: BrandColors.black,
              fontFamily: BrandFonts.display,
              letterSpacing: 0.5,
            }}
          >
            {normalizedText}
          </Text>
        )}
      </View>
    </View>
  );
}
