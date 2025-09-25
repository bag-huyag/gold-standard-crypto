// components/admin/DashboardTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, Wallet, Handshake, AlertCircle } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function DashboardTab() {
  // Mock данные для дашборда
  const stats = {
    totalTrades: 1247,
    activeDisputes: 23,
    newTradesToday: 47,
    totalRevenue: 125430,
    activeTraders: 89,
    activeMerchants: 15
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Обзор платформы</h2>
          <p className="text-muted-foreground">Ключевые метрики и статистика</p>
        </div>
        <div className="flex items-center gap-2">
          <Label htmlFor="period-select" className="text-sm">Период:</Label>
          <Select defaultValue="week">
            <SelectTrigger className="w-[130px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Сегодня</SelectItem>
              <SelectItem value="week">Неделя</SelectItem>
              <SelectItem value="month">Месяц</SelectItem>
              <SelectItem value="quarter">Квартал</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего сделок</CardTitle>
            <Handshake className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalTrades.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> за неделю
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные диспуты</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeDisputes}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+3</span> новых сегодня
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Сделки сегодня</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.newTradesToday}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+8%</span> vs вчера
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Общий оборот</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${stats.totalRevenue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5.2%</span> за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные трейдеры</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeTraders}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+5</span> за месяц
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Активные мерчанты</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeMerchants}</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2</span> новых
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Последние активности</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: "john_trader", action: "завершил сделку", amount: "15,042 ₽", time: "5 мин назад" },
                { user: "sarah_lead", action: "создала команду", details: "3 участника", time: "12 мин назад" },
                { user: "merchant_one", action: "выполнил выплату", amount: "8,500 ₽", time: "25 мин назад" },
                { user: "mike_trader", action: "открыл диспут", details: "ID: dfa176c4", time: "1 час назад" }
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{activity.user}</p>
                    <p className="text-sm text-muted-foreground">
                      {activity.action} {activity.amount && `на ${activity.amount}`} {activity.details && `(${activity.details})`}
                    </p>
                  </div>
                  <span className="text-xs text-muted-foreground">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Быстрые действия</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Добавить пользователя</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Wallet className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Управление кошельками</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <Handshake className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Просмотр сделок</span>
              </button>
              <button className="flex flex-col items-center justify-center p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <AlertCircle className="h-6 w-6 mb-2" />
                <span className="text-sm font-medium">Диспуты</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}