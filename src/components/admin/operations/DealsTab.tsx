// components/admin/operations/DealsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function DealsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDeal, setSelectedDeal] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 10;

  const [filters, setFilters] = useState({
    trader: "all",
    merchant: "all",
    status: "all",
    type: "all",
    bank: "all"
  });

  // Упрощенные данные сделок
  const deals = [
    {
      id: "0e33...2294",
      amount: { rub: 15042, crypto: 178.075056, rate: 84.47 },
      merchant: { name: "biwire_finance", id: "4558...8109" },
      merchantOrderId: "5f8c9774-7023-486b-ad34-2d56a4e10318",
      trader: { name: "Lightning's23", id: "f506...d788" },
      created: "12.09 19:47",
      timer: "6м 6с",
      status: "PENDING",
      bank: "Т-Банк",
      paymentSystem: "SBP"
    },
    // ... больше сделок
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `deal-${i + 2}`,
      amount: { 
        rub: 10000 + i * 500, 
        crypto: 100 + i * 5, 
        rate: 84 + i * 0.1 
      },
      merchant: { 
        name: i % 2 === 0 ? "biwire_finance" : "crypto_exchange", 
        id: `merchant-${i + 2}` 
      },
      merchantOrderId: `order-${i + 2}`,
      trader: { 
        name: i % 3 === 0 ? "Lightning's23" : i % 3 === 1 ? "Puldorovich" : "john_trader", 
        id: `trader-${i + 2}` 
      },
      created: `12.09 ${19 - Math.floor(i / 5)}:${(47 - i * 3) % 60}`,
      timer: `${i + 1}м ${(i * 10) % 60}с`,
      status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "COMPLETED" : "CANCELLED",
      bank: i % 2 === 0 ? "Т-Банк" : "Сбербанк",
      paymentSystem: i % 2 === 0 ? "SBP" : "CARD"
    }))
  ];

  const filteredDeals = deals.filter(deal => {
    return (filters.trader === "all" || deal.trader.name.includes(filters.trader)) &&
           (filters.merchant === "all" || deal.merchant.name === filters.merchant) &&
           (filters.status === "all" || deal.status === filters.status) &&
           (filters.bank === "all" || deal.bank === filters.bank);
  });

  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDeals = filteredDeals.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'PENDING': return 'secondary';
      case 'COMPLETED': return 'default';
      case 'CANCELLED': return 'destructive';
      default: return 'outline';
    }
  };

  const openDealDetails = (deal: any) => {
    setSelectedDeal(deal);
    setIsDetailOpen(true);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Управление сделками</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
              <Button variant="outline" size="sm">
                Экспорт
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-4 border rounded-lg">
            <div>
              <Label className="text-sm">Трейдер</Label>
              <Select value={filters.trader} onValueChange={(value) => setFilters({...filters, trader: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все трейдеры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все трейдеры</SelectItem>
                  <SelectItem value="Lightning's23">Lightning's23</SelectItem>
                  <SelectItem value="Puldorovich">Puldorovich</SelectItem>
                  <SelectItem value="john_trader">john_trader</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Мерчант</Label>
              <Select value={filters.merchant} onValueChange={(value) => setFilters({...filters, merchant: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все мерчанты" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все мерчанты</SelectItem>
                  <SelectItem value="biwire_finance">biwire_finance</SelectItem>
                  <SelectItem value="crypto_exchange">crypto_exchange</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Статус</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="PENDING">PENDING</SelectItem>
                  <SelectItem value="COMPLETED">COMPLETED</SelectItem>
                  <SelectItem value="CANCELLED">CANCELLED</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Банк</Label>
              <Select value={filters.bank} onValueChange={(value) => setFilters({...filters, bank: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все банки" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все банки</SelectItem>
                  <SelectItem value="Т-Банк">Т-Банк</SelectItem>
                  <SelectItem value="Сбербанк">Сбербанк</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters({trader: "all", merchant: "all", status: "all", type: "all", bank: "all"})}
              >
                Сбросить
              </Button>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по ID сделки или Merchant Order ID..."
              className="pl-9"
            />
          </div>

          {/* Упрощенная таблица сделок */}
          <div className="border rounded-lg">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left font-medium">ID сделки</th>
                    <th className="h-12 px-4 text-left font-medium">Сумма (₽)</th>
                    <th className="h-12 px-4 text-left font-medium">Мерчант</th>
                    <th className="h-12 px-4 text-left font-medium">Трейдер</th>
                    <th className="h-12 px-4 text-left font-medium">Создана</th>
                    <th className="h-12 px-4 text-left font-medium">Таймер</th>
                    <th className="h-12 px-4 text-left font-medium">Статус</th>
                    <th className="h-12 px-4 text-left font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {currentDeals.map((deal) => (
                    <tr key={deal.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4 font-mono text-xs">{deal.id}</td>
                      <td className="p-4 font-medium">{deal.amount.rub.toLocaleString()} ₽</td>
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{deal.merchant.name}</div>
                          <div className="text-xs text-muted-foreground">{deal.merchantOrderId}</div>
                        </div>
                      </td>
                      <td className="p-4">{deal.trader.name}</td>
                      <td className="p-4">{deal.created}</td>
                      <td className="p-4">{deal.timer}</td>
                      <td className="p-4">
                        <Badge variant={getStatusVariant(deal.status)}>
                          {deal.status}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => openDealDetails(deal)}
                        >
                          <Eye className="h-4 w-4 mr-1" />
                          Детали
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDeals.length)} из {filteredDeals.length} сделок
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

      {/* Диалог деталей сделки */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Детали сделки</DialogTitle>
          </DialogHeader>
          {selectedDeal && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Основная информация</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">ID сделки:</span> {selectedDeal.id}</div>
                    <div><span className="font-medium">Merchant Order ID:</span> {selectedDeal.merchantOrderId}</div>
                    <div><span className="font-medium">Статус:</span> 
                      <Badge variant={getStatusVariant(selectedDeal.status)} className="ml-2">
                        {selectedDeal.status}
                      </Badge>
                    </div>
                    <div><span className="font-medium">Таймер:</span> {selectedDeal.timer}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Финансовая информация</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Сумма (₽):</span> {selectedDeal.amount.rub.toLocaleString()} ₽</div>
                    <div><span className="font-medium">Сумма (крипто):</span> {selectedDeal.amount.crypto} USD</div>
                    <div><span className="font-medium">Курс:</span> {selectedDeal.amount.rate}</div>
                    <div><span className="font-medium">Банк:</span> {selectedDeal.bank}</div>
                    <div><span className="font-medium">Платежная система:</span> {selectedDeal.paymentSystem}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Участники</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Трейдер:</span> {selectedDeal.trader.name}</div>
                    <div><span className="font-medium">ID трейдера:</span> {selectedDeal.trader.id}</div>
                    <div><span className="font-medium">Мерчант:</span> {selectedDeal.merchant.name}</div>
                    <div><span className="font-medium">ID мерчанта:</span> {selectedDeal.merchant.id}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Временные метки</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Создана:</span> {selectedDeal.created}</div>
                    <div><span className="font-medium">Обновлена:</span> {selectedDeal.created}</div>
                  </div>
                </div>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button variant="outline">Экспорт данных</Button>
                <Button variant="outline">Открыть диспут</Button>
                {selectedDeal.status === "PENDING" && (
                  <Button variant="destructive">Отменить сделку</Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}