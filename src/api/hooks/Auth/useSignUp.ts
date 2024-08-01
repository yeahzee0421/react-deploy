import { useMutation } from '@tanstack/react-query';
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
  return response.status;
};

const useSignUp = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: signUpRequest,
    onSuccess: (status) => {
      if (status === 201) {
        navigate(RouterPath.login);
      }
    },
    onError: (error) => {
      console.error('회원가입 실패:', error);
    },
  });
};

export default useSignUp;
