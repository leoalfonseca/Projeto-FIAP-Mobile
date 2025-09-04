import { useQuery } from '@tanstack/react-query';


import { ProfileMe } from '../model/ProfileMe';

export async function getProfileMe(): Promise<ProfileMe> {

  return ({} as ProfileMe);
}

export function useProfileMe() {
  return useQuery({
    queryKey: ['profileMe'],
    queryFn: getProfileMe
  });
}
