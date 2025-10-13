// src/theme/theme.ts

import { createTheme, colors} from "@mui/material"

export const theme = createTheme({
    palette: {
        // Устанавливаем темный режим, чтобы применить базовые стили
        mode: 'dark', 
        primary: {
            main: '#90caf9', // Светло-голубой, который используется в темных темах
        },
        secondary: {
            main: '#0087d7', // Синий из вашего кода
        },
        background: {
            // Более темный цвет для фона всего приложения
            default: '#121212', 
            // Чуть более светлый для карточек/поверхностей
            paper: '#1e1e1e', 
        },
        
    },
})