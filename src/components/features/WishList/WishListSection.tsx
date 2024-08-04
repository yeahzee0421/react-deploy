import { Heading, List } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useGetWishes } from '@/api/hooks/Wishes/useGetWishes';
import { useDeleteWishes } from '@/api/hooks/Wishes/useHandleWishes';
import { Container } from '@/components/common/layouts/Container';
import { LoadingView } from '@/components/common/View/LoadingView';
import { VisibilityLoader } from '@/components/common/VisibilityLoader';
import { useAuth } from '@/provider/Auth';
import { getDynamicPath } from '@/routes/path';
import type { WishListItem } from '@/types';

import { WishItem } from './WishItem';

export const WishListSection = () => {
  const [wishes, setWishes] = useState<WishListItem[]>([]);
  const authInfo = useAuth();
  const navigate = useNavigate();

  const { data, isError, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } = useGetWishes(
    {
      maxResults: 20,
      initPageToken: '0',
    },
  );
  const { mutate: deleteWishes } = useDeleteWishes();

  useEffect(() => {
    if (data) {
      const flattenedWishes = data.pages.map((page) => page?.wishes ?? []).flat();
      setWishes(flattenedWishes);
    }
  }, [data]);

  if (isLoading) return <LoadingView />;
  if (isError) return <TextView>에러가 발생했습니다.</TextView>;
  if (!data || data.pages[0].wishes.length <= 0 || wishes.length <= 0)
    return <TextView>위시리스트가 비어있습니다.</TextView>;

  const handleNavToDetail = (productId: string) => {
    navigate(getDynamicPath.productsDetail(productId));
  };

  const handleDeleteWishes = (productId: string) => {
    const isConfirm = window.confirm('선택한 상품을 삭제하시겠습니까?');
    if (!isConfirm) return;
    deleteWishes(productId, {
      onSuccess: () => {
        setWishes((prevWishes) => prevWishes.filter((wish) => wish.id !== productId));
        alert('상품 삭제 완료');
      },
      onError: () => {
        alert('상품 삭제 실패');
      },
    });
  };

  return (
    <Container alignItems="center" justifyContent="center">
      <Heading as="h3" size="md" mb={4}>
        🎁{authInfo?.name}님의 위시리스트🎁
      </Heading>
      <List>
        {wishes.map(({ id, name, price }) => (
          <WishItem
            key={id}
            id={id}
            name={name}
            price={price}
            onDelete={handleDeleteWishes}
            onNavigate={handleNavToDetail}
          />
        ))}
      </List>
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
