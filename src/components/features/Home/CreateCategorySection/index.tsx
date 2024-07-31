import { Button, Input, Spinner, VStack } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useState } from 'react';

import { Container } from '@/components/common/layouts/Container';
import { useCreateCategory } from '@/hooks/Categories/useCreateCategory';
import { breakpoints } from '@/styles/variants';

export const CreateCategorySection = () => {
  const [isInputVisible, setIsInputVisible] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const { mutate: createCategory, isPending, isError } = useCreateCategory();

  const handleCreateButtonClick = () => {
    setIsInputVisible(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryName(e.target.value);
  };

  const handleCategoryCreate = () => {
    if (categoryName) {
      createCategory(categoryName, {
        onSuccess: () => {
          setCategoryName('');
          setIsInputVisible(false);
        },
      });
    }
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
          <VStack spacing={4} align="stretch">
            <Input
              placeholder="카테고리 이름을 입력하세요"
              value={categoryName}
              onChange={handleInputChange}
              isDisabled={isPending}
            />
            <Button colorScheme="gray" onClick={handleCategoryCreate} isLoading={isPending}>
              생성하기
            </Button>
          </VStack>
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
  margin-top: 10px;
`;
