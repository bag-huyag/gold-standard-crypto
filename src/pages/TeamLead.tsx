import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Crown, Wallet, Users, TrendingUp, Percent, Calendar, Filter } from "lucide-react";
import { useState } from "react";

// Mock data for teams
const mockTeams = [
  {
    id: 1,
    name: "Команда Альфа",
    commissionRate: 15,
    dealsProcessed: 45,
    earnings: 67500,
  },
  {
    id: 2,
    name: "Команда Бета",
    commissionRate: 12,
    dealsProcessed: 38,
    earnings: 54000,
  },
  {
    id: 3,
    name: "Команда Гамма",
    commissionRate: 18,
    dealsProcessed: 52,
    earnings: 93600,
  },
  {
    id: 4,
    name: "Команда Дельта",
    commissionRate: 14,
    dealsProcessed: 29,
    earnings: 40600,
  },
  {
    id: 5,
    name: "Команда Омега",
    commissionRate: 16,
    dealsProcessed: 41,
    earnings: 65600,
  },
  {
    id: 6,
    name: "Команда Сигма",
    commissionRate: 13,
    dealsProcessed: 33,
    earnings: 42900,
  },
];

export default function TeamLead() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const totalBalance = mockTeams.reduce((sum, team) => sum + team.earnings, 0);
  const totalDeals = mockTeams.reduce((sum, team) => sum + team.dealsProcessed, 0);
  const activeTeams = mockTeams.length;
  const avgCommission = Math.round(mockTeams.reduce((sum, team) => sum + team.commissionRate, 0) / mockTeams.length);

  const setQuickFilter = (days: number) => {
    const today = new Date();
    const fromDate = new Date(today);
    fromDate.setDate(today.getDate() - days);
    
    setDateFrom(fromDate.toISOString().split('T')[0]);
    setDateTo(today.toISOString().split('T')[0]);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Crown className="h-8 w-8 text-warning" />
          Кабинет тимлида
        </h1>
      </div>

      {/* Date Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Фильтры по периоду
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-end">
            <div className="flex flex-col sm:flex-row gap-4 flex-1">
              <div className="space-y-2">
                <Label htmlFor="date-from">От</Label>
                <Input
                  id="date-from"
                  type="date"
                  value={dateFrom}
                  onChange={(e) => setDateFrom(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="date-to">До</Label>
                <Input
                  id="date-to"
                  type="date"
                  value={dateTo}
                  onChange={(e) => setDateTo(e.target.value)}
                  className="w-full sm:w-auto"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => setQuickFilter(0)}>
                Сегодня
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickFilter(7)}>
                Неделя
              </Button>
              <Button variant="outline" size="sm" onClick={() => setQuickFilter(30)}>
                Месяц
              </Button>
              <Button className="flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Применить
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Wallet className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Общий баланс</p>
                <p className="text-2xl font-bold">{totalBalance.toLocaleString()} ₽</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Users className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Активных команд</p>
                <p className="text-2xl font-bold">{activeTeams}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Обработано сделок</p>
                <p className="text-2xl font-bold">{totalDeals}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-2">
              <Percent className="h-5 w-5 text-primary" />
              <div className="space-y-1">
                <p className="text-sm font-medium text-muted-foreground">Средняя ставка</p>
                <p className="text-2xl font-bold">{avgCommission}%</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Teams Table */}
      <Card>
        <CardHeader>
          <CardTitle>Команды</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Название команды</TableHead>
                  <TableHead className="text-center">Процентная ставка</TableHead>
                  <TableHead className="text-center">Обработано сделок</TableHead>
                  <TableHead className="text-right">Заработок</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{team.commissionRate}%</Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {team.dealsProcessed}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {team.earnings.toLocaleString()} ₽
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}