// components/admin/finance/PaymentDetailsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { CreditCard, Plus, Search, Edit, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function PaymentDetailsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Mock данные
  const paymentDetails = [
    {
      id: "ae871c06...f0f2",
      trader: { name: "Shrayder", id: "9d61a677...4b84", initial: "S" },
      bank: { name: "Сбербанк", owner: "Пономарев Владислав Павлович", card: "2202206901098942" },
      limits: { min: 5000, max: 100000, dayLimit: 10000000, monthLimit: 10000000, concurrent: 50, dayCount: 10000000, monthCount: 1000000, interval: 0 },
      status: "disabled"
    },
    {
      id: "fffe8816...b3eb",
      trader: { name: "Lightning's23", id: "f506a0e7...d788", initial: "L" },
      bank: { name: "Т-Банк", owner: "Магомед Темирбекович", phone: "+79696650172" },
      limits: { min: 9000, max: 20000, dayLimit: 25000, monthLimit: 1000000, concurrent: 3, dayCount: 2, monthCount: 1000000, interval: 20 },
      status: "enabled"
    },
    // ... больше данных для пагинации
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `mock-${i+3}...${String(i).padStart(4, '0')}`,
      trader: { name: `Trader${i+3}`, id: `${i+3}...id`, initial: String.fromCharCode(65 + (i % 26)) },
      bank: { name: i % 2 === 0 ? "Сбербанк" : "Т-Банк", owner: `Owner ${i+3}`, 
              card: i % 2 === 0 ? `220220690${String(i).padStart(7, '0')}` : undefined, 
              phone: i % 2 === 1 ? `+7969665${String(i).padStart(4, '0')}` : undefined },
      limits: { min: 1000 + i * 500, max: 50000 + i * 1000, dayLimit: 100000, monthLimit: 1000000, 
                concurrent: 5 + i, dayCount: 100, monthCount: 1000, interval: i },
      status: i % 3 === 0 ? "disabled" : "enabled"
    }))
  ];

  // Пагинация
  const totalPages = Math.ceil(paymentDetails.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = paymentDetails.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CreditCard className="h-5 w-5" />
              <span>Управление реквизитами</span>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Добавить реквизиты
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label>Трейдер/Тимлид:</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="shrayder">Shrayder</SelectItem>
                  <SelectItem value="lightning">Lightning's23</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Банк:</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="sberbank">Сбербанк</SelectItem>
                  <SelectItem value="tbank">Т-Банк</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Платежная система:</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="sberbank">Сбербанк</SelectItem>
                  <SelectItem value="tbank">Т-Банк</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label>Статус:</Label>
              <Select defaultValue="all">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все</SelectItem>
                  <SelectItem value="enabled">Включен</SelectItem>
                  <SelectItem value="disabled">Выключен</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по ID, имени трейдера или реквизитам..."
              className="pl-9"
            />
          </div>

          {/* Таблица */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Трейдер</TableHead>
                  <TableHead>Банк</TableHead>
                  <TableHead>Ограничения</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentItems.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-mono text-xs">{item.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xs font-medium">{item.trader.initial}</span>
                        </div>
                        <div>
                          <div className="font-medium">{item.trader.name}</div>
                          <div className="text-xs text-muted-foreground">{item.trader.id}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.bank.name}</div>
                        <div className="text-sm text-muted-foreground">{item.bank.owner}</div>
                        {item.bank.card && (
                          <div className="text-sm text-muted-foreground">Карта: {item.bank.card}</div>
                        )}
                        {item.bank.phone && (
                          <div className="text-sm text-muted-foreground">Телефон: {item.bank.phone}</div>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm space-y-1">
                        <div>Мин: {item.limits.min} Макс: {item.limits.max}</div>
                        <div>В день: {item.limits.dayLimit} В месяц: {item.limits.monthLimit}</div>
                        <div>Одновр. заказов: {item.limits.concurrent}</div>
                        <div>Кол-во в день: {item.limits.dayCount}</div>
                        <div>Кол-во в месяц: {item.limits.monthCount}</div>
                        <div>Интервал между сделками (мин): {item.limits.interval}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={item.status === "enabled" ? "default" : "destructive"}>
                        {item.status === "enabled" ? "Включен" : "Выключен"}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Edit className="h-4 w-4 mr-1" />
                          Изменить
                        </Button>
                        <Button variant="destructive" size="sm">
                          <Trash2 className="h-4 w-4 mr-1" />
                          Удалить
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, paymentDetails.length)} из {paymentDetails.length} записей
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