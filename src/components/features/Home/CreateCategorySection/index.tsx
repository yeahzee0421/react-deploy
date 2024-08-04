import { Button, Input, Spinner, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { useCreateCategory } from '@/api/hooks/Categories/useCreateCategory';
import { Container } from '@/components/common/layouts/Container';
import { breakpoints } from '@/styles/variants';

interface FormValues {
  categoryName: string;
  description: string;
}

export const CreateCategorySection = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const { mutate: createCategory, isPending, isError } = useCreateCategory();

  const handleCreateButtonClick = () => {
    setIsInputVisible(true);
    setErrorMessage(null);
  };

  const handleCancelButtonClick = () => {
    reset();
    setIsInputVisible(false);
    setErrorMessage(null);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createCategory(
      { name: data.categoryName, description: data.description },
      {
        onSuccess: () => {
          reset();
          setIsInputVisible(false);
          setErrorMessage(null);
        },
        onError: () => {
          setErrorMessage('카테고리 생성을 실패했습니다.');
        },
      },
    );
  };

  return (
    <Wrapper>
      <Container justifyContent="center" alignItems="center">
        {!isInputVisible && (
          <Button size="sm" colorScheme="gray" onClick={handleCreateButtonClick}>
            카테고리 만들기
          </Button>
        )}
        {isInputVisible && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="stretch">
              <Input
                placeholder="카테고리 이름을 입력하세요"
                {...register('categoryName', { required: '카테고리 이름을 입력하세요' })}
                isDisabled={isPending || isSubmitting}
              />
              {errors.categoryName && <Error>{errors.categoryName.message}</Error>}
              <Input
                placeholder="카테고리 설명을 입력하세요"
                {...register('description', { required: '카테고리 설명을 입력하세요' })}
                isDisabled={isPending || isSubmitting}
              />
              {errors.description && <Error>{errors.description.message}</Error>}
              <ButtonWrapper>
                <Button size="sm" colorScheme="gray" onClick={handleCancelButtonClick}>
                  취소하기
                </Button>
                <Button size="sm" type="submit" colorScheme="orange">
                  생성하기
                </Button>
              </ButtonWrapper>
            </VStack>
          </form>
        )}
        {isPending && <Spinner />}
        {isError && errorMessage && <Error>{errorMessage}</Error>}
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 14px 14px 3px;

  @media screen and (min-width: ${breakpoints.sm}) {
    padding: 45px 52px 23px;
  }
`;

const Error = styled.span`
  color: red;
  font-size: 12px;
  font-weight: 600;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 4px;
`;
