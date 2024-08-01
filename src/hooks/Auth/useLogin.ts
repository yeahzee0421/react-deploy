import { useMutation } from '@tanstack/react-query';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';

const loginRequest = async (data: { id: string; password: string }) => {
  const requestData = {
    email: data.id,
    password: data.password,
  };
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.MEMBER}/login`, requestData);
  console.log(response);
  return response;
};

const useSignUp = (id: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      if (response.status === 200) {
        const responseToken = response.data.token;
        const token = responseToken?.split(' ')[1];
        alert('로그인 성공!');
        authSessionStorage.set({ id: id, token: token });
        window.location.replace(redirectUrl);
      }
    },
    onError: (error) => {
      console.error('로그인 실패:', error);
    },
  });
};

export default useSignUp;
