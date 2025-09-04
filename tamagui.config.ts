import { createAnimations } from '@tamagui/animations-react-native';
import { AnimationDriver, createFont } from '@tamagui/core';
import { tokens } from '@tamagui/themes';
import { themes } from '@tamagui/themes';
import { createTamagui } from 'tamagui';
import { system } from './system';


const montserratFont = createFont({
  family: 'Montserrat',
  size: {
    1: 14,
    2: 16,
    3: 18,
    4: 20
  },
  lineHeight: {
    1: 18,
    2: 22,
    3: 26,
    4: 30
  },
  weight: {
    1: '400',
    2: '600',
    3: '700'
  },
  letterSpacing: {
    1: 0,
    2: 0,
    3: 0
  }
});

const config = createTamagui({
  tokens: { ...tokens, ...system.tokens },
  themes: { ...themes, ...system.themes },
  animations: createAnimations({
    quick: { type: 'timing', duration: 150 },
    quicker: { type: 'timing', duration: 80 },
    bouncy: { type: 'spring', damping: 10, mass: 1.2, stiffness: 150 }
  }) as AnimationDriver<any>,
  shorthands: {
    p: 'padding',
    m: 'margin',
    bg: 'backgroundColor'
  },
  defaultFont: 'body',
  fonts: {
    body: montserratFont,
    heading: montserratFont
  }
});

export type Conf = typeof config;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends Conf {}
}

export default config;
