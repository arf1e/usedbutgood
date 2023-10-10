import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';
import { UserType } from '../types/user';

export default function useAuth() {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);

  const jwt = useSelector((state: RootState) => selectJwt(state));
  const { data: profile, isLoading: isLoadingQuery } = useGetProfileQuery(
    jwt || { access_token: '', refresh_token: '' }
  );

  useEffect(() => {
    if (!isLoadingQuery) {
      setIsLoading(false);
      setUser(profile || null);
    }
  }, [profile, isLoadingQuery]);

  return { isLoading, user };
}
