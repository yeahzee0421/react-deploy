import type { InfiniteData, UseInfiniteQueryResult } from '@tanstack/react-query';
import { useInfiniteQuery } from '@tanstack/react-query';

import type { WishListItem } from '@/types';

import { BASE_URL, fetchInstance } from '../../instance';

type RequestParams = {
  pageToken?: string;
  maxResults?: number;
};

type WishListResponseData = {
  wishes: WishListItem[];
  nextPageToken?: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
};

type WishListResponseRawData = {
  content: WishListItem[];
  number: number;
  totalElements: number;
  size: number;
  last: boolean;
};

export const getWishesPath = ({ pageToken, maxResults }: RequestParams) => {
  const params = new URLSearchParams();

  if (pageToken) params.append('page', pageToken);
  if (maxResults) params.append('size', maxResults.toString());
  params.append('sort', 'id,desc');

  return `${BASE_URL}/api/wishes?${params.toString()}`;
};

export const getWishes = async (params: RequestParams): Promise<WishListResponseData> => {
  const response = await fetchInstance.get<WishListResponseRawData>(getWishesPath(params));
  const data = response.data;

  return {
    wishes: data.content,
    nextPageToken: data.last === false ? (data.number + 1).toString() : undefined,
    pageInfo: {
      totalResults: data.totalElements,
      resultsPerPage: data.size,
    },
  };
};

type Params = Pick<RequestParams, 'maxResults'> & { initPageToken?: string };

export const useGetWishes = ({
  maxResults = 20,
  initPageToken,
}: Params): UseInfiniteQueryResult<InfiniteData<WishListResponseData>> => {
  return useInfiniteQuery({
    queryKey: ['wishes', maxResults, initPageToken],
    queryFn: async ({ pageParam = initPageToken }) => {
      return getWishes({ pageToken: pageParam, maxResults });
    },
    initialPageParam: initPageToken,
    getNextPageParam: (lastPage) => lastPage.nextPageToken,
  });
};
