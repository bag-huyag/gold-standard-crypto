import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Shield, Smartphone, Clock, Key, Bell, LogOut } from "lucide-react";

export default function Settings() {
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [loginNotifications, setLoginNotifications] = useState(true);
  const [autoLogout, setAutoLogout] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Настройки</h1>
      </div>

      {/* Two-Factor Authentication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Двухфакторная аутентификация
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-medium">Статус:</span>
                <Badge variant={twoFactorEnabled ? "default" : "destructive"}>
                  {twoFactorEnabled ? "Включена" : "Отключена"}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {twoFactorEnabled 
                  ? "2FA активна и защищает ваш аккаунт"
                  : "Включите переключатель выше, чтобы настроить двухфакторную аутентификацию"
                }
              </p>
            </div>
            <Switch
              checked={twoFactorEnabled}
              onCheckedChange={setTwoFactorEnabled}
            />
          </div>

          {twoFactorEnabled && (
            <div className="border-t pt-4">
              <div className="flex items-center gap-3 p-4 bg-success/10 rounded-lg border border-success/20">
                <Smartphone className="h-5 w-5 text-success" />
                <div>
                  <p className="text-sm font-medium text-success">2FA настроена</p>
                  <p className="text-xs text-success/80">Используйте приложение аутентификатора для входа</p>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Additional Security */}
      <Card>
        <CardHeader>
          <CardTitle>Дополнительная безопасность</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Уведомления о входе</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Получать уведомления при входе с нового устройства
              </p>
            </div>
            <Switch
              checked={loginNotifications}
              onCheckedChange={setLoginNotifications}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="font-medium">Автоматический выход</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Автоматически выходить из системы после 30 минут бездействия
              </p>
            </div>
            <Switch
              checked={autoLogout}
              onCheckedChange={setAutoLogout}
            />
          </div>
        </CardContent>
      </Card>

      {/* Change Password */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Key className="h-5 w-5" />
            Изменить пароль
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">Текущий пароль</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="Введите текущий пароль"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">Новый пароль</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Введите новый пароль"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Подтвердите новый пароль</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Подтвердите новый пароль"
            />
          </div>

          <div className="flex justify-end pt-4">
            <Button>
              Изменить пароль
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Session Management */}
      <Card>
        <CardHeader>
          <CardTitle>Управление сессиями</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Текущая сессия</p>
                <p className="text-sm text-muted-foreground">Chrome на Windows • Последняя активность: сейчас</p>
              </div>
              <Badge variant="default">Активна</Badge>
            </div>

            <div className="flex items-center justify-between p-3 border border-border rounded-lg">
              <div>
                <p className="font-medium">Мобильное устройство</p>
                <p className="text-sm text-muted-foreground">Safari на iPhone • Последняя активность: 2 часа назад</p>
              </div>
              <Button variant="outline" size="sm">
                Завершить
              </Button>
            </div>
          </div>

          <div className="flex justify-between items-center pt-4 border-t">
            <Button variant="destructive" className="flex items-center gap-2">
              <LogOut className="h-4 w-4" />
              Завершить все сессии
            </Button>
            <p className="text-xs text-muted-foreground">
              Это действие завершит все активные сессии, кроме текущей
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}