import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

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

const useLogin = (id: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  const redirectUrl = queryParams.get('redirect') ?? `${window.location.origin}/`;
  return useMutation({
    mutationFn: loginRequest,
    onSuccess: (response) => {
      if (response.status === 200) {
        const token = response.data.token;
        alert('로그인 성공!');
        authSessionStorage.set({ id: id, token: token });
        window.location.replace(redirectUrl);
      }
    },
    onError: (error: AxiosError) => {
      const errorResponse = error.response;
      if (errorResponse && errorResponse.status === 403) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
      alert('이메일 또는 비밀번호가 일치하지 않습니다.');
    },
  });
};

export default useLogin;
