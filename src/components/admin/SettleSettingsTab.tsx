import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Settings } from "lucide-react";

export function SettleSettingsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Settle настройки
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* General Settings */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Общие настройки</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="min-amount">Минимальная сумма сделки</Label>
              <Input id="min-amount" type="number" placeholder="1000" />
            </div>
            <div>
              <Label htmlFor="max-amount">Максимальная сумма сделки</Label>
              <Input id="max-amount" type="number" placeholder="100000" />
            </div>
            <div>
              <Label htmlFor="commission-rate">Комиссия (%)</Label>
              <Input id="commission-rate" type="number" step="0.1" placeholder="2.5" />
            </div>
            <div>
              <Label htmlFor="timeout">Таймаут сделки (мин)</Label>
              <Input id="timeout" type="number" placeholder="15" />
            </div>
          </div>
        </div>

        {/* Auto-settle Settings */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Авто-подтверждение</h3>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Switch id="auto-settle" />
              <Label htmlFor="auto-settle">Включить авто-подтверждение</Label>
            </div>
            <div>
              <Label htmlFor="auto-settle-timeout">Время авто-подтверждения (мин)</Label>
              <Input id="auto-settle-timeout" type="number" placeholder="5" />
            </div>
          </div>
        </div>

        {/* Risk Management */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Управление рисками</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="daily-limit">Дневной лимит на трейдера</Label>
              <Input id="daily-limit" type="number" placeholder="1000000" />
            </div>
            <div>
              <Label htmlFor="suspicious-threshold">Порог подозрительной активности</Label>
              <Input id="suspicious-threshold" type="number" placeholder="500000" />
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="freeze-suspicious" />
              <Label htmlFor="freeze-suspicious">Замораживать подозрительные транзакции</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="notify-admin" />
              <Label htmlFor="notify-admin">Уведомлять администратора</Label>
            </div>
          </div>
        </div>

        <Button className="w-full">Сохранить настройки</Button>
      </CardContent>
    </Card>
  );
}