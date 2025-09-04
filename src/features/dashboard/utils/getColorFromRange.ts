import { getTokenValue, Token } from 'tamagui';

export function getColorFromRange(maxValue: number, value: number): string {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const step = Math.ceil(percentage / 12.5) * 100;
  const index = Math.min(step, 900) as 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;

  const colorKey = `$secondary${index}` as `$secondary100` | `$secondary200` | any;

  const color = getTokenValue(colorKey as Token, 'color');

  return color ?? '#000';
}
