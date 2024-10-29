import { AlertColor } from '@mui/material';

export type Article = {
  id: number;
  title: string;
  content: string;
  image_url?: string;
  created_at: string;
  created_user: string;
  updated_at: string;
  updated_user?: string;
};

export type SearchAndSortBoxProps = {
  sortOrder: string;
  setSortOrder: (value: string) => void;
  searchText: string;
  setSearchText: (value: string) => void;
};

export interface ArticleListProps {
  articles: Article[];
}

export type authUserData = { userId: number; permissionName: string } | null;

export type Message = {
  text: string;
  type: AlertColor;
};

export interface ArticleFormData {
  title: string;
  content: string;
}
