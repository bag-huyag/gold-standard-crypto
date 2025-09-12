import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [twoFactorCode, setTwoFactorCode] = useState('');
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Проверка логина и пароля
      if (username === 'admin' && password === 'admin') {
        if (!showTwoFactor) {
          // Первый шаг - показать поле 2FA
          setShowTwoFactor(true);
          toast({
            title: "Требуется 2FA код",
            description: "Введите код двухфакторной аутентификации",
          });
          setIsLoading(false);
          return;
        }
        
        // Второй шаг - проверка 2FA кода
        if (twoFactorCode === '123456') {
          const success = login(username, password);
          if (success) {
            toast({
              title: "Успешный вход",
              description: "Добро пожаловать в систему!",
            });
            navigate('/');
          }
        } else {
          toast({
            title: "Неверный код 2FA",
            description: "Проверьте правильность введённого кода",
            variant: "destructive",
          });
        }
      } else {
        toast({
          title: "Ошибка входа",
          description: "Неверный логин или пароль. Используйте 'admin' для обоих полей.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            {showTwoFactor ? 'Двухфакторная аутентификация' : 'Вход в систему'}
          </CardTitle>
          <CardDescription>
            {showTwoFactor 
              ? 'Введите код из приложения аутентификации'
              : 'Введите свои данные для входа в систему'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!showTwoFactor ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="username">Логин</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Введите логин"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="password">Пароль</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Введите пароль"
                    required
                  />
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="twoFactorCode">Код аутентификации</Label>
                <Input
                  id="twoFactorCode"
                  type="text"
                  value={twoFactorCode}
                  onChange={(e) => setTwoFactorCode(e.target.value)}
                  placeholder="Введите 6-значный код"
                  maxLength={6}
                  className="text-center text-lg tracking-widest"
                  required
                />
              </div>
            )}

            <Button 
              type="submit" 
              className="w-full" 
              disabled={isLoading}
            >
              {isLoading ? "Проверка..." : showTwoFactor ? "Подтвердить" : "Войти"}
            </Button>

            {showTwoFactor && (
              <Button 
                type="button"
                variant="ghost" 
                className="w-full" 
                onClick={() => {
                  setShowTwoFactor(false);
                  setTwoFactorCode('');
                }}
              >
                Назад к входу
              </Button>
            )}
          </form>
          
          <div className="mt-4 text-center text-sm text-muted-foreground">
            {showTwoFactor 
              ? 'Используйте код: 123456'
              : 'Для входа используйте: admin / admin'
            }
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;