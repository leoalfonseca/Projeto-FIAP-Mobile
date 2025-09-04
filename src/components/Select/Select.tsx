import type { IconProps } from '@tamagui/helpers-icon';
import React, { forwardRef } from 'react';
import { styled, View, TamaguiElement } from 'tamagui';
import { Select as TamaguiSelect, SelectProps as TamaguiSelectProps, Adapt, Sheet } from 'tamagui';

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  variant?: 'default' | 'outlined';
  Icon?: React.NamedExoticComponent<IconProps>;
  iconColor?: string;
  iconAfter?: React.NamedExoticComponent<IconProps>;
  placeholder?: string;
  options: Option[];
} & Omit<TamaguiSelectProps, 'children' | 'ref'>;

const StyledSelectWrapper = styled(View, {
  name: 'SelectWrapper',
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
        borderColor: '$gray300',
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

const StyledSelectTrigger = styled(TamaguiSelect.Trigger, {
  name: 'SelectTrigger',
  variants: {
    variant: {
      default: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0,
        backgroundColor: '$background',
        color: '$color',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 16
      },
      outlined: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderWidth: 0,
        backgroundColor: 'transparent',
        color: '$gray300',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,
        fontSize: 16
      }
    }
  } as const,
  defaultVariants: {
    variant: 'default'
  }
});

export const Select = forwardRef<TamaguiElement, SelectProps>(
  (
    {
      variant = 'default',
      Icon,
      iconColor = '$primary500',
      iconAfter: IconAfter,
      placeholder,
      options,
      ...props
    },
    ref
  ) => {
    return (
      <StyledSelectWrapper variant={variant}>
        {Icon && <Icon size={20} color={iconColor} style={{ marginRight: 10 }} />}
        <TamaguiSelect {...props}>
          <StyledSelectTrigger variant={variant} ref={ref}>
            <TamaguiSelect.Value placeholder={placeholder} />
            {IconAfter && (
              <View style={{ marginLeft: 10 }}>
                <IconAfter size={20} color={iconColor} />
              </View>
            )}
          </StyledSelectTrigger>

          <Adapt when={true} platform="touch">
            <Sheet modal dismissOnSnapToBottom>
              <Sheet.Frame>
                <Adapt.Contents />
              </Sheet.Frame>
            </Sheet>
          </Adapt>

          <TamaguiSelect.Content zIndex={200000}>
            <TamaguiSelect.ScrollUpButton />
            <TamaguiSelect.Viewport>
              <TamaguiSelect.Group>
                {options.map((option, index) => (
                  <TamaguiSelect.Item index={index} key={option.value} value={option.value}>
                    <TamaguiSelect.ItemText
                      fontWeight={props.value === option.value ? '800' : '400'}
                    >
                      {option.label}
                    </TamaguiSelect.ItemText>
                  </TamaguiSelect.Item>
                ))}
              </TamaguiSelect.Group>
            </TamaguiSelect.Viewport>
            <TamaguiSelect.ScrollDownButton />
          </TamaguiSelect.Content>
        </TamaguiSelect>
      </StyledSelectWrapper>
    );
  }
);

Select.displayName = 'Select';
