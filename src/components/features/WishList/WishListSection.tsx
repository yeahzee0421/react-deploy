import { Box, Button, Flex, Heading, ListItem, Text } from '@chakra-ui/react';
import styled from '@emotion/styled';

import { imageUrl } from '@/api/hooks/useGetProducts';
import { useGetWishes } from '@/api/hooks/Wishes/useGetWishes';
import { Image } from '@/components/common/Image';
import { Container } from '@/components/common/layouts/Container';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';

export const WishListSection = () => {
  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishes(
    {
      maxResults: 20,
      initPageToken: '0',
    },
  );

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data) return <></>;
  if (data.pages[0].wishes.length <= 0) return <TextView>위시리스트가 비어있습니다.</TextView>;

  const flattenWishes = data.pages.map((page) => page?.wishes ?? []).flat();

  return (
    <Container>
      {flattenWishes.map(({ id, name, price }) => (
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
