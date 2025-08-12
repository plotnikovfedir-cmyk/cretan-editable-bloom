import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useRateLimit } from "@/hooks/useRateLimit";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Rate limiting: 5 attempts per 15 minutes, 5 minute block
  const { checkRateLimit, isBlocked, getTimeUntilReset, remainingAttempts } = useRateLimit({
    maxAttempts: 5,
    windowMs: 15 * 60 * 1000, // 15 minutes
    blockDurationMs: 5 * 60 * 1000 // 5 minutes
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check rate limiting
    if (!checkRateLimit()) {
      const timeLeft = Math.ceil(getTimeUntilReset() / 1000 / 60);
      toast({
        variant: "destructive",
        title: "Too many login attempts",
        description: `Please wait ${timeLeft} minutes before trying again.`,
      });
      return;
    }
    
    setLoading(true);

    try {
      // Sign in with Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        toast({
          variant: "destructive",
          title: "Ошибка входа",
          description: authError.message,
        });
        return;
      }

      // Check if user is admin
      const { data: adminData, error: adminError } = await supabase
        .from("admin_users")
        .select("*")
        .eq("user_id", authData.user.id)
        .eq("is_active", true)
        .single();

      if (adminError || !adminData) {
        await supabase.auth.signOut();
        toast({
          variant: "destructive",
          title: "Доступ запрещен",
          description: "У вас нет прав администратора",
        });
        return;
      }

      toast({
        title: "Успешный вход",
        description: "Добро пожаловать в админ-панель!",
      });
      
      navigate("/admin/dashboard");
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Произошла непредвиденная ошибка",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Админ-панель</CardTitle>
          <CardDescription>
            Войдите в систему управления контентом
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading || isBlocked}>
              {loading ? "Вход..." : isBlocked ? "Заблокировано" : "Войти"}
            </Button>
            {isBlocked && (
              <p className="text-sm text-destructive text-center mt-2">
                Слишком много попыток входа. Попробуйте через {Math.ceil(getTimeUntilReset() / 1000 / 60)} мин.
              </p>
            )}
            {!isBlocked && remainingAttempts < 5 && (
              <p className="text-sm text-muted-foreground text-center mt-2">
                Осталось попыток: {remainingAttempts}
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;