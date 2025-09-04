import { createTokens } from 'tamagui';

const tokens = createTokens({
  color: {
    primary50: '#bde8ef',
    primary100: '#85bdc6',
    primary200: '#64a3af',
    primary300: '#3f8e9e',
    primary400: '#237c8e',
    primary500: '#004D61',
    primary600: '#13414c',
    primary700: '#003c49',
    primary800: '#003c49',
    primary900: '#003c49',

    secondary100: '#c9f4c1',
    secondary200: '#a0e293',
    secondary300: '#89d67a',
    secondary400: '#68c157',
    secondary500: '#46A135',
    secondary600: '#2a771b',
    secondary700: '#2a771b',
    secondary800: '#0c3f01',
    secondary900: '#0c3f01',

    gray100: '#F3FAFD',
    gray200: '#F5FCFF',
    gray300: '#EAEAEA',
    gray400: '#DCDCDC',
    gray500: '#C8C8C8',
    gray600: '#9E9E9E',
    gray700: '#767676',
    gray800: '#333333',
    gray900: '#252525',

    red100: '#FEE2E2',
    red200: '#FECACA',
    red300: '#FCA5A5',
    red400: '#F87171',
    red500: '#EF4444',
    red600: '#DC2626',
    red700: '#B91C1C',
    red800: '#991B1B',
    red900: '#7F1D1D',

    green100: '#DCFCE7',
    green200: '#BBF7D0',
    green300: '#86EFAC',
    green400: '#4ADE80',
    green500: '#22C55E',
    green600: '#16A34A',
    green700: '#15803D',
    green800: '#166534',
    green900: '#14532D',

    blue100: '#DBEAFE',
    blue200: '#BFDBFE',
    blue300: '#93C5FD',
    blue400: '#60A5FA',
    blue500: '#3B82F6',
    blue600: '#2563EB',
    blue700: '#1D4ED8',
    blue800: '#1E40AF',
    blue900: '#1E3A8A',

    background: '#fff'
  }
});

const system = {
  tokens,
  themes: {
    will: {
      bg: '$background',
      bgHover: '$primary200',
      bgPress: '$primary300',
      color: '$primary600',
      borderColor: '$primary700',

      secondaryBg: '$secondary100',
      secondaryColor: '$secondary700',
      secondaryBorder: '$secondary500',

      radii: '$sm',

      primarySolid: '$primary600',
      primaryContrast: '$white',
      primaryFg: '$primary700',
      primaryMuted: '$primary100',
      primarySubtle: '$primary200',
      primaryEmphasized: '$primary300',
      primaryFocusRing: '$primary700',

      secondarySolid: '$secondary500',
      secondaryContrast: '$secondary100',
      secondaryFg: '$secondary700',
      secondaryMuted: '$secondary100',
      secondarySubtle: '$secondary200',
      secondaryEmphasized: '$secondary300',
      secondaryFocusRing: '$secondary500'
    }
  }
};

export { system };
