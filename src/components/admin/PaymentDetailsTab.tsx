import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { CreditCard } from "lucide-react";
import { mockBankingDetails } from "@/data/mockData";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "./PaginationControls";

export function PaymentDetailsTab() {
  const {
    currentPage,
    totalPages,
    paginatedData: currentBankingDetails,
    goToPage,
    nextPage,
    prevPage
  } = usePagination(mockBankingDetails, 10);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <CreditCard className="h-5 w-5" />
          Банковские реквизиты
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for adding new banking details */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Добавить реквизиты</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <Label htmlFor="bank-name">Банк</Label>
              <Input id="bank-name" placeholder="Название банка" />
            </div>
            <div>
              <Label htmlFor="owner-name">Владелец</Label>
              <Input id="owner-name" placeholder="ФИО владельца" />
            </div>
            <div>
              <Label htmlFor="phone-number">Телефон</Label>
              <Input id="phone-number" placeholder="+7 (xxx) xxx-xx-xx" />
            </div>
            <div>
              <Label htmlFor="trader-name">Трейдер</Label>
              <Input id="trader-name" placeholder="Username трейдера" />
            </div>
          </div>
          <Button>Добавить реквизиты</Button>
        </div>

        {/* Banking details table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список банковских реквизитов</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Банк</TableHead>
                <TableHead>Владелец</TableHead>
                <TableHead>Телефон</TableHead>
                <TableHead>Трейдер</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentBankingDetails.map((detail) => (
                <TableRow key={detail.id}>
                  <TableCell>{detail.id}</TableCell>
                  <TableCell>{detail.bank}</TableCell>
                  <TableCell>{detail.owner}</TableCell>
                  <TableCell>{detail.phone}</TableCell>
                  <TableCell>{detail.trader}</TableCell>
                  <TableCell>
                    <Badge variant={detail.status === 'Активен' ? 'default' : 'secondary'}>
                      {detail.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Редактировать
                      </Button>
                      <Button 
                        variant={detail.status === 'Активен' ? 'destructive' : 'default'} 
                        size="sm"
                      >
                        {detail.status === 'Активен' ? 'Деактивировать' : 'Активировать'}
                      </Button>
                    </div>
                  </TableCell>
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