import useSWR from 'swr';
import useAxiosInstance from 'src/hooks/useAxiosInstance';
import { Article } from 'src/lib/interfaces';

type ArticlesResponse = {
  totalArticles: number;
  articles: Article[];
};

const useArticleFetcher = <T>(url: string) => {
  const axiosInstance = useAxiosInstance();

  // 実際にデータを取得する関数
  const fetcher = async (url: string): Promise<T> => {
    try {
      const response = await axiosInstance.get<T>(url);
      return response.data;
    } catch (error) {
      throw new Error('データの取得に失敗しました');
    }
  };

  // SWRでfetcherで取得したデータをurlをキーとしてキャッシュする
  const { data, isLoading, error } = useSWR<T, Error>(url, fetcher);

  return {
    data,
    error,
    isLoading,
  };
};

// articleを複数取得する
export const useGetArticles = (page: number, itemsPerPage: number) => {
  const url = `/articles?page=${page}&itemsPerPage=${itemsPerPage}`;
  return useArticleFetcher<ArticlesResponse>(url);
};

// articleをid指定で１つ取得する
export const useGetArticle = (articleId: string) => {
  const url = `/articles/${articleId}`;
  return useArticleFetcher<Article>(url);
};
