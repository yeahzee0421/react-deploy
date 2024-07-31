import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse } from 'axios';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';

type Category = {
  name: string;
};

const categoryRequest = async (name: string) => {
  const requestData = {
    name: name,
  };
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.CATEGORY}`, requestData);
  return response;
};

export const useCreateCategory = () => {
  return useMutation<AxiosResponse<Category>, Error, string>({
    mutationFn: categoryRequest,
    onError: (error) => {
      console.error('E', error);
    },
  });
};
