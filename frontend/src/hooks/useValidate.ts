import useAuthUser from 'react-auth-kit/hooks/useAuthUser';
import { authUserData } from 'src/lib/interfaces';

// 引数が数値に変換可能な場合、trueを返す
export const useIsValidId = (arg: string) => {
  return !isNaN(Number(arg));
};

// 引数が認証情報と一致する場合trueを返す
export const useIsPermitted = (permission: string) => {
  const authUserData: authUserData = useAuthUser();
  return authUserData?.permissionName === permission;
};
