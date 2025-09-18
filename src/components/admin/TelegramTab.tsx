import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { MessageSquare } from "lucide-react";

export function TelegramTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Настройки Telegram
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Bot Settings */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Настройки бота</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="bot-token">Токен бота</Label>
              <Input id="bot-token" type="password" placeholder="Введите токен бота" />
            </div>
            <div>
              <Label htmlFor="bot-username">Username бота</Label>
              <Input id="bot-username" placeholder="@your_bot" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="bot-active" />
              <Label htmlFor="bot-active">Бот активен</Label>
            </div>
          </div>
        </div>

        {/* Channel Settings */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Настройки каналов</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="notification-channel">Канал уведомлений</Label>
              <Input id="notification-channel" placeholder="@notifications_channel" />
            </div>
            <div>
              <Label htmlFor="admin-channel">Канал администраторов</Label>
              <Input id="admin-channel" placeholder="@admin_channel" />
            </div>
          </div>
        </div>

        {/* Message Templates */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Шаблоны сообщений</h3>
          <div className="space-y-4">
            <div>
              <Label htmlFor="welcome-message">Приветственное сообщение</Label>
              <Textarea 
                id="welcome-message" 
                placeholder="Введите текст приветственного сообщения"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="dispute-message">Сообщение о диспуте</Label>
              <Textarea 
                id="dispute-message" 
                placeholder="Введите текст сообщения о диспуте"
                rows={3}
              />
            </div>
            <div>
              <Label htmlFor="deal-complete-message">Сообщение о завершении сделки</Label>
              <Textarea 
                id="deal-complete-message" 
                placeholder="Введите текст сообщения о завершении сделки"
                rows={3}
              />
            </div>
          </div>
        </div>

        <Button className="w-full">Сохранить настройки</Button>
      </CardContent>
    </Card>
  );
}