import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";
import { AppBar } from "./components/app-bar";
import { Pages } from "./components/pages";

const theme = createTheme({
  colorSchemes: {
    dark: true,
  },
});

function App() {
  return (
    <ThemeProvider theme={theme} defaultMode="dark">
      <AppBar>
        <Pages />
      </AppBar>
    </ThemeProvider>
  );
}

export default App;
