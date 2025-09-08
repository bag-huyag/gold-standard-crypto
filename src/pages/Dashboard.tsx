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
  return <div className="space-y-6">
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
              <Switch checked={trafficEnabled} onCheckedChange={setTrafficEnabled} />
            </div>
            <div className={`text-xs px-2 py-1 rounded-full text-center ${trafficEnabled ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
              {trafficEnabled ? "Активен" : "Неактивен"}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Stats */}
      
    </div>;
}