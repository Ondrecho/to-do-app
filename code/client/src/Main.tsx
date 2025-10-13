import React, { useState } from "react" 
import { ThemeProvider, Typography, Box, Container, AppBar, Toolbar, CssBaseline, Button, IconButton } from "@mui/material" // <-- Добавлен IconButton
import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AuthGuard from "./components/utilities/AuthGuard"
import Tasks from "./pages/Tasks"
import { User, UserContextType } from './api/types';
import { theme } from './theme/theme';
import Brightness7Icon from '@mui/icons-material/Brightness7';

export const UserContext = React.createContext<UserContextType | null>(null);

interface HeaderProps {
    user: User | null;
    logout: () => void;
    toggleThemeMode: () => void;
}

const Header = ({ user, logout, toggleThemeMode }: HeaderProps) => {
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
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        
                        <IconButton 
                            onClick={toggleThemeMode} 
                            color="inherit" 
                            sx={{ color: '#000000' }}
                        >
                            <Brightness7Icon />
                        </IconButton>
                        
                        <Button 
                            variant="contained" 
                            color="secondary"
                            onClick={logout}
                        >
                            Log out
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};


const Main: React.FC<{}> = ({}) => {

    const [user, setUser] = React.useState<User | null>(() => {
        return {
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        }
    })
    
    const [currentThemeMode, setCurrentThemeMode] = useState<'light' | 'dark'>('light'); 

    const toggleThemeMode = () => {
        setCurrentThemeMode(prev => {
            const newMode = prev === 'light' ? 'dark' : 'light';
            console.log(`MOCK: Switching theme to ${newMode}`);
            return newMode;
        });
    };
    
    const logout = () => {
        localStorage.removeItem("token")
        setUser({
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        })
    }


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <BrowserRouter>
                <Header user={user} logout={logout} toggleThemeMode={toggleThemeMode} /> 
                
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