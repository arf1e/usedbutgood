import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useGetProfileQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import { selectJwt } from '../slices/authSlice';

export default function useAdminRights() {
  const [hasAdminRights, setHasAdminRights] = useState(false);
  const jwt = useSelector((state: RootState) => selectJwt(state));
  const { data: profile } = useGetProfileQuery(
    jwt || { access_token: '', refresh_token: '' }
  );

  useEffect(() => {
    if (profile && profile.role === 'admin') {
      setHasAdminRights(true);
      return;
    }
    setHasAdminRights(false);
  }, [profile]);

  return hasAdminRights;
}
