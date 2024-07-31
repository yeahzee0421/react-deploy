import styled from '@emotion/styled';

import { useGetCategories } from '@/api/hooks/useGetCategorys';
import { Container } from '@/components/common/layouts/Container';
// import { Grid } from '@/components/common/layouts/Grid';
// import { getDynamicPath } from '@/routes/path';
import { breakpoints } from '@/styles/variants';

export const CategorySection = () => {
  const { data, isLoading, isError } = useGetCategories();

  if (isLoading || isError) return null;
  if (!data) return null;

  return (
    <Wrapper>
      <Container>
        {data?.map((category) => (
          <>
            <span key={category.id}>{category.name}</span>
          </>
        ))}
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
