import styled from '@emotion/styled';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  type ProductDetailRequestParams,
  useGetProductDetail,
} from '@/api/hooks/useGetProductDetail';
import { useGetProductOptions } from '@/api/hooks/useGetProductOptions';
import { Button } from '@/components/common/Button';
import { RouterPath } from '@/routes/path';
import { useRedirectToLoginByAuth } from '@/utils/auth';
import { orderHistorySessionStorage } from '@/utils/storage';

import { CountOptionItem } from './OptionItem/CountOptionItem';

type Props = ProductDetailRequestParams;

export const OptionSection = ({ productId }: Props) => {
  const { data: detail } = useGetProductDetail({ productId });
  const { data: options } = useGetProductOptions({ productId });

  const [countAsString, setCountAsString] = useState('1');
  const totalPrice = useMemo(() => {
    return detail.price * Number(countAsString);
  }, [detail, countAsString]);
  const checkAuthAndRedirect = useRedirectToLoginByAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    if (!checkAuthAndRedirect()) return;
    orderHistorySessionStorage.set({
      id: parseInt(productId),
      count: parseInt(countAsString),
    });

    navigate(RouterPath.order);
  };

  return (
    <Wrapper>
      <CountOptionItem name={options[0].name} value={countAsString} onChange={setCountAsString} />
      <BottomWrapper>
        <PricingWrapper>
          총 결제 금액 <span>{totalPrice}원</span>
        </PricingWrapper>
        <ButtonWrapper>
          <Button theme="darkGray" size="responsive">
            ♥️ 관심 ♥️
          </Button>
          <Button theme="black" size="large" onClick={handleClick}>
            나에게 선물하기
          </Button>
        </ButtonWrapper>
      </BottomWrapper>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  padding: 30px 12px 30px 30px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const BottomWrapper = styled.div`
  padding: 12px 0 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
`;
const PricingWrapper = styled.div`
  margin-bottom: 20px;
  padding: 18px 20px;
  border-radius: 4px;
  background-color: #f5f5f5;
  display: flex;
  justify-content: space-between;

  font-size: 14px;
  font-weight: 700;
  line-height: 14px;
  color: #111;

  & span {
    font-size: 20px;
    letter-spacing: -0.02em;
  }
`;
