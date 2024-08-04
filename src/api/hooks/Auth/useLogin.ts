import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';
import { authSessionStorage } from '@/utils/storage';

type ErrorData = {
  code: number;
  message: string;
};

const loginRequest = async (data: { id: string; password: string }) => {
  const requestData = {
    email: data.id,
    password: data.password,
  };
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.MEMBER}/login`, requestData);
  return response;
};

const useLogin = (id: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        const token = response.data.token;
        alert('로그인 성공!');
        authSessionStorage.set({ id: id, token: token });
        window.location.replace(redirectUrl);
      }
    },
    //서버에서 던져주는 메세지 그대로 사용하는 방법 적용
    onError: (error: AxiosError) => {
      const errorResponse = error.response;
      const errorData = error.response?.data as ErrorData;
      if (errorResponse && errorResponse.status === 403) {
        alert(errorData.message);
        return;
      }
      alert('로그인 실패');
    },
  });
};

export default useLogin;
