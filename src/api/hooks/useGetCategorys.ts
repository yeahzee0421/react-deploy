import { useQuery } from '@tanstack/react-query';

import type { CategoryData } from '@/types';

import { axiosInstance, BASE_URL } from '../instance';

export type CategoryResponseData = CategoryData[];

export const getCategoriesPath = () => `${BASE_URL}/api/categories`;
const categoriesQueryKey = [getCategoriesPath()];

export const getCategories = async () => {
  const response = await axiosInstance.get<CategoryResponseData>(getCategoriesPath());
  console.log(response);
  return response.data;
};

export const useGetCategories = () =>
  useQuery({
    queryKey: categoriesQueryKey,
    queryFn: getCategories,
  });
