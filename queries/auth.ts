import { logIn, logOut } from '@/services/index';
import { useMutation, useQueryClient } from 'react-query';

export const useAuthentication = () => {
  const queryClient = useQueryClient();

  const logInMutation = useMutation(logIn, {
    onSuccess: () => {
      queryClient.setQueryData(['user_authentication'], {
        id: '9221745b-a560-5a06-bcc2-d224011cb772',
        firstName: 'Tai',
        lastName: 'Nguyen',
      });
    },
  });

  const logOutMutation = useMutation(logOut, {
    onSuccess: () => {
      queryClient.setQueryData(['user_authentication'], null);
    },
  });

  return {
    isLoggingIn: logInMutation.isLoading,
    isLoggingOut: logOutMutation.isLoading,
    logIn: logInMutation.mutateAsync,
    logOut: logOutMutation.mutateAsync,
    user: queryClient.getQueryData(['user_authentication']),
  };
};
