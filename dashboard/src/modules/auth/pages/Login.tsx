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
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
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
    setError("");
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

  const renderMemeContent = () => {
    if (isMemeLoading) {
      return (
        <div className="w-full h-full flex items-center justify-center">
          <LoadingSpinner />
        </div>
      );
    }

    if (!memeUrl) {
      return (
        <div className="w-full flex items-center justify-center">
          <Alert variant="destructive">
            <AlertDescription>No se pudo cargar el meme.</AlertDescription>
          </Alert>
        </div>
      );
    }

    return (
      <img
        src={memeUrl}
        alt="Meme de programación"
        className="w-full h-60 object-contain"
        loading="lazy"
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header with Logo */}
        <div className="w-full flex justify-center pt-8 pb-4">
          <img 
            src={wonder} 
            alt="Logo wonder" 
            className="w-32"
            loading="lazy"
          />
        </div>

        {/* Meme Section with Fixed Height */}
        <div className="px-6">
          <div className="bg-gray-50 rounded-lg overflow-hidden">
            {renderMemeContent()}
          </div>
        </div>

        {/* Login Form Section */}
        <div className="px-6 py-8">
          <div className="space-y-6">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900">
                Bienvenido de nuevo
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Ingresa a tu cuenta para continuar
              </p>
            </div>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-4">
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
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-wonder-blue focus:ring-wonder"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
                    Recordarme
                  </label>
                </div>

                <a
                  href="#"
                  className="text-sm font-medium text-wonder-blue hover:text-wonder"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              <Button
                type="submit"
                className="w-full bg-wonder-blue hover:bg-wonder transition-colors duration-300"
                disabled={isLoading}
              >
                {isLoading ? <LoadingSpinner /> : 'Iniciar Sesión'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;