import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';

type Props = {
  productId: string;
};

type ErrorResponse = {
  code: number;
  message: string;
  validation?: {
    [key: string]: string;
  };
};

const addWishes = async ({ productId }: Props) => {
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.WISH}`, productId);
  return response.data;
};

export const useAddWishes = () => {
  return useMutation({
    mutationFn: addWishes,
    onError: (error: AxiosError<ErrorResponse>) => {
      if (error.response?.data) {
        const { code } = error.response.data;
        let errorMessage = '';

        switch (code) {
          case 404:
            errorMessage = '존재하지 않는 상품입니다.';
            break;
          case 409:
            errorMessage = '이미 위시리스트에 존재하는 상품입니다.';
            break;
          default:
            errorMessage = '위시리스트에 상품 등록을 실패했습니다.';
        }

        throw new Error(errorMessage);
      }

      throw error;
    },
  });
};
