import { useMutation } from '@tanstack/react-query';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';
import categoryThumbnail from '@/assets/categoryItem.jpeg';
import { bannerColors } from '@/styles/variants';

type Props = {
  name: string;
  color?: string;
  imageUrl?: string;
  description: string;
};

const getRandomColor = () => {
  const colors = Object.values(bannerColors);
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const categoryRequest = async ({ name, description }: Props) => {
  const requestData = {
    name: name,
    color: getRandomColor(),
    imageUrl: categoryThumbnail,
    description: description,
  };
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.CATEGORY}`, requestData);
  return response;
};

export const useCreateCategory = () => {
  return useMutation({
    mutationFn: categoryRequest,
  });
};
