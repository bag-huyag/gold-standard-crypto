import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Search, Filter } from "lucide-react";
const mockDeals = [{
  id: "12345",
  paymentMethod: "СБП",
  bank: "Т-Банк",
  paymentDetails: "+7 (999) 123-45-67",
  ownerName: "Иванов Иван Иванович",
  amount: "50,000 ₽",
  amountUSDT: "150.50 USDT",
  exchangeRate: "332.11",
  traderReward: "150.50 USDT",
  createdAt: "01.09.2025 14:30:00",
  completedAt: "01.09.2025 14:45:00",
  status: "active"
}, {
  id: "12346",
  paymentMethod: "C2C",
  bank: "Сбербанк",
  paymentDetails: "2202 2020 1234 5678",
  ownerName: "Петров Петр Петрович",
  amount: "25,000 ₽",
  amountUSDT: "75.25 USDT",
  exchangeRate: "332.11",
  traderReward: "75.25 USDT",
  createdAt: "01.09.2025 13:15:00",
  completedAt: "01.09.2025 13:30:00",
  status: "completed"
}, {
  id: "12347",
  paymentMethod: "СБП",
  bank: "ВТБ",
  paymentDetails: "+7 (999) 987-65-43",
  ownerName: "Сидоров Алексей Михайлович",
  amount: "100,000 ₽",
  amountUSDT: "300.00 USDT",
  exchangeRate: "333.33",
  traderReward: "300.00 USDT",
  createdAt: "01.09.2025 12:00:00",
  completedAt: "",
  status: "cancelled"
}, {
  id: "12348",
  paymentMethod: "C2C",
  bank: "Тинькофф Банк",
  paymentDetails: "5536 9139 1234 5678",
  ownerName: "Козлова Анна Сергеевна",
  amount: "75,000 ₽",
  amountUSDT: "225.75 USDT",
  exchangeRate: "332.11",
  traderReward: "225.75 USDT",
  createdAt: "01.09.2025 11:30:00",
  completedAt: "",
  status: "dispute"
}];
export default function Deals() {
  const [searchId, setSearchId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        label: "Активна",
        variant: "default" as const
      },
      completed: {
        label: "Завершена",
        variant: "secondary" as const
      },
      cancelled: {
        label: "Отменена",
        variant: "destructive" as const
      },
      dispute: {
        label: "Спор",
        variant: "outline" as const
      }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };
  const filteredDeals = mockDeals.filter(deal => {
    if (activeTab !== "all" && deal.status !== activeTab) return false;
    if (searchId && !deal.id.includes(searchId)) return false;
    return true;
  });
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Сделки</h1>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Поиск и фильтры
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <label className="text-sm font-medium">Поиск по ID</label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Введите ID сделки" value={searchId} onChange={e => setSearchId(e.target.value)} className="pl-9" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Мин. сумма (RUB)</label>
              <Input type="number" placeholder="0" value={minAmount} onChange={e => setMinAmount(e.target.value)} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Макс. сумма (RUB)</label>
              <Input type="number" placeholder="1000000" value={maxAmount} onChange={e => setMaxAmount(e.target.value)} />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border">
              <TabsList className="grid w-full grid-cols-4 bg-transparent h-12">
                <TabsTrigger value="active" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Активные
                </TabsTrigger>
                <TabsTrigger value="completed" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Завершенные
                </TabsTrigger>
                <TabsTrigger value="cancelled" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Отмененные
                </TabsTrigger>
                <TabsTrigger value="dispute" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
                  Споры
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">ID</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground min-w-[320px]">Реквизиты</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Сумма сделки</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Создана в</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Завершена в</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                     {filteredDeals.map(deal => {
                    const statusConfig = getStatusBadge(deal.status);
                     return <tr key={deal.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                          <td className="py-3 px-4 font-mono text-sm">{deal.id}</td>
                          <td className="py-3 px-4 min-w-[320px]">
                            <div className="space-y-1">
                              <div className="flex gap-3">
                                <span className="text-xs text-muted-foreground min-w-[60px]">Метод:</span>
                                <span className="text-sm font-medium">{deal.paymentMethod}</span>
                              </div>
                              <div className="flex gap-3">
                                <span className="text-xs text-muted-foreground min-w-[60px]">Банк:</span>
                                <span className="text-sm">{deal.bank}</span>
                              </div>
                              <div className="flex gap-3">
                                <span className="text-xs text-muted-foreground min-w-[60px]">Реквизит:</span>
                                <span className="text-sm font-mono">{deal.paymentDetails}</span>
                              </div>
                              <div className="flex gap-3">
                                <span className="text-xs text-muted-foreground min-w-[60px]">ФИО:</span>
                                <span className="text-sm">{deal.ownerName}</span>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-semibold">
                            <div className="space-y-1">
                              <div className="text-sm font-semibold">{deal.amount}</div>
                              <div className="text-sm text-success font-semibold">{deal.amountUSDT}</div>
                              <div className="text-xs text-muted-foreground">Курс: {deal.exchangeRate} ₽/USDT</div>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">{deal.createdAt}</td>
                          <td className="py-3 px-4 text-sm text-muted-foreground">
                            {deal.completedAt || "—"}
                          </td>
                           <td className="py-3 px-4">
                             <div className="flex items-center gap-2">
                               {(deal.status === "active" || deal.status === "dispute") && (
                                 <AlertDialog>
                                   <AlertDialogTrigger asChild>
                                     <Button size="sm" variant="default">
                                       Подтвердить
                                     </Button>
                                   </AlertDialogTrigger>
                                   <AlertDialogContent>
                                     <AlertDialogHeader>
                                       <AlertDialogTitle>Подтверждение сделки</AlertDialogTitle>
                                       <AlertDialogDescription>
                                         Вы действительно хотите подтвердить сделку #{deal.id}?
                                       </AlertDialogDescription>
                                     </AlertDialogHeader>
                                     <AlertDialogFooter>
                                       <AlertDialogCancel>Нет</AlertDialogCancel>
                                       <AlertDialogAction>Да</AlertDialogAction>
                                     </AlertDialogFooter>
                                   </AlertDialogContent>
                                 </AlertDialog>
                               )}
                               <AlertDialog>
                                 <AlertDialogTrigger asChild>
                                   <Button size="sm" variant="ghost">
                                     Подробнее
                                   </Button>
                                 </AlertDialogTrigger>
                                 <AlertDialogContent className="max-w-2xl">
                                   <AlertDialogHeader>
                                     <AlertDialogTitle>Детали сделки #{deal.id}</AlertDialogTitle>
                                   </AlertDialogHeader>
                                   <div className="space-y-4">
                                     <div>
                                       <label className="text-sm font-medium text-muted-foreground">Статус</label>
                                       <div className="mt-1">
                                         <Badge variant={statusConfig.variant}>
                                           {statusConfig.label}
                                         </Badge>
                                       </div>
                                     </div>
                                     
                                     <div>
                                       <label className="text-sm font-medium text-muted-foreground">Реквизиты платежа</label>
                                       <div className="mt-1 space-y-2 p-3 bg-muted rounded-lg">
                                         <div className="flex justify-between">
                                           <span className="text-sm text-muted-foreground">Метод:</span>
                                           <span className="text-sm font-medium">{deal.paymentMethod}</span>
                                         </div>
                                         <div className="flex justify-between">
                                           <span className="text-sm text-muted-foreground">Банк:</span>
                                           <span className="text-sm">{deal.bank}</span>
                                         </div>
                                         <div className="flex justify-between">
                                           <span className="text-sm text-muted-foreground">Реквизит:</span>
                                           <span className="text-sm font-mono">{deal.paymentDetails}</span>
                                         </div>
                                         <div className="flex justify-between">
                                           <span className="text-sm text-muted-foreground">ФИО:</span>
                                           <span className="text-sm">{deal.ownerName}</span>
                                         </div>
                                       </div>
                                     </div>

                                     <div>
                                       <label className="text-sm font-medium text-muted-foreground">Сумма сделки</label>
                                       <div className="mt-1 space-y-1">
                                         <div className="text-sm font-semibold">{deal.amount}</div>
                                         <div className="text-sm text-success font-semibold">{deal.amountUSDT}</div>
                                         <div className="text-xs text-muted-foreground">Курс: {deal.exchangeRate} ₽/USDT</div>
                                       </div>
                                     </div>

                                     <div className="grid grid-cols-2 gap-4">
                                       <div>
                                         <label className="text-sm font-medium text-muted-foreground">Создана</label>
                                         <p className="text-sm">{deal.createdAt}</p>
                                       </div>
                                       <div>
                                         <label className="text-sm font-medium text-muted-foreground">Завершена</label>
                                         <p className="text-sm">{deal.completedAt || "—"}</p>
                                       </div>
                                     </div>
                                   </div>
                                   <AlertDialogFooter>
                                     <AlertDialogCancel>Закрыть</AlertDialogCancel>
                                   </AlertDialogFooter>
                                 </AlertDialogContent>
                               </AlertDialog>
                             </div>
                           </td>
                         </tr>;
                  })}
                  </tbody>
                </table>
              </div>

              {filteredDeals.length === 0 && <div className="text-center py-12">
                  <p className="text-muted-foreground rounded-none">Сделки не найдены</p>
                </div>}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
}