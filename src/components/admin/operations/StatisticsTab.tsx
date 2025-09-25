// components/admin/operations/StatisticsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { CalendarIcon, Download } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { useState } from "react";

export default function StatisticsTab() {
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [selectedUser, setSelectedUser] = useState("all");

  // Mock данные для графиков
  const tradeData = [
    { date: '01.09', successful: 12, cancelled: 2, total: 14 },
    { date: '02.09', successful: 15, cancelled: 1, total: 16 },
    { date: '03.09', successful: 18, cancelled: 3, total: 21 },
    { date: '04.09', successful: 10, cancelled: 0, total: 10 },
    { date: '05.09', successful: 22, cancelled: 2, total: 24 },
    { date: '06.09', successful: 17, cancelled: 1, total: 18 },
    { date: '07.09', successful: 19, cancelled: 4, total: 23 },
  ];

  const revenueData = [
    { date: '01.09', crypto: 1200, fiat: 100000 },
    { date: '02.09', crypto: 1500, fiat: 125000 },
    { date: '03.09', crypto: 1800, fiat: 150000 },
    { date: '04.09', crypto: 1000, fiat: 80000 },
    { date: '05.09', crypto: 2200, fiat: 180000 },
    { date: '06.09', crypto: 1700, fiat: 140000 },
    { date: '07.09', crypto: 1900, fiat: 160000 },
  ];

  const userStats = {
    totalTrades: 1247,
    successfulTrades: 1180,
    cancelledTrades: 67,
    totalCrypto: 125430,
    totalFiat: 10450000,
    profitCrypto: 12543,
    profitFiat: 1045000
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Статистика платформы</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Экспорт
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="user-select">Пользователь:</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Все пользователи" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все пользователи</SelectItem>
                  <SelectItem value="user1">adus20091 (TRADER)</SelectItem>
                  <SelectItem value="user2">Lightning's23 (TRADER)</SelectItem>
                  <SelectItem value="user3">merchant_one (MERCHANT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Дата с:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div>
              <Label>Дата по:</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full justify-start text-left font-normal">
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="flex items-end">
              <Button className="w-full" onClick={() => {
                setDateFrom(undefined);
                setDateTo(undefined);
                setSelectedUser("all");
              }}>
                Сбросить
              </Button>
            </div>
          </div>

          {/* Ключевые метрики */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Всего сделок</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalTrades}</div>
                <p className="text-xs text-muted-foreground">
                  +12% за период
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Успешные сделки</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.successfulTrades}</div>
                <p className="text-xs text-muted-foreground">
                  {((userStats.successfulTrades / userStats.totalTrades) * 100).toFixed(1)}% успеха
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Оборот в крипто</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalCrypto} USD</div>
                <p className="text-xs text-muted-foreground">
                  +8.5% за период
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Оборот в фиате</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{userStats.totalFiat.toLocaleString()} ₽</div>
                <p className="text-xs text-muted-foreground">
                  +7.2% за период
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Графики */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Динамика сделок</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={tradeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="successful" fill="#10b981" name="Успешные" />
                    <Bar dataKey="cancelled" fill="#ef4444" name="Отмененные" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Динамика оборотов</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={revenueData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line yAxisId="left" type="monotone" dataKey="crypto" stroke="#3b82f6" name="Крипто (USD)" />
                    <Line yAxisId="right" type="monotone" dataKey="fiat" stroke="#8b5cf6" name="Фиат (₽)" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Дополнительная статистика */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Прибыль</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Прибыль в крипто:</span>
                    <span className="font-bold text-green-600">+{userStats.profitCrypto} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Прибыль в фиате:</span>
                    <span className="font-bold text-green-600">+{userStats.profitFiat.toLocaleString()} ₽</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Общая прибыль:</span>
                    <span className="font-bold">~{userStats.profitFiat + userStats.profitCrypto * 80} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Эффективность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Конверсия:</span>
                    <span className="font-bold">{((userStats.successfulTrades / userStats.totalTrades) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Средний чек (крипто):</span>
                    <span className="font-bold">{(userStats.totalCrypto / userStats.successfulTrades).toFixed(2)} USD</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Средний чек (фиат):</span>
                    <span className="font-bold">{(userStats.totalFiat / userStats.successfulTrades).toLocaleString()} ₽</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}