import { Button, Input, Spinner, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { Container } from '@/components/common/layouts/Container';
import { useCreateCategory } from '@/hooks/Categories/useCreateCategory';
import { breakpoints } from '@/styles/variants';

interface FormValues {
  categoryName: string;
  description: string;
}

export const CreateCategorySection = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, errors },
  } = useForm<FormValues>();
  const { mutate: createCategory, isPending, isError } = useCreateCategory();

  const handleCreateButtonClick = () => {
    setIsInputVisible(true);
  };

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    createCategory(
      { name: data.categoryName, description: data.description },
      {
        onSuccess: () => {
          reset();
          setIsInputVisible(false);
        },
      },
    );
  };

  return (
    <Wrapper>
      <Container justifyContent="center" alignItems="center">
        {!isInputVisible && (
          <Button colorScheme="gray" onClick={handleCreateButtonClick}>
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
                {...register('description')}
                isDisabled={isPending || isSubmitting}
              />
              <Button type="submit" colorScheme="gray" isLoading={isPending || isSubmitting}>
                생성하기
              </Button>
            </VStack>
          </form>
        )}
        {isPending && <Spinner />}
        {isError && <Error>{'카테고리 생성 중 오류가 발생했습니다.'}</Error>}
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
  font-weight: 600;
  margin-top: 5px;
`;
