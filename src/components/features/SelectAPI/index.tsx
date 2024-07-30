import { Button, Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react';

import { initInstance } from '@/api/instance';

const BASE_URL_CHOI = 'http://13.125.199.167:8080';
const BASE_URL_KO = 'http://3.36.54.48:8080';

export const SelectAPIButton = () => {
  const handleSelectAPI = (url: string) => {
    initInstance({
      baseURL: url,
    });
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
