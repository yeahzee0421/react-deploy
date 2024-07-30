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
  return response;
};

const useSignUp = (id: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      if (response.status === 201) {
        const token = response.data.token;
        alert('로그인 성공!');
        authSessionStorage.set({ id: id, token: token });
        window.location.replace(redirectUrl);
      }
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export default useSignUp;
