import React from 'react';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import { authUserData } from 'src/lib/interfaces';
import { useNavigate } from 'react-router-dom';
import { useSWRConfig } from 'swr';

interface DeleteButtonProps {
  articleId: number;
  authUserData: authUserData;
  onError: (error: string) => void;
  icon: boolean;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  articleId,
  authUserData,
  onError,
}) => {
  const axiosInstance = useAxiosInstance();
  const { mutate } = useSWRConfig();
  const navigate = useNavigate();

  const deleteArticle = async (
    id: number,
    authUserData: authUserData
  ): Promise<string | null> => {
    if (authUserData?.permissionName !== 'admin') {
      return '削除の権限がありません';
    }

    try {
      await axiosInstance.delete(`/articles/${id}`);
      // SWRのキャッシュから該当記事を削除
      mutate(`/articles/${id}`, undefined, false);
      navigate('/', {
        state: { text: '記事の削除に成功しました', type: 'success' },
      });
      return null;
    } catch (error) {
      return '記事の削除に失敗しました';
    }
  };

  const handleDelete = async () => {
    const error = await deleteArticle(articleId, authUserData);
    if (error) {
      onError(error);
    }
  };

  return (
    <Button
      variant='contained'
      color='error'
      size='large'
      onClick={handleDelete}
      startIcon={<DeleteIcon />}
      sx={{ color: 'white', fontWeight: 'bold' }}
    >
      削除
    </Button>
  );
};

export default DeleteButton;
