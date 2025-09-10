import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Eye, CalendarIcon, Filter, X } from "lucide-react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { cn } from "@/lib/utils";

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
  const [pageSize, setPageSize] = useState(10);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [dateFrom, setDateFrom] = useState<Date | undefined>();
  const [dateTo, setDateTo] = useState<Date | undefined>();

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [typeFilter, dateFrom, dateTo]);
  // Filter history based on selected filters
  const filteredHistory = mockHistory.filter((item) => {
    // Filter by type
    if (typeFilter && item.type !== typeFilter) {
      return false;
    }

    // Filter by date range
    if (dateFrom || dateTo) {
      const itemDate = new Date(item.date.split(' ')[0].split('.').reverse().join('-'));
      
      if (dateFrom && itemDate < dateFrom) {
        return false;
      }
      
      if (dateTo && itemDate > dateTo) {
        return false;
      }
    }

    return true;
  });
  
  const totalItems = filteredHistory.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentItems = filteredHistory.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };

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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Type Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">Тип операции</label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Все типы" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Все типы</SelectItem>
                  <SelectItem value="Разморозка">Разморозка</SelectItem>
                  <SelectItem value="Заморозка">Заморозка</SelectItem>
                  <SelectItem value="Награда">Награда</SelectItem>
                  <SelectItem value="Комиссия">Комиссия</SelectItem>
                  <SelectItem value="Пополнение">Пополнение</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Date From Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">От даты</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Date To Filter */}
            <div className="flex flex-col space-y-2">
              <label className="text-sm font-medium">До даты</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-[200px] justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd.MM.yyyy", { locale: ru }) : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Clear Filters */}
            {(typeFilter || dateFrom || dateTo) && (
              <div className="flex flex-col justify-end">
                <Button
                  variant="outline"
                  onClick={() => {
                    setTypeFilter("");
                    setDateFrom(undefined);
                    setDateTo(undefined);
                    setCurrentPage(1);
                  }}
                  className="h-10"
                >
                  <X className="mr-2 h-4 w-4" />
                  Очистить
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalItems > 0 && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Показать:</span>
                <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="20">20</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">
                  записей на странице
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">
                  {startIndex + 1}-{Math.min(endIndex, totalItems)} из {totalItems}
                </span>
                
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Назад
                  </Button>
                  
                  {/* Page numbers */}
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => handlePageChange(pageNum)}
                        className="w-8 h-8 p-0"
                      >
                        {pageNum}
                      </Button>
                    );
                  })}
                  
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <>
                      <span className="text-muted-foreground">...</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handlePageChange(totalPages)}
                        className="w-8 h-8 p-0"
                      >
                        {totalPages}
                      </Button>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Вперед
                  </Button>
                </div>
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