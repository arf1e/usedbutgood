import _ from 'lodash';
import { useEffect, useState } from 'react';
import useAuth from './useAuth';

export default function useAdminRights() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAdminRights, setHasAdminRights] = useState(false);
  const { isLoading: isAuthLoading, user } = useAuth();

  useEffect(() => {
    if (!isAuthLoading) {
      setIsLoading(false);
      const role = _.get(user, 'role', 'customer');
      setHasAdminRights(role === 'admin');
    }
  }, [user, isAuthLoading]);

  return { isLoading, hasAdminRights };
}
