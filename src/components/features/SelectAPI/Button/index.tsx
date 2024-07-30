import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

export const SelectAPIButton = () => {
  return (
    <Menu>
      <MenuButton as={Button}>백엔드 API 선택</MenuButton>
      <MenuList>
        <MenuItem>고명준</MenuItem>
        <MenuItem>최준형</MenuItem>
      </MenuList>
    </Menu>
  );
};
