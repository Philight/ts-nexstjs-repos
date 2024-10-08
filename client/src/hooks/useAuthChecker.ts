import TokenService from '@api/services/token.service';
import { useEffect, useState } from 'react';

import { useAuth } from '@hooks/useAuth';

import { useAppDispatch } from '@redux/store';
import { checkAuth } from '@redux/user/user.actions';

export const useAuthChecker = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const { user } = useAuth();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const dispatchAuth = async () => {
      await dispatch(checkAuth());
      setTimeout(() => setIsLoaded(true), 200);
    };

    TokenService.getToken() && !user ? dispatchAuth() : setTimeout(() => setIsLoaded(true), 200);

    return () => setIsLoaded(true);
  }, [dispatch]);

  return { isLoaded, user };
};
