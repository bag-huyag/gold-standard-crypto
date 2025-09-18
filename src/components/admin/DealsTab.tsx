import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Handshake } from "lucide-react";
import { allDeals } from "@/data/mockData";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "./PaginationControls";

export function DealsTab() {
  const {
    currentPage,
    totalPages,
    paginatedData: currentDeals,
    goToPage,
    nextPage,
    prevPage
  } = usePagination(allDeals, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Handshake className="h-5 w-5" />
          Управление сделками
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[120px]">ID</TableHead>
                <TableHead className="min-w-[150px]">Банк</TableHead>
                <TableHead className="min-w-[120px]">Код</TableHead>
                <TableHead className="min-w-[120px]">Платежка</TableHead>
                <TableHead className="min-w-[200px]">Владелец</TableHead>
                <TableHead className="min-w-[150px]">Реквизиты</TableHead>
                <TableHead className="min-w-[120px]">Сумма ₽</TableHead>
                <TableHead className="min-w-[120px]">Крипто</TableHead>
                <TableHead className="min-w-[100px]">Курс</TableHead>
                <TableHead className="min-w-[150px]">Мерчант</TableHead>
                <TableHead className="min-w-[200px]">Merchant Order ID</TableHead>
                <TableHead className="min-w-[150px]">Трейдер</TableHead>
                <TableHead className="min-w-[120px]">Создано UTC</TableHead>
                <TableHead className="min-w-[120px]">Создано</TableHead>
                <TableHead className="min-w-[120px]">Обновлено UTC</TableHead>
                <TableHead className="min-w-[120px]">Обновлено</TableHead>
                <TableHead className="min-w-[100px]">Таймер</TableHead>
                <TableHead className="min-w-[120px]">Статус</TableHead>
                <TableHead className="min-w-[150px]">Действие</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDeals.map((deal) => (
                <TableRow key={deal.id}>
                  <TableCell className="font-mono text-xs">{deal.id}</TableCell>
                  <TableCell>{deal.bankDetails.bank}</TableCell>
                  <TableCell>{deal.bankDetails.code}</TableCell>
                  <TableCell>{deal.bankDetails.paymentSystem}</TableCell>
                  <TableCell>{deal.bankDetails.owner}</TableCell>
                  <TableCell>{deal.bankDetails.requisites}</TableCell>
                  <TableCell>{deal.amount.rub.toLocaleString()}</TableCell>
                  <TableCell>{deal.amount.crypto}</TableCell>
                  <TableCell>{deal.amount.rate}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.merchant.name}</div>
                      <div className="text-xs text-muted-foreground">{deal.merchant.id}</div>
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{deal.merchantOrderId}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{deal.trader.name}</div>
                      <div className="text-xs text-muted-foreground">{deal.trader.id}</div>
                    </div>
                  </TableCell>
                  <TableCell>{deal.created.utc}</TableCell>
                  <TableCell>{deal.created.local}</TableCell>
                  <TableCell>{deal.updated.utc}</TableCell>
                  <TableCell>{deal.updated.local}</TableCell>
                  <TableCell>{deal.timer}</TableCell>
                  <TableCell>
                    <Badge variant={
                      deal.status === "PENDING" ? "secondary" : 
                      deal.status === "COMPLETED" ? "default" : "destructive"
                    }>
                      {deal.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-mono text-xs">{deal.action}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={goToPage}
          onPrevious={prevPage}
          onNext={nextPage}
        />
      </CardContent>
    </Card>
  );
}