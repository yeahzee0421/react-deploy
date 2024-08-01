import { useMutation } from '@tanstack/react-query';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';

const addWishes = async (productId: string) => {
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.WISH}`, productId);
  return response.data;
};

const deleteWishes = async (productId: string) => {
  const response = await axiosInstance.delete(`${BASE_ENDPOINTS.WISH}`, {
    data: productId,
  });
  return response.data;
};

export const useAddWishes = () => {
  return useMutation({
    mutationFn: addWishes,
  });
};

export const useDeleteWishes = () => {
  return useMutation({
    mutationFn: deleteWishes,
  });
};
