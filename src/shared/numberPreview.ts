const SuffixMultiple = {
  K: 1000,
  M: 1000000,
  B: 1000000000,
  default: 1
};

export function unitPreviewToNumber(unitPreview: string): number {
  if (!unitPreview) {
    return 0;
  }

  const match = unitPreview.match(/^(\d+(\.\d+)?)\s*([KMB])?$/i);

  if (!match) {
    return 0;
  }

  const numericValue = parseFloat(match[1]);
  const suffix = match[3] ? match[3].toUpperCase() : 'default';

  return numericValue * (SuffixMultiple[suffix as 'K' | 'M' | 'B'] || SuffixMultiple.default);
}

export function numberToFloorUnitPreview(number: number): string {
  if (isNaN(number)) {
    return '1';
  }

  let suffix = '';

  if (number >= SuffixMultiple.B) {
    number /= SuffixMultiple.B;
    suffix = 'B';
  } else if (number >= SuffixMultiple.M) {
    number /= SuffixMultiple.M;
    suffix = 'M';
  } else if (number >= SuffixMultiple.K) {
    number /= SuffixMultiple.K;
    suffix = 'K';
  }

  const formattedNumber = (Math.floor(number * 10) / 10).toFixed(1);

  const trimmedNumber = formattedNumber.replace(/\.?0*$/, '');

  return trimmedNumber + suffix;
}
