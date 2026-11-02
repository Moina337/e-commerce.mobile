import { Pressable, StyleSheet, Text, type PressableProps, type StyleProp, type ViewStyle } from 'react-native';
import { BrandColors, BrandFonts } from '@/constants/theme'; // Ajustez le chemin d'import si nécessaire

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

// Couleurs de texte mappées sur vos BrandColors
const textColors = {
  primary: { color: BrandColors.charcoal },
  secondary: { color: BrandColors.white },
  ghost: { color: BrandColors.charcoal },
};

const styles = StyleSheet.create({
  base: {
    alignSelf: 'flex-start',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  primary: {
    backgroundColor: BrandColors.sand, // Utilise votre couleur #D6C7B4 au lieu de l'ancien hexadécimal
  },
  secondary: {
    backgroundColor: BrandColors.charcoal,
  },
  ghost: {
    backgroundColor: 'transparent',
    borderColor: BrandColors.line,
  },
  fullWidth: {
    alignSelf: 'stretch',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledLabel: {
    color: BrandColors.slate, // Utilise votre couleur grise pour l'état désactivé
  },
  pressed: {
    opacity: 0.7,
  },
  label: {
    fontWeight: '700',
    fontSize: 13,
    fontFamily: BrandFonts.display, // Connecté à votre police 'Manrope'
    textAlign: 'center',
  },
});
