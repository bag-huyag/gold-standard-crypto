// components/admin/finance/TransactionsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Mock данные транзакций
  const transactions = [
    { id: "txn_001", date: "2024-09-12 14:30:25", user: "john_trader", type: "deposit", amount: 1000, currency: "USDT", status: "completed", description: "Пополнение кошелька" },
    { id: "txn_002", date: "2024-09-12 13:15:10", user: "sarah_lead", type: "withdrawal", amount: 500, currency: "USDT", status: "pending", description: "Вывод средств" },
    { id: "txn_003", date: "2024-09-12 10:45:30", user: "merchant_one", type: "deposit", amount: 0.5, currency: "BTC", status: "completed", description: "Пополнение кошелька" },
    { id: "txn_004", date: "2024-09-12 09:20:15", user: "platform", type: "fee", amount: 25, currency: "USDT", status: "completed", description: "Комиссия платформы" },
    { id: "txn_005", date: "2024-09-11 16:40:50", user: "john_trader", type: "withdrawal", amount: 200, currency: "USDT", status: "failed", description: "Вывод средств (недостаточно средств)" },
    // ... больше транзакций
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `txn_${String(i + 6).padStart(3, '0')}`,
      date: `2024-09-${10 - Math.floor(i / 5)} ${10 + (i % 5)}:${(i * 12) % 60}:${(i * 7) % 60}`,
      user: i % 4 === 0 ? "john_trader" : i % 4 === 1 ? "sarah_lead" : i % 4 === 2 ? "merchant_one" : "platform",
      type: i % 3 === 0 ? "deposit" : i % 3 === 1 ? "withdrawal" : "fee",
      amount: [100, 500, 1000, 50, 200][i % 5] * (i % 3 === 0 ? 1 : 1),
      currency: i % 2 === 0 ? "USDT" : "BTC",
      status: i % 5 === 0 ? "pending" : i % 5 === 1 ? "failed" : "completed",
      description: i % 3 === 0 ? "Пополнение кошелька" : i % 3 === 1 ? "Вывод средств" : "Комиссия платформы"
    }))
  ];

  // Фильтры
  const [filters, setFilters] = useState({
    user: "all",
    type: "all",
    status: "all",
    currency: "all"
  });

  const filteredTransactions = transactions.filter(txn => {
    return (filters.user === "all" || txn.user === filters.user) &&
           (filters.type === "all" || txn.type === filters.type) &&
           (filters.status === "all" || txn.status === filters.status) &&
           (filters.currency === "all" || txn.currency === filters.currency);
  });

  // Пагинация
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentTransactions = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'completed': return 'default';
      case 'pending': return 'secondary';
      case 'failed': return 'destructive';
      default: return 'outline';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'deposit': return 'text-green-600';
      case 'withdrawal': return 'text-red-600';
      case 'fee': return 'text-orange-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>История транзакций</span>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Экспорт в CSV
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <Label>Пользователь</Label>
              <Select value={filters.user} onValueChange={(value) => setFilters({...filters, user: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все пользователи</SelectItem>
                  <SelectItem value="john_trader">john_trader</SelectItem>
                  <SelectItem value="sarah_lead">sarah_lead</SelectItem>
                  <SelectItem value="merchant_one">merchant_one</SelectItem>
                  <SelectItem value="platform">Платформа</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Тип операции</Label>
              <Select value={filters.type} onValueChange={(value) => setFilters({...filters, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все типы</SelectItem>
                  <SelectItem value="deposit">Пополнение</SelectItem>
                  <SelectItem value="withdrawal">Вывод</SelectItem>
                  <SelectItem value="fee">Комиссия</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Статус</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="completed">Завершено</SelectItem>
                  <SelectItem value="pending">В обработке</SelectItem>
                  <SelectItem value="failed">Ошибка</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Валюта</Label>
              <Select value={filters.currency} onValueChange={(value) => setFilters({...filters, currency: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все валюты</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="h-4 w-4 mr-2" />
                Фильтровать
              </Button>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по ID транзакции или описанию..."
              className="pl-9"
            />
          </div>

          {/* Таблица транзакций */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID транзакции</TableHead>
                  <TableHead>Дата и время</TableHead>
                  <TableHead>Пользователь</TableHead>
                  <TableHead>Тип</TableHead>
                  <TableHead>Сумма</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Описание</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTransactions.map((txn) => (
                  <TableRow key={txn.id}>
                    <TableCell className="font-mono text-xs">{txn.id}</TableCell>
                    <TableCell>{txn.date}</TableCell>
                    <TableCell>{txn.user}</TableCell>
                    <TableCell className={getTypeColor(txn.type)}>
                      {txn.type === 'deposit' ? 'Пополнение' : 
                       txn.type === 'withdrawal' ? 'Вывод' : 'Комиссия'}
                    </TableCell>
                    <TableCell>
                      {txn.type === 'deposit' ? '+' : txn.type === 'withdrawal' ? '-' : ''}{txn.amount} {txn.currency}
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusVariant(txn.status)}>
                        {txn.status === 'completed' ? 'Завершено' : 
                         txn.status === 'pending' ? 'В обработке' : 'Ошибка'}
                      </Badge>
                    </TableCell>
                    <TableCell>{txn.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} из {filteredTransactions.length} транзакций
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
                Назад
              </Button>
              <span className="text-sm">
                Страница {currentPage} из {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Вперёд
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}