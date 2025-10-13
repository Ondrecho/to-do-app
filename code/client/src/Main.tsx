import React, { useMemo } from "react"
import { ThemeProvider, Typography, Box, Container, AppBar, Toolbar, CssBaseline, Button } from "@mui/material"
import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import AuthGuard from "./components/utilities/AuthGuard"
import Tasks from "./pages/Tasks"
import { User, UserContextType } from './api/types';
import { theme } from './theme/theme';


export const UserContext = React.createContext<UserContextType | null>(null);

interface HeaderProps {
    user: User | null;
    logout: () => void;
}

const Header = ({ user, logout }: HeaderProps) => {
    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: '#fbedde',
                boxShadow: 'none', 
                padding: '16px 0' 
            }}
        >
            <Toolbar disableGutters sx={{ padding: '0 20px' }}> 
                <Box sx={{ flexGrow: 1 }}>
                    <img 
                        src="/logo.png" 
                        alt="Logo" 
                        style={{ height: '60px' }} 
                    />
                </Box>
                {user?.isAuthenticated && (
                    <Button 
                        variant="contained" 
                        color="secondary"
                        onClick={logout}
                    >
                        Log out
                    </Button>
                )}
            </Toolbar>
        </AppBar>
    );
};


const Main: React.FC<{}> = ({}) => {

    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        })
    }

    const [user, setUser] = React.useState<User | null>(() => {
        return {
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        }
    })

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Header user={user} logout={logout} /> 
                
                <Box id="content-wrapper" sx={{ padding: '0 20px' }}> 
                    <Box id="content-container" sx={{ margin: '0' }}> 
                        <UserContext.Provider value={{user, setUser}}>
                            <AuthGuard>
                                <Routes>
                                    <Route path="/" element={<Tasks user={user} />}/> 
                                    <Route path="/login" element={<AuthPage isRegistration={false} />}/>
                                    <Route path="/register" element={<AuthPage isRegistration={true} />}/>
                                </Routes>
                            </AuthGuard>
                        </UserContext.Provider>
                    </Box>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Main