import { UserContext } from "../../Main";
import { useEffect, useCallback, useState, ReactNode, Fragment, useContext } from "react";
import { useNavigate } from "react-router-dom"
import jwt_decode  from 'jwt-decode';

interface AuthGuardProps {
    children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = (props) => {
    const { children } = props;

    const navigate = useNavigate()

    const {user, setUser} = useContext(UserContext)

    const [checked, setChecked] = useState<boolean>(false);

    const check = useCallback(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login")
            setUser(prev => {
                return {
                    ...prev,
                    isAuthenticated: false
                }
            })
        } 
        else {
            const user: User = jwt_decode(localStorage.getItem("token"));

            setChecked(true)
            setUser(prev => {
                return {
                    ...prev,
                    id: user.id,
                    username: user.username,
                    isAuthenticated: true
                }
            })
        }
    }, [user.isAuthenticated]);
  
    useEffect(() => {
        console.log(user)
        check();
    }, [user.isAuthenticated]);

    return <Fragment>{children}</Fragment>
}

export default AuthGuard