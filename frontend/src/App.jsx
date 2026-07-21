import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PageLoader from "./components/PageLoader";

function App() {

  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) return <PageLoader />

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={isSignedIn ? <Navigate to={"/"} replace /> : <AuthPage />} />
        </Routes>
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
