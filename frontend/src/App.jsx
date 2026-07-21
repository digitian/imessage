import { ThemeProvider } from "./context/ThemeContext";
import { WallpaperProvider } from "./context/WallpaperContext";
import { Navigate, Route, Routes } from "react-router";
import { useAuth } from "@clerk/react";
import { useAuthStore } from "./store/useAuthStore";
import ChatPage from "./pages/ChatPage";
import AuthPage from "./pages/AuthPage";
import PageLoader from "./components/PageLoader";
import { useEffect } from "react";
import { Toaster } from 'react-hot-toast';

function App() {

  const { isSignedIn, isLoaded } = useAuth();

  const checkAuth = useAuthStore((state) => state.checkAuth);
  const isCheckingAuth = useAuthStore((state) => state.isCheckingAuth);
  const clearAuth = useAuthStore((state) => state.clearAuth);

  useEffect(() => {
    if (!isLoaded) return;

    if (isSignedIn) checkAuth();
    else clearAuth();
  }, [checkAuth, clearAuth, isLoaded, isSignedIn]);

  if (!isLoaded || (isSignedIn && isCheckingAuth)) return <PageLoader />

  return (
    <ThemeProvider>
      <WallpaperProvider>
        <Routes>
          <Route path="/" element={isSignedIn ? <ChatPage /> : <Navigate to={"/auth"} replace />} />
          <Route path="/auth" element={isSignedIn ? <Navigate to={"/"} replace /> : <AuthPage />} />
        </Routes>
        <Toaster />
      </WallpaperProvider>
    </ThemeProvider>
  );
}

export default App;
