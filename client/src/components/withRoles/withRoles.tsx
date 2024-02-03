import { FC, useContext } from 'react';
import { Role, UserContext } from '../../../UserContext';

const withRoles = (
  AuthComponent: FC | null,
  roles: Role[],
  NoAuthComponent: FC | null = null
) => {
  const RequiresAuth: FC = (props) => {
    const { user } = useContext(UserContext);

    if (!user) {
      // User is not logged in, render the no auth component
      return NoAuthComponent ? <NoAuthComponent {...props} /> : null;
    }
    if (!roles.includes(user.role)) {
      return NoAuthComponent ? <NoAuthComponent {...props} /> : null;
    }

    // User is logged in, render the component
    return AuthComponent ? <AuthComponent {...props} /> : null;
  };

  return RequiresAuth;
};

export default withRoles;
