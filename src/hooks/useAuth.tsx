import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLazyGetProfileQuery } from '../apis/fakestore';
import { RootState } from '../slices';
import { selectJwt, selectUser } from '../slices/authSlice';
import { UserType } from '../types/user';

/**
 * Hook that gets the current user either from the store or from the API.
 * @returns {Object} { isLoading, user }
 */
export default function useAuth(): {
  isLoading: boolean;
  user: UserType | null;
} {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const [getProfile] = useLazyGetProfileQuery();

  const jwt = useSelector((state: RootState) => selectJwt(state.auth));
  const locallyExistingUser = useSelector((state: RootState) =>
    selectUser(state.auth)
  );

  useEffect(() => {
    if (!jwt) {
      setIsLoading(false);
      setUser(null);
      return;
    }

    if (locallyExistingUser) {
      setIsLoading(false);
      setUser(locallyExistingUser);
      return;
    }

    getProfile(jwt).finally(() => setIsLoading(false)); // API matchers will set the user automatically
  }, [jwt, locallyExistingUser, getProfile]);

  return { isLoading, user };
}
