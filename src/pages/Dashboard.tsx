import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";

export default function Dashboard() {
  const [trafficEnabled, setTrafficEnabled] = useState(true);
  
  const teamName = "Команда Alpha";
  const balance = "2,133.5";
  const insuranceDeposit = "1,000";
  const frozenBalance = "0";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Главная</h1>
        <Badge variant="secondary" className="text-sm">
          {teamName}
        </Badge>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Баланс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {balance} <span className="text-lg font-normal">USDT</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-secondary to-secondary/80 text-secondary-foreground">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium opacity-90">
              Страховой депозит
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {insuranceDeposit} <span className="text-lg font-normal">USDT</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-muted to-muted/60">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Замороженный баланс
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">
              {frozenBalance} <span className="text-lg font-normal">USDT</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 border-dashed border-border">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Статус трафика
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">
                {trafficEnabled ? "Включен" : "Выключен"}
              </span>
              <Switch
                checked={trafficEnabled}
                onCheckedChange={setTrafficEnabled}
              />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full text-center ${
              trafficEnabled 
                ? 'bg-success/10 text-success' 
                : 'bg-destructive/10 text-destructive'
            }`}>
              {trafficEnabled ? "Активен" : "Неактивен"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Сегодня</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Сделки</span>
              <span className="font-semibold">12</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Объем</span>
              <span className="font-semibold">45,230 ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Прибыль</span>
              <span className="font-semibold text-success">+1,234 USDT</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">За неделю</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Сделки</span>
              <span className="font-semibold">87</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Объем</span>
              <span className="font-semibold">234,567 ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Прибыль</span>
              <span className="font-semibold text-success">+8,765 USDT</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">За месяц</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Сделки</span>
              <span className="font-semibold">342</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Объем</span>
              <span className="font-semibold">1,234,567 ₽</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Прибыль</span>
              <span className="font-semibold text-success">+43,210 USDT</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}