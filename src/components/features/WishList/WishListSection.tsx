import { Box, Button, Flex, Heading, List, ListItem, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

import { imageUrl } from '@/api/hooks/useGetProducts';
import { useGetWishes } from '@/api/hooks/Wishes/useGetWishes';
import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';

export const WishListSection = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishes(
    {
      maxResults: 20,
      initPageToken: '0',
    },
  );
  const authInfo = useAuth();
  const navigate = useNavigate();

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data || data.pages[0].wishes.length <= 0)
    return <TextView>위시리스트가 비어있습니다.</TextView>;

  const flattenWishes = data.pages.map((page) => page?.wishes ?? []).flat();

  const handleNavToDetail = (id: number) => {
    navigate(getDynamicPath.productsDetail(id));
  };
  return (
    <Container alignItems="center" justifyContent="center">
      <Heading as="h3" size="md" mb={4}>
        🎁{authInfo?.name}님의 위시리스트🎁
      </Heading>
      {flattenWishes.map(({ id, name, price }) => (
        <List onClick={() => handleNavToDetail(id)} cursor="pointer">
          <ListItem key={id} p={4} shadow="md" borderWidth="2px" borderRadius="md">
            <Flex align="center">
              <Image src={imageUrl} alt={name} width="100px" />
              <Box ml={4}>
                <Heading as="h3" size="sm">
                  {name}
                </Heading>
                <Text fontSize="lg" fontWeight="700">
                  {price.toLocaleString()} 원
                </Text>
              </Box>
              <Button ml={16}>삭제</Button>
            </Flex>
          </ListItem>
        </List>
      ))}
      {hasNextPage && (
        <VisibilityLoader
          callback={() => {
            if (!isFetchingNextPage) {
              fetchNextPage();
            }
          }}
        />
      )}
    </Container>
  );
};

const TextView = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 16px 60px;
  font-size: 16px;
`;
