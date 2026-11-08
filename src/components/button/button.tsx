import {
  Pressable,
  StyleSheet,
  Text,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { BrandColors, BrandFonts } from '@/constants/theme';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

type ButtonProps = PressableProps & {
  title: string;
  variant?: ButtonVariant;
  fullWidth?: boolean;
  style?: StyleProp<ViewStyle>;
};

export function Button({
  title,
  variant = 'primary',
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        styles[variant],
        fullWidth && styles.fullWidth,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...props}
    >
      <Text style={[styles.label, textColors[variant], disabled && styles.disabledLabel]}>
        {title}
      </Text>
    </Pressable>
  );
}

const textColors = {
  primary: { color: BrandColors.white },
  secondary: { color: BrandColors.white },
  ghost: { color: BrandColors.copper },
} as const;

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primary: {
    backgroundColor: BrandColors.copper,
  },
  secondary: {
    backgroundColor: BrandColors.copper,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: BrandColors.copper,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: BrandColors.slate,
  },
  pressed: {
    opacity: 0.8,
  },
  label: {
    fontWeight: '700',
    fontSize: 13,
    fontFamily: BrandFonts.display,
    textAlign: 'center',
    letterSpacing: 0.6,
  },
});
