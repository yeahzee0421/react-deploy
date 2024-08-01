import { Box, Button, Flex, Heading, ListItem, Text } from '@chakra-ui/react';

import { imageUrl } from '@/api/hooks/useGetProducts';
import { Image } from '@/components/common/Image';
import type { WishListItem } from '@/types';

interface WishListItemProps extends WishListItem {
  onDelete: (productId: string) => void;
  onNavigate: (productId: string) => void;
}

export const WishItem = ({ id, name, price, onDelete, onNavigate }: WishListItemProps) => {
  return (
    <ListItem
      onClick={() => onNavigate(id)}
      key={id}
      p={4}
      shadow="md"
      borderWidth="2px"
      borderRadius="md"
      cursor="pointer"
    >
      <Flex align="center">
        <Image src={imageUrl} alt={name} width="100px" />
        <Box ml={4}>
          <Heading as="h3" size="sm" fontWeight="500" width="370px">
            {name}
          </Heading>
          <Text fontSize="lg" fontWeight="700">
            {price.toLocaleString()} 원
          </Text>
        </Box>
        <Button
          ml={16}
          onClick={(e) => {
            e.stopPropagation();
            onDelete(id);
          }}
        >
          삭제
        </Button>
      </Flex>
    </ListItem>
  );
};
