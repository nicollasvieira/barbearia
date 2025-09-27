import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Scissors, Lock, User } from "lucide-react";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Verificação de credenciais fixas
    if (credentials.username === "usuarioadmin" && credentials.password === "usuarioadmin") {
      // Salvar estado de autenticação no localStorage
      localStorage.setItem("admin_authenticated", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Usuário ou senha incorretos");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="bg-gradient-gold p-3 rounded-lg">
              <Scissors className="h-8 w-8 text-brand-black" />
            </div>
            <div>
              <h1 className="font-montserrat font-bold text-2xl text-brand-white">
                Laudano
              </h1>
              <p className="font-open-sans text-sm text-brand-gold -mt-1">
                Barbearia
              </p>
            </div>
          </div>
          <h2 className="font-montserrat font-bold text-xl text-brand-white">
            Painel Administrativo
          </h2>
        </div>

        {/* Form */}
        <Card className="shadow-elegant border-brand-gold/20">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-gradient-gold rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-brand-black" />
            </div>
            <CardTitle className="font-montserrat text-2xl text-brand-black">
              Acesso Restrito
            </CardTitle>
            <CardDescription className="font-open-sans text-brand-gray">
              Faça login para acessar o painel administrativo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              {error && (
                <Alert className="border-red-500 bg-red-50">
                  <AlertDescription className="text-red-700">
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <div>
                <Label htmlFor="username" className="font-montserrat font-medium text-brand-black">
                  Usuário
                </Label>
                <div className="relative mt-1">
                  <User className="absolute left-3 top-3 h-4 w-4 text-brand-gray" />
                  <Input
                    id="username"
                    type="text"
                    value={credentials.username}
                    onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                    placeholder="usuarioadmin"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <div>
                <Label htmlFor="password" className="font-montserrat font-medium text-brand-black">
                  Senha
                </Label>
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-brand-gray" />
                  <Input
                    id="password"
                    type="password"
                    value={credentials.password}
                    onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                    placeholder="usuarioadmin"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              
              <Button variant="hero" type="submit" className="w-full">
                Entrar no Sistema
              </Button>
            </form>

            {/* Credenciais de Teste */}
            <div className="mt-6 p-4 bg-brand-gold/10 rounded-lg border border-brand-gold/30">
              <h4 className="font-montserrat font-semibold text-brand-black text-sm mb-2">
                Credenciais de Teste:
              </h4>
              <p className="font-open-sans text-brand-gray text-sm">
                <strong>Usuário:</strong> usuarioadmin<br />
                <strong>Senha:</strong> usuarioadmin
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;