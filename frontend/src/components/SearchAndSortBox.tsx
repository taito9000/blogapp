import React from 'react';
import {
  Box,
  TextField,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import { SearchAndSortBoxProps } from 'src/lib/interfaces';
import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { authUserData } from 'src/lib/interfaces';
import { LinkButton } from 'src/components/mui/linkButton';

const SearchAndSortBox: React.FC<SearchAndSortBoxProps> = ({
  sortOrder,
  setSortOrder,
  searchText,
  setSearchText,
}) => {
  const authUserData: authUserData = useAuthUser();
  const handleSearch = () => {
    // TODO:あとで余裕があれば後で検索処理を追加する
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 2 }}>
      {authUserData?.permissionName === 'admin' && (
        <LinkButton
          buttonLink='/create'
          buttonText='記事作成'
          sx={{ height: '55px' }}
        />
      )}
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel>並び順</InputLabel>
        <Select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          label='並び順'
        >
          <MenuItem value='date_desc'>日付降順</MenuItem>
          <MenuItem value='date_asc'>日付昇順</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label='キーワードを入力…'
        variant='outlined'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        sx={{ flexGrow: 1 }}
      />

      <Button
        variant='contained'
        color='primary'
        onClick={handleSearch}
        size='large'
        sx={{ height: '55px', color: 'white', fontWeight: 'bold' }} // 高さを揃える
      >
        検索
      </Button>
    </Box>
  );
};

export default SearchAndSortBox;
