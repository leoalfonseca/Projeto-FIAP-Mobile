import { useEffect, useRef } from 'react';
import { Animated } from 'react-native';
import { Stack, styled } from 'tamagui';

const SkeletonContainer = styled(Stack, {
  backgroundColor: '#e0e0e0',
  overflow: 'hidden'
});

export function Skeleton({
  width = 100,
  height = 100,
  rounded = false
}: {
  width?: number | string;
  height?: number | string;
  rounded?: boolean;
}) {
  const numericWidth = typeof width === 'number' ? width : 100;

  const translateX = useRef(new Animated.Value(-numericWidth)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: numericWidth,
        duration: 1000,
        useNativeDriver: true
      })
    ).start();
  }, [translateX, numericWidth]);

  const borderRadius =
    rounded && typeof width === 'number' && typeof height === 'number'
      ? Math.min(width, height) / 2
      : 8;

  return (
    <SkeletonContainer width={width} height={height} borderRadius={borderRadius}>
      <Animated.View
        style={{
          width: '40%',
          height: '100%',
          backgroundColor: '#c0c0c0',
          opacity: 0.5,
          transform: [{ translateX }]
        }}
      />
    </SkeletonContainer>
  );
}
