import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Crown, Wallet, TrendingUp, Calendar, Filter, Eye, CheckCircle, XCircle, CircleDollarSign } from "lucide-react";
import { useState } from "react";

// Mock data for teams
const mockTeams = [
  {
    id: 1,
    name: "Команда Альфа",
    commissionRate: 15,
    commissionReduction: 2,
    dealsProcessed: 45,
    earnings: 67500,
    stats: {
      successfulDeals: 42,
      cryptoProcessed: 1250000,
      fiatProcessed: 3200000,
      cryptoProfit: 125000,
      cancelledDeals: 3,
      cryptoCancelled: 45000,
      fiatCancelled: 120000,
      totalDeals: 45
    }
  },
  {
    id: 2,
    name: "Команда Бета",
    commissionRate: 12,
    commissionReduction: 1.5,
    dealsProcessed: 38,
    earnings: 54000,
    stats: {
      successfulDeals: 36,
      cryptoProcessed: 980000,
      fiatProcessed: 2800000,
      cryptoProfit: 98000,
      cancelledDeals: 2,
      cryptoCancelled: 32000,
      fiatCancelled: 95000,
      totalDeals: 38
    }
  },
  {
    id: 3,
    name: "Команда Гамма",
    commissionRate: 18,
    commissionReduction: 3,
    dealsProcessed: 52,
    earnings: 93600,
    stats: {
      successfulDeals: 49,
      cryptoProcessed: 1500000,
      fiatProcessed: 4100000,
      cryptoProfit: 187000,
      cancelledDeals: 3,
      cryptoCancelled: 58000,
      fiatCancelled: 145000,
      totalDeals: 52
    }
  },
  {
    id: 4,
    name: "Команда Дельта",
    commissionRate: 14,
    commissionReduction: 2.5,
    dealsProcessed: 29,
    earnings: 40600,
    stats: {
      successfulDeals: 27,
      cryptoProcessed: 750000,
      fiatProcessed: 2100000,
      cryptoProfit: 81200,
      cancelledDeals: 2,
      cryptoCancelled: 28000,
      fiatCancelled: 75000,
      totalDeals: 29
    }
  },
  {
    id: 5,
    name: "Команда Омега",
    commissionRate: 16,
    commissionReduction: 2.2,
    dealsProcessed: 41,
    earnings: 65600,
    stats: {
      successfulDeals: 39,
      cryptoProcessed: 1100000,
      fiatProcessed: 3500000,
      cryptoProfit: 131200,
      cancelledDeals: 2,
      cryptoCancelled: 35000,
      fiatCancelled: 110000,
      totalDeals: 41
    }
  },
  {
    id: 6,
    name: "Команда Сигма",
    commissionRate: 13,
    commissionReduction: 1.8,
    dealsProcessed: 33,
    earnings: 42900,
    stats: {
      successfulDeals: 31,
      cryptoProcessed: 850000,
      fiatProcessed: 2600000,
      cryptoProfit: 85800,
      cancelledDeals: 2,
      cryptoCancelled: 25000,
      fiatCancelled: 80000,
      totalDeals: 33
    }
  },
];

export default function TeamLead() {
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedTeam, setSelectedTeam] = useState<any>(null);

  const totalBalance = mockTeams.reduce((sum, team) => sum + team.earnings, 0);
  const totalDeals = mockTeams.reduce((sum, team) => sum + team.dealsProcessed, 0);

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
      <div className="grid grid-cols-1 gap-4">
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
                  <TableHead className="text-center">Урезание процента</TableHead>
                  <TableHead className="text-center">Обработано сделок</TableHead>
                  <TableHead className="text-right">Заработок</TableHead>
                  <TableHead className="text-center">Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockTeams.map((team) => (
                  <TableRow key={team.id}>
                    <TableCell className="font-medium">{team.name}</TableCell>
                    <TableCell className="text-center">
                      <Badge variant="secondary">{team.commissionRate}%</Badge>
                    </TableCell>
                    <TableCell className="text-center">
                      <Badge variant="outline">{team.commissionReduction}%</Badge>
                    </TableCell>
                    <TableCell className="text-center font-medium">
                      {team.dealsProcessed}
                    </TableCell>
                    <TableCell className="text-right font-medium">
                      {team.earnings.toLocaleString()} ₽
                    </TableCell>
                    <TableCell className="text-center">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="outline" size="sm" onClick={() => setSelectedTeam(team)}>
                            <Eye className="h-4 w-4 mr-1" />
                            Подробнее
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                          <DialogHeader>
                            <DialogTitle>Статистика команды: {team.name}</DialogTitle>
                          </DialogHeader>
                          {selectedTeam && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <CheckCircle className="h-5 w-5 text-green-600" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Успешных сделок</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.successfulDeals}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <CircleDollarSign className="h-5 w-5 text-primary" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Сумма в крипте (обработано)</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.cryptoProcessed.toLocaleString()} ₽</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-primary" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Сумма в фиате (обработано)</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.fiatProcessed.toLocaleString()} ₽</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <Wallet className="h-5 w-5 text-green-600" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Прибыль в крипте</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.cryptoProfit.toLocaleString()} ₽</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <XCircle className="h-5 w-5 text-red-600" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Отменённых сделок</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.cancelledDeals}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <CircleDollarSign className="h-5 w-5 text-red-600" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Сумма в крипте (отмена)</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.cryptoCancelled.toLocaleString()} ₽</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <TrendingUp className="h-5 w-5 text-red-600" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Сумма в фиате (отмена)</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.fiatCancelled.toLocaleString()} ₽</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>

                              <Card>
                                <CardContent className="p-4">
                                  <div className="flex items-center space-x-2">
                                    <CircleDollarSign className="h-5 w-5 text-primary" />
                                    <div className="space-y-1">
                                      <p className="text-sm font-medium text-muted-foreground">Всего сделок</p>
                                      <p className="text-xl font-bold">{selectedTeam.stats.totalDeals}</p>
                                    </div>
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          )}
                        </DialogContent>
                      </Dialog>
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