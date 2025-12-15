import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Loader2, UserPlus } from "lucide-react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signUp(email, password, fullName);
    
    if (!error) {
      // Biasanya Supabase butuh konfirmasi email, tapi kita arahkan ke login dulu
      navigate("/login"); 
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <Card className="w-full max-w-md border-4 border-foreground shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-black uppercase">Buat Akun Baru</CardTitle>
          <p className="text-slate-500">Mulai perjalanan ke Jerman hari ini.</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullname">Nama Lengkap</Label>
              <Input 
                id="fullname" 
                type="text" 
                placeholder="Ilham Ramdhani" 
                required 
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="font-bold border-2 border-slate-300"
              />
            </div>
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
                placeholder="Minimal 6 karakter"
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="font-bold border-2 border-slate-300"
              />
            </div>
            <Button type="submit" className="w-full font-bold text-lg h-12 bg-green-600 hover:bg-green-700" disabled={loading}>
              {loading ? <Loader2 className="animate-spin mr-2" /> : <UserPlus className="mr-2 h-5 w-5" />}
              Daftar Sekarang
            </Button>
          </form>
        </CardContent>
        <CardFooter className="justify-center border-t pt-4">
          <p className="text-sm text-slate-600">
            Sudah punya akun? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login disini</Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterPage;