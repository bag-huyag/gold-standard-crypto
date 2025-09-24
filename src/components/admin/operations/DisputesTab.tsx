// components/admin/operations/DisputesTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export default function DisputesTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDispute, setSelectedDispute] = useState<any>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const itemsPerPage = 5;

  const [filters, setFilters] = useState({
    status: "all",
    trader: "all",
    merchant: "all"
  });

  // Упрощенные данные диспутов
  const disputes = [
    {
      id: "dfa176c4-29b6-4ffb-ad2a-035c00538892",
      status: "Открыт",
      reason: "WRONG_AMOUNT",
      trader: "obsthandler",
      merchant: "biwire_finance",
      amount: { rub: 2007, crypto: 25.342829 },
      created: "12.09 14:30",
      autoAccept: "Истекло"
    },
    {
      id: "xyz789ab-29b6-4ffb-ad2a-035c00538123",
      status: "Заморожен",
      reason: "PAYMENT_NOT_RECEIVED",
      trader: "john_trader",
      merchant: "crypto_exchange",
      amount: { rub: 5000, crypto: 62.5 },
      created: "12.09 13:15",
      autoAccept: "2 дня"
    },
    // ... больше диспутов
    ...Array.from({ length: 15 }, (_, i) => ({
      id: `dispute-${i + 3}`,
      status: i % 3 === 0 ? "Открыт" : i % 3 === 1 ? "Заморожен" : "Закрыт",
      reason: i % 2 === 0 ? "WRONG_AMOUNT" : "PAYMENT_NOT_RECEIVED",
      trader: i % 3 === 0 ? "obsthandler" : i % 3 === 1 ? "john_trader" : "mike_trader",
      merchant: i % 2 === 0 ? "biwire_finance" : "crypto_exchange",
      amount: { rub: 1000 + i * 100, crypto: 10 + i },
      created: `12.09 ${10 + (i % 10)}:${(i * 5) % 60}`,
      autoAccept: i % 2 === 0 ? "Истекло" : `${i} дней`
    }))
  ];

  const filteredDisputes = disputes.filter(dispute => {
    return (filters.status === "all" || dispute.status === filters.status) &&
           (filters.trader === "all" || dispute.trader === filters.trader) &&
           (filters.merchant === "all" || dispute.merchant === filters.merchant);
  });

  const totalPages = Math.ceil(filteredDisputes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentDisputes = filteredDisputes.slice(startIndex, startIndex + itemsPerPage);

  const getStatusVariant = (status: string) => {
    switch (status) {
      case 'Открыт': return 'secondary';
      case 'Заморожен': return 'default';
      case 'Закрыт': return 'destructive';
      default: return 'outline';
    }
  };

  const openDisputeDetails = (dispute: any) => {
    setSelectedDispute(dispute);
    setIsDetailOpen(true);
  };

  const handleDisputeAction = (action: string) => {
    console.log(`Действие с диспутом ${selectedDispute.id}: ${action}`);
    // API вызов
    setIsDetailOpen(false);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Управление диспутами</span>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
            <div>
              <Label className="text-sm">Статус</Label>
              <Select value={filters.status} onValueChange={(value) => setFilters({...filters, status: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все статусы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все статусы</SelectItem>
                  <SelectItem value="Открыт">Открыты</SelectItem>
                  <SelectItem value="Заморожен">Заморожены</SelectItem>
                  <SelectItem value="Закрыт">Закрыты</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-sm">Трейдер</Label>
              <Select value={filters.trader} onValueChange={(value) => setFilters({...filters, trader: value})}>
                <SelectTrigger>
                  <SelectValue placeholder="Все трейдеры" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все трейдеры</SelectItem>
                  <SelectItem value="obsthandler">obsthandler</SelectItem>
                  <SelectItem value="john_trader">john_trader</SelectItem>
                  <SelectItem value="mike_trader">mike_trader</SelectItem>
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
            <div className="flex items-end">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setFilters({status: "all", trader: "all", merchant: "all"})}
              >
                Сбросить
              </Button>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по ID диспута или ID сделки..."
              className="pl-9"
            />
          </div>

          {/* Упрощенная таблица диспутов */}
          <div className="space-y-4">
            {currentDisputes.map((dispute) => (
              <Card key={dispute.id} className="p-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center gap-4">
                      <Badge variant={getStatusVariant(dispute.status)}>
                        {dispute.status}
                      </Badge>
                      <span className="font-mono text-sm">{dispute.id}</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="font-medium">Трейдер:</span> {dispute.trader}
                      </div>
                      <div>
                        <span className="font-medium">Мерчант:</span> {dispute.merchant}
                      </div>
                      <div>
                        <span className="font-medium">Причина:</span> {dispute.reason}
                      </div>
                      <div>
                        <span className="font-medium">Сумма:</span> {dispute.amount.rub} ₽
                      </div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Создан: {dispute.created} • До автопринятия: {dispute.autoAccept}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => openDisputeDetails(dispute)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Детали
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Пагинация */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Показано {startIndex + 1}-{Math.min(startIndex + itemsPerPage, filteredDisputes.length)} из {filteredDisputes.length} диспутов
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

      {/* Диалог деталей диспута */}
      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Детали диспута</DialogTitle>
            <DialogDescription>
              ID: {selectedDispute?.id}
            </DialogDescription>
          </DialogHeader>
          {selectedDispute && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-semibold">Информация о диспуте</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Статус:</span> 
                      <Badge variant={getStatusVariant(selectedDispute.status)} className="ml-2">
                        {selectedDispute.status}
                      </Badge>
                    </div>
                    <div><span className="font-medium">Причина:</span> {selectedDispute.reason}</div>
                    <div><span className="font-medium">Сумма диспута (₽):</span> {selectedDispute.amount.rub}</div>
                    <div><span className="font-medium">Сумма диспута (крипто):</span> {selectedDispute.amount.crypto}</div>
                    <div><span className="font-medium">До автопринятия:</span> {selectedDispute.autoAccept}</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Участники</h4>
                  <div className="space-y-2 text-sm">
                    <div><span className="font-medium">Трейдер:</span> {selectedDispute.trader}</div>
                    <div><span className="font-medium">Мерчант:</span> {selectedDispute.merchant}</div>
                    <div><span className="font-medium">Создан:</span> {selectedDispute.created}</div>
                  </div>
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-semibold mb-3">Действия</h4>
                <div className="flex gap-2 flex-wrap">
                  {selectedDispute.status === "Открыт" && (
                    <>
                      <Button onClick={() => handleDisputeAction("close")}>
                        Закрыть
                      </Button>
                      <Button variant="outline" onClick={() => handleDisputeAction("cancel")}>
                        Отменить
                      </Button>
                      <Button variant="outline" onClick={() => handleDisputeAction("freeze")}>
                        Заморозить
                      </Button>
                    </>
                  )}
                  {selectedDispute.status === "Заморожен" && (
                    <>
                      <Button onClick={() => handleDisputeAction("complete")}>
                        Завершить
                      </Button>
                      <Button variant="outline" onClick={() => handleDisputeAction("reject")}>
                        Отклонить
                      </Button>
                    </>
                  )}
                  <Button variant="outline">Просмотреть доказательства</Button>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}