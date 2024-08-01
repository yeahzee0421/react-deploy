import { useMutation } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';

import { BASE_ENDPOINTS } from '@/api/endpoints';
import { axiosInstance } from '@/api/instance';
import { RouterPath } from '@/routes/path';

const signUpRequest = async (data: { id: string; password: string }) => {
  const requestData = {
    email: data.id,
    password: data.password,
  };
  const response = await axiosInstance.post(`${BASE_ENDPOINTS.MEMBER}/register`, requestData);
  return response;
};

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (response) => {
      if (response.status === 200 || response.status === 201) {
        navigate(RouterPath.login);
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 409) {
        alert('이미 존재하는 아이디입니다.');
        return;
      }
      alert('회원가입 실패');
    },
  });
};

export default useSignUp;
