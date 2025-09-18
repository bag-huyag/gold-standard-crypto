import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { MessageSquare } from "lucide-react";
import { useState } from "react";
import { allDisputes } from "@/data/mockData";
import { usePagination } from "@/hooks/usePagination";
import { PaginationControls } from "./PaginationControls";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { DisputeDialog } from "./DisputeDialog";

export function DisputesTab() {
  const [openDisputeDialog, setOpenDisputeDialog] = useState(false);
  const [disputeForm, setDisputeForm] = useState({
    amount: "",
    reason: "неизвестная причина",
    timeInMinutes: ""
  });

  const {
    currentPage,
    totalPages,
    paginatedData: currentDisputes,
    goToPage,
    nextPage,
    prevPage
  } = usePagination(allDisputes, 10);

  const handleOpenDispute = (formData: any) => {
    console.log("Opening dispute:", formData);
    setDisputeForm(formData);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Управление диспутами
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[200px]">ID</TableHead>
                <TableHead className="min-w-[200px]">Банк</TableHead>
                <TableHead className="min-w-[150px]">Телефон</TableHead>
                <TableHead className="min-w-[150px]">Владелец</TableHead>
                <TableHead className="min-w-[150px]">Трейдер</TableHead>
                <TableHead className="min-w-[200px]">Order ID</TableHead>
                <TableHead className="min-w-[200px]">Merchant Order ID</TableHead>
                <TableHead className="min-w-[120px]">Сумма ₽</TableHead>
                <TableHead className="min-w-[120px]">Крипто</TableHead>
                <TableHead className="min-w-[100px]">Курс</TableHead>
                <TableHead className="min-w-[150px]">Причина</TableHead>
                <TableHead className="min-w-[120px]">Статус</TableHead>
                <TableHead className="min-w-[120px]">Диспут ₽</TableHead>
                <TableHead className="min-w-[120px]">Диспут крипто</TableHead>
                <TableHead className="min-w-[120px]">Автопринятие</TableHead>
                <TableHead className="min-w-[300px]">Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {currentDisputes.map((dispute) => (
                <TableRow key={dispute.id}>
                  <TableCell className="font-mono text-xs">{dispute.id}</TableCell>
                  <TableCell>{dispute.bankDetails.bank}</TableCell>
                  <TableCell>{dispute.bankDetails.phone}</TableCell>
                  <TableCell>{dispute.bankDetails.owner}</TableCell>
                  <TableCell>{dispute.bankDetails.trader}</TableCell>
                  <TableCell className="font-mono text-xs">{dispute.dealDetails.orderId}</TableCell>
                  <TableCell className="font-mono text-xs">{dispute.dealDetails.merchantOrderId}</TableCell>
                  <TableCell>{dispute.dealDetails.amountRub.toLocaleString()}</TableCell>
                  <TableCell>{dispute.dealDetails.amountCrypto}</TableCell>
                  <TableCell>{dispute.dealDetails.rate}</TableCell>
                  <TableCell>
                    <Badge variant={dispute.disputeDetails.reason === "WRONG_AMOUNT" ? "destructive" : "secondary"}>
                      {dispute.disputeDetails.reason === "WRONG_AMOUNT" ? "Неверная сумма" : "Нет оплаты"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={
                      dispute.disputeDetails.status === "Открыт" ? "destructive" : 
                      dispute.disputeDetails.status === "Заморожен" ? "secondary" : "default"
                    }>
                      {dispute.disputeDetails.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{dispute.disputeDetails.amountRubDispute.toLocaleString()}</TableCell>
                  <TableCell>{dispute.disputeDetails.amountCryptoDispute}</TableCell>
                  <TableCell>{dispute.disputeDetails.autoAccept}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-2">
                      <DisputeDialog
                        trigger={<Button size="sm">Открыть</Button>}
                        dealAmount={dispute.dealDetails.amountRub}
                        open={openDisputeDialog}
                        onOpenChange={setOpenDisputeDialog}
                        onSubmit={handleOpenDispute}
                      />
                      
                      <ConfirmationDialog
                        trigger={<Button variant="outline" size="sm">Закрыть</Button>}
                        title="Закрытие диспута"
                        description="Вы точно хотите закрыть диспут?"
                        onConfirm={() => console.log("Closing dispute:", dispute.id)}
                      />
                      
                      <ConfirmationDialog
                        trigger={<Button variant="destructive" size="sm">Отменить</Button>}
                        title="Отмена диспута"
                        description="Вы точно хотите отменить диспут?"
                        onConfirm={() => console.log("Cancelling dispute:", dispute.id)}
                      />
                      
                      <ConfirmationDialog
                        trigger={<Button variant="secondary" size="sm">Заморозить</Button>}
                        title="Заморозка диспута"
                        description="Вы точно хотите заморозить диспут?"
                        onConfirm={() => console.log("Freezing dispute:", dispute.id)}
                      />
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