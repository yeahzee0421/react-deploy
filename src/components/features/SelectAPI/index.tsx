import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { BASE_URL_CHOI, BASE_URL_KO, setBaseURL } from '@/api/instance';

export const SelectAPIButton = () => {
  const handleSelectAPI = (url: string): void => {
    setBaseURL(url);
  };

  return (
    <Menu>
      <MenuButton as={Button} size="sm">
        백엔드 API 선택
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => handleSelectAPI(BASE_URL_KO)}>고명준</MenuItem>
        <MenuItem onClick={() => handleSelectAPI(BASE_URL_CHOI)}>최준형</MenuItem>
      </MenuList>
    </Menu>
  );
};
