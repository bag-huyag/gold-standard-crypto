import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { CalendarDays, TrendingUp, TrendingDown, DollarSign, Activity } from "lucide-react";
import { RubleIcon } from "@/components/icons/RubleIcon";

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
      default: "bg-gradient-to-br from-muted/50 to-background border-border/50 shadow-lg",
      success: "bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-lg dark:from-emerald-950/20 dark:to-green-950/10 dark:border-emerald-800/30",
      warning: "bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 shadow-lg dark:from-amber-950/20 dark:to-yellow-950/10 dark:border-amber-800/30",
      destructive: "bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-lg dark:from-red-950/20 dark:to-rose-950/10 dark:border-red-800/30"
    };

    const iconStyles = {
      default: "text-primary/70",
      success: "text-emerald-600 dark:text-emerald-400",
      warning: "text-amber-600 dark:text-amber-400",
      destructive: "text-red-600 dark:text-red-400"
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

      {/* Success Statistics - Green Theme */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Успешных сделок"
          value={stats.successful.deals}
          subtitle="Обработано заявок"
          icon={TrendingUp}
          variant="success"
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
          icon={RubleIcon}
          variant="success"
        />
        
        <StatCard
          title="Прибыль в крипте"
          value={`${stats.crypto.profit} USD`}
          subtitle="Чистая прибыль"
          icon={TrendingUp}
          variant="warning"
        />
      </div>

      {/* Failed Statistics - Red Theme & Other */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Отменённых сделок"
          value={stats.cancelled.deals}
          subtitle="Отклонено заявок"
          icon={TrendingDown}
          variant="destructive"
        />
        
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
          icon={RubleIcon}
          variant="destructive"
        />
        
        <StatCard
          title="Всего сделок"
          value={stats.total.deals}
          subtitle="За период"
          icon={Activity}
          variant="default"
        />
      </div>
    </div>
  );
}