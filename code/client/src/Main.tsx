// src/Main.tsx

import React, { useMemo } from "react"
import { ThemeProvider, Typography, Box, Container, AppBar, Toolbar, CssBaseline } from "@mui/material"
import AuthPage from "./pages/AuthPage"
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom"
import AuthGuard from "./components/utilities/AuthGuard"
import Tasks from "./pages/Tasks"
import { User, UserContextType } from './api/types';
import { theme } from './theme/theme';


export const UserContext = React.createContext<UserContextType | null>(null);

const Header = () => {
    // Хедер отображается везде, логика скрытия удалена
    return (
        <AppBar 
            position="static" 
            sx={{ 
                backgroundColor: '#fbedde', // Установлен цвет fbedde
                boxShadow: 'none', 
                padding: '16px 0' 
            }}
        >
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1 }}>
                        <img 
                            src="/logo.png" 
                            alt="Logo" 
                            style={{ height: '40px' }} 
                        />
                    </Box>
                </Toolbar>
            </Container>
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
                <Header /> 
                
                <Box id="content-wrapper"> 
                    <Container maxWidth="lg"> 
                        <Box id="content-container" sx={{ margin: '0' }}> 
                            <UserContext.Provider value={{user, setUser}}>
                                <AuthGuard>
                                    <Routes>
                                        <Route path="/" element={<Tasks logout={logout} user={user} />}/>
                                        <Route path="/login" element={<AuthPage isRegistration={false} />}/>
                                        <Route path="/register" element={<AuthPage isRegistration={true} />}/>
                                    </Routes>
                                </AuthGuard>
                            </UserContext.Provider>
                        </Box>
                    </Container>
                </Box>
            </BrowserRouter>
        </ThemeProvider>
    )
}

export default Main