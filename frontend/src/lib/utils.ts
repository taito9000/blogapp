// yyyy/mm/dd hh:mm:ssの形式の文字列を返す
export const formatDate = (arg: string) => {
  return new Date(arg).toLocaleString();
};
