import { Spacing } from '@/components/common/layouts/Spacing';
import { AiDiscoveryBanner } from '@/components/features/Home/AiDiscoveryBanner';
import { CategorySection } from '@/components/features/Home/CategorySection';
import { CreateCategorySection } from '@/components/features/Home/CreateCategorySection';
import { SelectFriendsBanner } from '@/components/features/Home/SelectFriendsBanner';

export const HomePage = () => {
  return (
    <>
      <SelectFriendsBanner />
      <CreateCategorySection />
      <CategorySection />
      <AiDiscoveryBanner />
      <Spacing
        height={{
          initial: 40,
          sm: 80,
          md: 120,
        }}
      />
    </>
  );
};
