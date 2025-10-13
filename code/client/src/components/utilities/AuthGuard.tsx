import { UserContext } from "../../Main";
import { useEffect, useCallback, useState, ReactNode, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode  from 'jwt-decode';
import { User } from '../../api/types';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext);
    const [checked, setChecked] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            setUser(prev => ({ ...prev, isAuthenticated: false }));
            setChecked(true);
            return;
        }

        try {
            const decoded: User = jwt_decode(token);
            setUser({
                id: decoded.id,
                username: decoded.username,
                isAuthenticated: true,
                password: "",
            });
        } catch (err) {
            localStorage.removeItem("token");
            navigate("/login");
        } finally {
            setChecked(true);
        }
    }, []);

    if (!checked) return null;

    return <>{children}</>;
}

export default AuthGuard