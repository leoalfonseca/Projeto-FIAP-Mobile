import React, { forwardRef } from 'react';
import { styled, TamaguiElement, Button as TamaguiButton, Spinner, SizableText } from 'tamagui';

type VariantType = 'default' | 'outlined' | undefined;
type ButtonProps = {
  variant?: 'default' | 'outlined';
  loading?: boolean;
} & React.ComponentProps<typeof TamaguiButton>;

const StyledButtonWrapper = styled(TamaguiButton, {
  name: 'MyButton',

  variants: {
    variant: {
      default: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '$primary500',
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50
      },
      outlined: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderColor: '$primary500',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 16,
        height: 50
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default'
  }
});

const StyledButtonText = styled(SizableText, {
  name: 'ButtonText',

  variants: {
    variant: {
      default: {
        color: 'white',
        fontSize: 16,
        fontWeight: '600'
      },
      outlined: {
        color: '$primary500',
        fontSize: 16,
        fontWeight: '600',
        textTransform: 'uppercase'
      }
    }
  } as const,

  defaultVariants: {
    variant: 'default'
  }
});

export const Button = forwardRef<TamaguiElement, ButtonProps>(
  ({ variant = 'default', loading = false, children, color, ...props }, ref) => {
    const textColor = variant === 'outlined' ? '$primary500' : 'white';

    return (
      <StyledButtonWrapper variant={variant as VariantType} disabled={loading} ref={ref} {...props}>
        {loading ? (
          <Spinner size="small" color={textColor} />
        ) : (
          <StyledButtonText variant={variant as VariantType} color={color}>
            {children}
          </StyledButtonText>
        )}
      </StyledButtonWrapper>
    );
  }
);

Button.displayName = 'Button';
