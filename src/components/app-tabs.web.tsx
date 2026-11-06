import { SymbolView } from 'expo-symbols';
import {
  Tabs,
  TabList,
  TabTrigger,
  TabSlot,
  TabTriggerSlotProps,
  TabListProps,
} from 'expo-router/ui';
import { Pressable, StyleSheet, View } from 'react-native';

import { BrandColors } from '@/constants/theme';

import { ThemedText } from './themed-text';

type TabIconName = {
  ios: 'house' | 'house.fill' | 'bag' | 'bag.fill' | 'person' | 'person.fill';
  android: 'home' | 'storefront' | 'person';
  web: 'home' | 'shopping_bag' | 'person';
};

const tabs = [
  {
    name: 'home',
    href: '/(tabs)',
    label: 'Accueil',
    icon: { ios: 'house', android: 'home', web: 'home' },
    activeIcon: { ios: 'house.fill', android: 'home', web: 'home' },
  },
  {
    name: 'boutique',
    href: '/(tabs)/boutique',
    label: 'Boutique',
    icon: { ios: 'bag', android: 'storefront', web: 'shopping_bag' },
    activeIcon: { ios: 'bag.fill', android: 'storefront', web: 'shopping_bag' },
  },
  {
    name: 'profil',
    href: '/(tabs)/profil',
    label: 'Profil',
    icon: { ios: 'person', android: 'person', web: 'person' },
    activeIcon: { ios: 'person.fill', android: 'person', web: 'person' },
  },
] as const;

export default function AppTabs() {
  return (
    <Tabs>
      <TabSlot style={{ height: '100%' }} />
      <TabList asChild>
        <CustomTabList>
          {tabs.map(({ name, href, label, icon, activeIcon }) => (
            <TabTrigger key={name} name={name} href={href} asChild>
              <TabButton icon={icon} activeIcon={activeIcon} label={label} />
            </TabTrigger>
          ))}
        </CustomTabList>
      </TabList>
    </Tabs>
  );
}

export function TabButton({
  label,
  icon,
  activeIcon,
  isFocused,
  ...props
}: TabTriggerSlotProps & {
  label: string;
  icon: TabIconName;
  activeIcon: TabIconName;
}) {
  const pressableProps = props as Record<string, unknown>;
  const iconColor = isFocused ? BrandColors.copper : BrandColors.charcoal;
  const labelColor = isFocused ? BrandColors.copper : BrandColors.charcoal;

  return (
    <Pressable {...pressableProps} style={({ pressed }) => [styles.tabButton, pressed && styles.pressed]}>
      <View style={styles.tabButtonView}>
        <SymbolView
          name={isFocused ? activeIcon : icon}
          size={20}
          tintColor={iconColor}
        />
        <ThemedText type="small" themeColor={isFocused ? 'text' : 'textSecondary'} style={[styles.labelText, { color: labelColor }] }>
          {label}
        </ThemedText>
      </View>
    </Pressable>
  );
}

export function CustomTabList(props: TabListProps) {
  return (
    <View {...props} style={styles.tabListContainer}>
      <View style={styles.innerContainer}>{props.children}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabListContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 18,
    paddingHorizontal: 18,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  innerContainer: {
    width: '100%',
    maxWidth: 520,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 28,
    backgroundColor: 'transparent',
    gap: 8,
  },
  pressed: {
    opacity: 0.75,
  },
  tabButton: {
    flex: 1,
  },
  tabButtonView: {
    minHeight: 58,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 10,
    gap: 4,
  },
  labelText: {
    fontSize: 11,
    fontWeight: '700',
  },
});