import type { IconProps } from '@tamagui/helpers-icon';
import React, { forwardRef } from 'react';
import { styled, View, TamaguiElement } from 'tamagui';
import { Input as TamaguiInput, ViewProps } from 'tamagui';

type InputProps = {
  variant?: 'default' | 'outlined';
  Icon?: React.NamedExoticComponent<IconProps>;
  iconColor?: string;
  container?: ViewProps;
} & React.ComponentProps<typeof TamaguiInput>;

const StyledInputWrapper = styled(View, {
  name: 'InputWrapper',
  variants: {
    variant: {
      default: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '$background',
        borderColor: '$gray5',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50
      },
      outlined: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderColor: '$gray500',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default'
  }
});

const StyledInput = styled(TamaguiInput, {
  name: 'MyInput',

  variants: {
    variant: {
      default: {
        borderWidth: 0,
        backgroundColor: '$background',
        color: '$color',
        placeholderTextColor: 'gray',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 48,
        fontSize: 16
      },
      outlined: {
        borderWidth: 0,
        backgroundColor: 'transparent',
        placeholderTextColor: '$gray300',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 48,
        fontSize: 16
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default'
  }
});

export const Input = forwardRef<TamaguiElement, InputProps>(
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  ({ variant = 'default', Icon, iconColor = '$primary500', container, ...props }, ref) => {
    return (
      <StyledInputWrapper variant={variant} {...container}>
        {Icon && <Icon size={20} color={iconColor} style={{ marginRight: 10 }} />}
        <StyledInput variant={variant} flex={1} paddingLeft={Icon ? 10 : 0} {...props} />
      </StyledInputWrapper>
    );
  }
);

Input.displayName = 'Input';
