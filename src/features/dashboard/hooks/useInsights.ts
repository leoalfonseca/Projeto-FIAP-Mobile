import { useQuery } from '@tanstack/react-query';

import { useMemo } from 'react';


import { Insights } from '../model/Insights';
import { InsightsParamsDto } from '../model/InsightsParamsDto';

export async function getInsights(
  params: InsightsParamsDto = {},
  backOffice: boolean
): Promise<Insights> {
  const queryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value === 'string' && value !== '') {
      queryParams.append(key, String(value));
    } else if ((value as string[])?.length > 0) {
      value.forEach((item: string) => queryParams.append(key, String(item)));
    }
  });

  const queryString = queryParams.toString();
  const url = `/${backOffice ? 'backoffice' : 'dashboard'}/insights${queryString ? `?${queryString}` : ''}`;

  return ({} as Insights);
}

export function useInsights(params: InsightsParamsDto = {}, backOffice = false) {
  const memoizedParams = useMemo(() => params, [JSON.stringify(params)]);
  return useQuery({
    queryKey: ['insights', memoizedParams, backOffice],
    queryFn: () => getInsights(memoizedParams, backOffice),
    staleTime: 30_000,
    refetchInterval: 30_000,
    refetchOnWindowFocus: false,
    retry: 2
  });
}
