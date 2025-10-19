import React, { useState, useMemo } from "react"
import { ThemeProvider, Typography, Box, Container, AppBar, Toolbar, CssBaseline, Button, IconButton } from "@mui/material" 
import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import AuthGuard from "./components/utilities/AuthGuard"
import Tasks from "./pages/Tasks"
import { User, UserContextType } from './api/types';
import { getAppTheme } from './theme/theme'; 
import Brightness7Icon from '@mui/icons-material/Brightness7'; 
import Brightness4Icon from '@mui/icons-material/Brightness4'; 


export const UserContext = React.createContext<UserContextType |
null>(null);

interface HeaderProps {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    toggleThemeMode: () => void;
mode: 'light' | 'dark'; 
}

const Header = ({ user, setUser, toggleThemeMode, mode }: HeaderProps) => { 
    
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        setUser({
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        });
        navigate("/login");
    };
    
    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: mode === 'light' ? '#fbedde' : '#272727',
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
                        
                    
    <Button 
                            variant="contained" 
                            color="primary"
                            onClick={logout}
          
              >
                            Log out
                        </Button>

                        <IconButton 
        
                    onClick={toggleThemeMode} 
                            color="inherit" 
                            sx={{ color: mode === 'light' ?
'#0087d7' : '#ffffff' }} 
                        >
                            {mode === 'light' ?
<Brightness7Icon /> : <Brightness4Icon />}
                        </IconButton>
                        
                    </Box>
                )}
            
</Toolbar>
        </AppBar>
    );
};
const Main: React.FC<{}> = ({}) => {

    const [user, setUser] = React.useState<User |
null>(() => {
        return {
            id: 0,
            username: "",
            password: "",
            isAuthenticated: false,
        }
    })
    
    const [currentThemeMode, setCurrentThemeMode] = useState<'light' |
'dark'>('light'); 

    const toggleThemeMode = () => {
        setCurrentThemeMode(prev => prev === 'light' ? 'dark' : 'light');
};
    
    const theme = useMemo(() => getAppTheme(currentThemeMode), 
[currentThemeMode]);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Box sx={{ 
                minHeight: '100vh', 
                color: 'text.primary' 
            }}>
              
  <BrowserRouter>
                    <Header user={user} setUser={setUser} toggleThemeMode={toggleThemeMode} mode={currentThemeMode} /> 
                    
                    <Box id="content-wrapper" sx={{ padding: '0 20px' }}> 
                        <Box 
id="content-container" sx={{ margin: '0' }}> 
                            <UserContext.Provider value={{user, setUser}}>
                                <AuthGuard>
                                 
   <Routes>
                                        <Route path="/" element={<Tasks user={user} themeMode={currentThemeMode} />}/> 
                                        <Route path="/login" element={<AuthPage isRegistration={false} />}/>
       
                                 <Route path="/register" element={<AuthPage isRegistration={true} />}/>
                                    </Routes>
                           
     </AuthGuard>
                            </UserContext.Provider>
                        </Box>
                    </Box>
                </BrowserRouter>
       
     </Box>
        </ThemeProvider>
    )
}

export default Main