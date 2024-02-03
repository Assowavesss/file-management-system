import { jwtDecode } from 'jwt-decode';
import {
  useState,
  createContext,
  FC,
  ReactNode,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';

export type Role = 'Student' | 'Tutor' | 'Admin';

export interface UserData {
  token: string;
  firstName: string;
  lastName: string;
  role: Role;
  promotion: string;
  email: string;
  id: string;
}

interface UserContextType {
  user: UserData | null;
  handleLogin: (token: string) => void;
  handleUserLogout: () => void;
}

const defaultContext: UserContextType = {
  user: null,
  handleLogin: () => {},
  handleUserLogout: () => {},
};

export const UserContext = createContext(defaultContext);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const navigate = useNavigate();
  const cookies = useMemo(() => new Cookies(), []);

  const handleLogin = useCallback(
    (token: string) => {
      console.log('Token:', token);
      if (typeof token !== 'string') {
        console.log('Invalid token:', token);
        console.error('Invalid token:', token);

        // Gérer l'erreur ici, par exemple, en affichant un message d'erreur à l'utilisateur.
        return;
      }
      const decodedToken = { ...jwtDecode(token), token: token } as UserData;
      cookies.set('userToken', token, { path: '/' });
      console.log('cookie userToken:', cookies.get('userToken'));
      setUser(decodedToken);
    },
    [cookies]
  );

  const handleUserLogout = () => {
    cookies.remove('userToken');
    setUser(null);
    navigate('/login');
  };

  useEffect(() => {
    const userToken = cookies.get('userToken');

    if (userToken && !user) {
      try {
        handleLogin(userToken);
      } catch (error) {
        console.error('Error decoding token:', error);
      }
    }
  }, [handleLogin, user, cookies]);

  return (
    <UserContext.Provider value={{ user, handleLogin, handleUserLogout }}>
      {children}
    </UserContext.Provider>
  );
};
