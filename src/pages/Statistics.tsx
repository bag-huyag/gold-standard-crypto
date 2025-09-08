import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";

export default function Statistics() {
  const [dateFrom, setDateFrom] = useState("2025-01-01");
  const [dateTo, setDateTo] = useState("2025-01-31");

  const stats = {
    successful: {
      deals: 0,
      processed: 0
    },
    cancelled: {
      deals: 0,
      rejected: 0
    },
    crypto: {
      processed: 0,
      cancelled: 0,
      profit: 0
    },
    fiat: {
      processed: 0,
      cancelled: 0
    },
    total: {
      deals: 0
    }
  };

  const StatCard = ({ 
    title, 
    value, 
    subtitle, 
    icon: Icon, 
    variant = "default" 
  }: { 
    title: string; 
    value: string | number; 
    subtitle: string; 
    icon: any; 
    variant?: "default" | "success" | "warning" | "destructive";
  }) => {
    const variantStyles = {
      default: "bg-card",
      success: "bg-gradient-to-br from-success/10 to-success/5 border-success/20",
      warning: "bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20",
      destructive: "bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20"
    };

    const iconStyles = {
      default: "text-muted-foreground",
      success: "text-success",
      warning: "text-warning",
      destructive: "text-destructive"
    };

    return (
      <Card className={variantStyles[variant]}>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <p className="text-sm font-medium text-muted-foreground">{title}</p>
              <p className="text-2xl font-bold">{value}</p>
              <p className="text-xs text-muted-foreground">{subtitle}</p>
            </div>
            <Icon className={`h-8 w-8 ${iconStyles[variant]}`} />
          </div>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Статистика</h1>
      </div>

      {/* Date Filter */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CalendarDays className="h-5 w-5" />
            Период анализа
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="dateFrom">С</Label>
              <Input
                id="dateFrom"
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateTo">По</Label>
              <Input
                id="dateTo"
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
            <div className="flex items-end">
              <Button className="w-full">
                Применить фильтр
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Успешных сделок"
          value={stats.successful.deals}
          subtitle="Обработано заявок"
          icon={TrendingUp}
          variant="success"
        />
        
        <StatCard
          title="Отменённых сделок"
          value={stats.cancelled.deals}
          subtitle="Отклонено заявок"
          icon={TrendingDown}
          variant="destructive"
        />
        
        <StatCard
          title="Сумма в крипте (обработано)"
          value={`${stats.crypto.processed} USD`}
          subtitle="Успешные заявки"
          icon={DollarSign}
          variant="success"
        />
        
        <StatCard
          title="Сумма в фиате (обработано)"
          value={`${stats.fiat.processed} ₽`}
          subtitle="Успешные заявки"
          icon={DollarSign}
          variant="success"
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Сумма в крипте (отмена)"
          value={`${stats.crypto.cancelled} USD`}
          subtitle="Отклонённые заявки"
          icon={DollarSign}
          variant="destructive"
        />
        
        <StatCard
          title="Сумма в фиате (отмена)"
          value={`${stats.fiat.cancelled} ₽`}
          subtitle="Отклонённые заявки"
          icon={DollarSign}
          variant="destructive"
        />
        
        <StatCard
          title="Прибыль в крипте"
          value={`${stats.crypto.profit} USD`}
          subtitle="Чистая прибыль"
          icon={TrendingUp}
          variant="warning"
        />
        
        <StatCard
          title="Всего сделок"
          value={stats.total.deals}
          subtitle="За период"
          icon={Activity}
          variant="default"
        />
      </div>

      {/* Detailed Statistics */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-success">Обработанные операции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Успешные сделки</span>
              <span className="font-semibold">{stats.successful.deals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Криптовалюта</span>
              <span className="font-semibold">{stats.crypto.processed} USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Фиатные средства</span>
              <span className="font-semibold">{stats.fiat.processed} ₽</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-destructive">Отклоненные операции</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Отменённые сделки</span>
              <span className="font-semibold">{stats.cancelled.deals}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Криптовалюта</span>
              <span className="font-semibold">{stats.crypto.cancelled} USD</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Фиатные средства</span>
              <span className="font-semibold">{stats.fiat.cancelled} ₽</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}