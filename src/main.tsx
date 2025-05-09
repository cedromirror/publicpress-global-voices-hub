
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { MuiThemeProvider } from './theme/mui-theme'

createRoot(document.getElementById("root")!).render(
  <MuiThemeProvider>
    <App />
  </MuiThemeProvider>
);
