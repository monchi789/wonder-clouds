import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserCircle, Lock } from "lucide-react";
import useAuth from "@/modules/auth/hooks/useAuth";
import { getTokenAuth } from "@/modules/auth/services/auth.api";
import { getMemes } from "@/modules/auth/services/meme.api";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";
import { Alert, AlertDescription } from "@/shared/components/ui/alert";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import wonder from "@/assets/images/wonderclouds.webp";

interface FormData {
  username: string;
  password: string;
}

const Login = () => {
  // Form state
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // Meme state
  const [memeUrl, setMemeUrl] = useState<string | null>(null);
  const [isMemeLoading, setIsMemeLoading] = useState<boolean>(true);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const memes = await getMemes();
        if (memes?.length > 0) {
          setMemeUrl(memes[0].image);
        }
      } catch (error) {
        console.error('Error fetching meme:', error);
      } finally {
        setIsMemeLoading(false);
      }
    };

    fetchMeme();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await getTokenAuth(formData.username, formData.password);
      login(response);
      navigate("/", { replace: true });
    } catch {
      setError("Credenciales inválidas. Inténtalo nuevamente.");
    } finally {
      setIsLoading(false);
    }
  };

  const renderMemeSection = () => {
    if (isMemeLoading) {
      return (
        <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-lg">
          <LoadingSpinner />
        </div>
      );
    }

    if (!memeUrl) {
      return (
        <Alert variant="destructive" className="my-4">
          <AlertDescription>No se pudo cargar el meme.</AlertDescription>
        </Alert>
      );
    }

    return (
      <img
        src={memeUrl}
        alt="Meme de programación"
        className="w-5/6 max-h-96 rounded-lg shadow-lg object-cover"
        loading="lazy"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="px-6 py-8 md:px-8">
          <img 
            src={wonder} 
            alt="Logo wonder" 
            className="w-1/2 mx-auto py-5"
            loading="lazy"
          />
          
          <div className="flex justify-center">
            {renderMemeSection()}
          </div>

          <div className="mt-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Bienvenido de nuevo
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Ingresa a tu cuenta para continuar
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mt-4">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                Nombre de usuario
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserCircle className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  required
                  className="pl-10"
                  placeholder="usuario"
                  value={formData.username}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="mt-1 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="pl-10"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            <div className="flex items-center justify-end">
              <a
                href="#"
                className="text-sm font-medium text-wonder-blue hover:text-wonder"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <Button
              type="submit"
              className="w-full bg-wonder-blue hover:bg-wonder transition duration-300"
              disabled={isLoading}
            >
              {isLoading ? <LoadingSpinner /> : 'Iniciar Sesión'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;