import {
  useState,
  createContext,
  FC,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { useNavigate } from 'react-router-dom';

export interface UserData {
  token: string;
  firstName: string;
  lastName: string;
  role: string;
}

interface UserContextType {
  user: UserData | null;
  handleLogin: (userData: UserData | null) => void;
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

  const handleLogin = useCallback((userData: UserData | null) => {
    setUser(userData);
  }, []);

  const handleUserLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userFirstName');
    localStorage.removeItem('userLastName');
    localStorage.removeItem('userRole');
    console.log('handleLogout is called');

    // Set user to null
    setUser(null);

    // Redirection vers la page de connexion (LoginPage) après déconnexion
    navigate('/login');
  };

  useEffect(() => {
    console.log('After setUser(null):', user);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, handleLogin, handleUserLogout }}>
      {children}
    </UserContext.Provider>
  );
};
