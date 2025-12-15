import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, LogIn } from "lucide-react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate("/dashboard"); // Redirect ke dashboard kalau sukses
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black uppercase">Masuk Akun</CardTitle>
          <p className="text-slate-500">Lanjutkan progres belajarmu!</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input 
                id="email" 
                type="email" 
                placeholder="nama@email.com" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="font-bold border-2 border-slate-300"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-bold border-2 border-slate-300"
              />
            </div>
            <Button type="submit" className="w-full font-bold text-lg h-12" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : <LogIn className="mr-2 h-5 w-5" />}
              Masuk
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-4">
          <p className="text-sm text-slate-600">
            Belum punya akun? <Link to="/register" className="text-blue-600 font-bold hover:underline">Daftar disini</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default LoginPage;