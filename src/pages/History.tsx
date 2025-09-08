import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye } from "lucide-react";

const mockHistory = [
  {
    id: "12929",
    amount: "-68.322522 USDT",
    type: "Разморозка",
    status: "Подтверждено",
    date: "01.09.2025 17:13:33",
    details: "Order: 02e530a2-363d-4bcc-b7b2-ff1af21b534f"
  },
  {
    id: "12928",
    amount: "+68.322522 USDT",
    type: "Заморозка",
    status: "В обработке",
    date: "01.09.2025 17:11:28",
    details: "Order: 02e530a2-363d-4bcc-b7b2-ff1af21b534f"
  },
  {
    id: "12927",
    amount: "+150.50 USDT",
    type: "Награда",
    status: "Подтверждено",
    date: "01.09.2025 16:45:12",
    details: "Deal: #12345 - Успешное завершение"
  },
  {
    id: "12926",
    amount: "-75.25 USDT",
    type: "Комиссия",
    status: "Подтверждено",
    date: "01.09.2025 15:30:45",
    details: "Platform fee for deal #12344"
  },
  {
    id: "12925",
    amount: "+500.00 USDT",
    type: "Пополнение",
    status: "Подтверждено",
    date: "01.09.2025 14:20:18",
    details: "Bank transfer confirmation"
  }
];

export default function History() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(mockHistory.length / itemsPerPage);
  
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = mockHistory.slice(startIndex, endIndex);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      "Подтверждено": { variant: "default" as const, className: "bg-success text-success-foreground" },
      "В обработке": { variant: "secondary" as const, className: "bg-warning text-warning-foreground" },
      "Отклонено": { variant: "destructive" as const, className: "" },
      "Ожидание": { variant: "outline" as const, className: "" }
    };
    
    return statusConfig[status as keyof typeof statusConfig] || statusConfig["Ожидание"];
  };

  const getAmountColor = (amount: string) => {
    if (amount.startsWith("+")) return "text-success";
    if (amount.startsWith("-")) return "text-destructive";
    return "text-foreground";
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">История операций</h1>
      </div>

      {/* History Table */}
      <Card>
        <CardHeader>
          <CardTitle>Все операции</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Сумма</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Тип</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Статус</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Дата</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Детали</th>
                  <th className="text-left py-3 px-4 font-medium text-muted-foreground">Действия</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((item) => {
                  const statusConfig = getStatusBadge(item.status);
                  return (
                    <tr key={item.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4 font-mono text-sm">{item.id}</td>
                      <td className={`py-3 px-4 font-semibold ${getAmountColor(item.amount)}`}>
                        {item.amount}
                      </td>
                      <td className="py-3 px-4">{item.type}</td>
                      <td className="py-3 px-4">
                        <Badge 
                          variant={statusConfig.variant}
                          className={statusConfig.className}
                        >
                          {item.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-sm text-muted-foreground">{item.date}</td>
                      <td className="py-3 px-4 text-sm text-muted-foreground max-w-xs truncate">
                        {item.details}
                      </td>
                      <td className="py-3 px-4">
                        <Button size="sm" variant="ghost">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <div className="text-sm text-muted-foreground">
                Показано {startIndex + 1}-{Math.min(endIndex, mockHistory.length)} из {mockHistory.length} записей
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Назад
                </Button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="w-8 h-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
                
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Вперед
                </Button>
              </div>
            </div>
          )}

          {mockHistory.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">История операций пуста</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}