import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Search, Filter, CalendarIcon, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
const mockDeals = [
  // Active deals (10)
  { id: "12345", paymentMethod: "СБП", bank: "Т-Банк", paymentDetails: "+7 (999) 123-45-67", ownerName: "Иванов Иван Иванович", amount: "50,000 ₽", amountUSDT: "150.50 USDT", exchangeRate: "332.11", traderReward: "150.50 USDT", createdAt: "01.09.2025 14:30:00", completedAt: "", status: "active" },
  { id: "12350", paymentMethod: "C2C", bank: "Сбербанк", paymentDetails: "2202 2020 5678 9012", ownerName: "Васильев Василий Васильевич", amount: "75,000 ₽", amountUSDT: "225.75 USDT", exchangeRate: "332.11", traderReward: "225.75 USDT", createdAt: "01.09.2025 13:45:00", completedAt: "", status: "active" },
  { id: "12351", paymentMethod: "СБП", bank: "ВТБ", paymentDetails: "+7 (999) 234-56-78", ownerName: "Николаев Николай Николаевич", amount: "30,000 ₽", amountUSDT: "90.30 USDT", exchangeRate: "332.11", traderReward: "90.30 USDT", createdAt: "01.09.2025 13:20:00", completedAt: "", status: "active" },
  { id: "12352", paymentMethod: "C2C", bank: "Альфа-Банк", paymentDetails: "4276 3800 1234 5678", ownerName: "Михайлов Михаил Михайлович", amount: "120,000 ₽", amountUSDT: "361.20 USDT", exchangeRate: "332.11", traderReward: "361.20 USDT", createdAt: "01.09.2025 12:55:00", completedAt: "", status: "active" },
  { id: "12353", paymentMethod: "СБП", bank: "Газпромбанк", paymentDetails: "+7 (999) 345-67-89", ownerName: "Александров Александр Александрович", amount: "85,000 ₽", amountUSDT: "255.85 USDT", exchangeRate: "332.11", traderReward: "255.85 USDT", createdAt: "01.09.2025 12:30:00", completedAt: "", status: "active" },
  { id: "12354", paymentMethod: "C2C", bank: "Райффайзенбанк", paymentDetails: "5469 3800 9876 5432", ownerName: "Дмитриев Дмитрий Дмитриевич", amount: "40,000 ₽", amountUSDT: "120.40 USDT", exchangeRate: "332.11", traderReward: "120.40 USDT", createdAt: "01.09.2025 12:15:00", completedAt: "", status: "active" },
  { id: "12355", paymentMethod: "СБП", bank: "ПСБ", paymentDetails: "+7 (999) 456-78-90", ownerName: "Сергеев Сергей Сергеевич", amount: "95,000 ₽", amountUSDT: "285.95 USDT", exchangeRate: "332.11", traderReward: "285.95 USDT", createdAt: "01.09.2025 11:45:00", completedAt: "", status: "active" },
  { id: "12356", paymentMethod: "C2C", bank: "ОТП Банк", paymentDetails: "6390 0200 9999 1111", ownerName: "Андреев Андрей Андреевич", amount: "60,000 ₽", amountUSDT: "180.60 USDT", exchangeRate: "332.11", traderReward: "180.60 USDT", createdAt: "01.09.2025 11:20:00", completedAt: "", status: "active" },
  { id: "12357", paymentMethod: "СБП", bank: "УБРиР", paymentDetails: "+7 (999) 567-89-01", ownerName: "Павлов Павел Павлович", amount: "110,000 ₽", amountUSDT: "331.10 USDT", exchangeRate: "332.11", traderReward: "331.10 USDT", createdAt: "01.09.2025 10:55:00", completedAt: "", status: "active" },
  { id: "12358", paymentMethod: "C2C", bank: "Открытие", paymentDetails: "5336 6900 0000 0000", ownerName: "Федоров Федор Федорович", amount: "70,000 ₽", amountUSDT: "210.70 USDT", exchangeRate: "332.11", traderReward: "210.70 USDT", createdAt: "01.09.2025 10:30:00", completedAt: "", status: "active" },
  
  // Completed deals (10)
  { id: "12346", paymentMethod: "C2C", bank: "Сбербанк", paymentDetails: "2202 2020 1234 5678", ownerName: "Петров Петр Петрович", amount: "25,000 ₽", amountUSDT: "75.25 USDT", exchangeRate: "332.11", traderReward: "75.25 USDT", createdAt: "01.09.2025 13:15:00", completedAt: "01.09.2025 13:30:00", status: "completed" },
  { id: "12360", paymentMethod: "СБП", bank: "Т-Банк", paymentDetails: "+7 (999) 111-22-33", ownerName: "Кузнецов Кузьма Кузьмич", amount: "45,000 ₽", amountUSDT: "135.45 USDT", exchangeRate: "332.11", traderReward: "135.45 USDT", createdAt: "01.09.2025 12:00:00", completedAt: "01.09.2025 12:15:00", status: "completed" },
  { id: "12361", paymentMethod: "C2C", bank: "ВТБ", paymentDetails: "4272 2900 0000 0000", ownerName: "Морозов Максим Максимович", amount: "80,000 ₽", amountUSDT: "240.80 USDT", exchangeRate: "332.11", traderReward: "240.80 USDT", createdAt: "01.09.2025 11:30:00", completedAt: "01.09.2025 11:45:00", status: "completed" },
  { id: "12362", paymentMethod: "СБП", bank: "Альфа-Банк", paymentDetails: "+7 (999) 222-33-44", ownerName: "Новиков Никита Николаевич", amount: "35,000 ₽", amountUSDT: "105.35 USDT", exchangeRate: "332.11", traderReward: "105.35 USDT", createdAt: "01.09.2025 10:45:00", completedAt: "01.09.2025 11:00:00", status: "completed" },
  { id: "12363", paymentMethod: "C2C", bank: "Газпромбанк", paymentDetails: "5536 9100 0000 0000", ownerName: "Орлов Олег Олегович", amount: "65,000 ₽", amountUSDT: "195.65 USDT", exchangeRate: "332.11", traderReward: "195.65 USDT", createdAt: "01.09.2025 10:00:00", completedAt: "01.09.2025 10:15:00", status: "completed" },
  { id: "12364", paymentMethod: "СБП", bank: "Райффайзенбанк", paymentDetails: "+7 (999) 333-44-55", ownerName: "Зайцев Захар Захарович", amount: "55,000 ₽", amountUSDT: "165.55 USDT", exchangeRate: "332.11", traderReward: "165.55 USDT", createdAt: "01.09.2025 09:30:00", completedAt: "01.09.2025 09:45:00", status: "completed" },
  { id: "12365", paymentMethod: "C2C", bank: "ПСБ", paymentDetails: "4276 5500 0000 0000", ownerName: "Волков Виктор Викторович", amount: "90,000 ₽", amountUSDT: "270.90 USDT", exchangeRate: "332.11", traderReward: "270.90 USDT", createdAt: "01.09.2025 09:00:00", completedAt: "01.09.2025 09:15:00", status: "completed" },
  { id: "12366", paymentMethod: "СБП", bank: "ОТП Банк", paymentDetails: "+7 (999) 444-55-66", ownerName: "Соколов Степан Степанович", amount: "100,000 ₽", amountUSDT: "301.00 USDT", exchangeRate: "332.11", traderReward: "301.00 USDT", createdAt: "01.09.2025 08:30:00", completedAt: "01.09.2025 08:45:00", status: "completed" },
  { id: "12367", paymentMethod: "C2C", bank: "УБРиР", paymentDetails: "5469 7200 0000 0000", ownerName: "Лебедев Леонид Леонидович", amount: "75,000 ₽", amountUSDT: "225.75 USDT", exchangeRate: "332.11", traderReward: "225.75 USDT", createdAt: "01.09.2025 08:00:00", completedAt: "01.09.2025 08:15:00", status: "completed" },
  { id: "12368", paymentMethod: "СБП", bank: "Открытие", paymentDetails: "+7 (999) 555-66-77", ownerName: "Семенов Семен Семенович", amount: "50,000 ₽", amountUSDT: "150.50 USDT", exchangeRate: "332.11", traderReward: "150.50 USDT", createdAt: "31.08.2025 23:30:00", completedAt: "31.08.2025 23:45:00", status: "completed" },
  
  // Cancelled deals (10)
  { id: "12347", paymentMethod: "СБП", bank: "ВТБ", paymentDetails: "+7 (999) 987-65-43", ownerName: "Сидоров Алексей Михайлович", amount: "100,000 ₽", amountUSDT: "300.00 USDT", exchangeRate: "333.33", traderReward: "300.00 USDT", createdAt: "01.09.2025 12:00:00", completedAt: "01.09.2025 12:30:00", status: "cancelled" },
  { id: "12370", paymentMethod: "C2C", bank: "Сбербанк", paymentDetails: "2202 2000 0000 0000", ownerName: "Киселев Кирилл Кириллович", amount: "85,000 ₽", amountUSDT: "255.85 USDT", exchangeRate: "332.11", traderReward: "255.85 USDT", createdAt: "01.09.2025 11:15:00", completedAt: "01.09.2025 12:00:00", status: "cancelled" },
  { id: "12371", paymentMethod: "СБП", bank: "Т-Банк", paymentDetails: "+7 (999) 666-77-88", ownerName: "Макаров Максим Максимович", amount: "60,000 ₽", amountUSDT: "180.60 USDT", exchangeRate: "332.11", traderReward: "180.60 USDT", createdAt: "01.09.2025 10:30:00", completedAt: "01.09.2025 11:15:00", status: "cancelled" },
  { id: "12372", paymentMethod: "C2C", bank: "Альфа-Банк", paymentDetails: "4276 4000 0000 0000", ownerName: "Тихонов Тимофей Тимофеевич", amount: "40,000 ₽", amountUSDT: "120.40 USDT", exchangeRate: "332.11", traderReward: "120.40 USDT", createdAt: "01.09.2025 09:45:00", completedAt: "01.09.2025 10:30:00", status: "cancelled" },
  { id: "12373", paymentMethod: "СБП", bank: "Газпромбанк", paymentDetails: "+7 (999) 777-88-99", ownerName: "Романов Роман Романович", amount: "95,000 ₽", amountUSDT: "285.95 USDT", exchangeRate: "332.11", traderReward: "285.95 USDT", createdAt: "01.09.2025 09:00:00", completedAt: "01.09.2025 09:45:00", status: "cancelled" },
  { id: "12374", paymentMethod: "C2C", bank: "Райффайзенбанк", paymentDetails: "5469 6100 0000 0000", ownerName: "Фролов Федор Федорович", amount: "70,000 ₽", amountUSDT: "210.70 USDT", exchangeRate: "332.11", traderReward: "210.70 USDT", createdAt: "01.09.2025 08:15:00", completedAt: "01.09.2025 09:00:00", status: "cancelled" },
  { id: "12375", paymentMethod: "СБП", bank: "ПСБ", paymentDetails: "+7 (999) 888-99-00", ownerName: "Егоров Евгений Евгеньевич", amount: "115,000 ₽", amountUSDT: "346.15 USDT", exchangeRate: "332.11", traderReward: "346.15 USDT", createdAt: "01.09.2025 07:30:00", completedAt: "01.09.2025 08:15:00", status: "cancelled" },
  { id: "12376", paymentMethod: "C2C", bank: "ОТП Банк", paymentDetails: "6390 0100 0000 0000", ownerName: "Борисов Борис Борисович", amount: "55,000 ₽", amountUSDT: "165.55 USDT", exchangeRate: "332.11", traderReward: "165.55 USDT", createdAt: "31.08.2025 23:45:00", completedAt: "01.09.2025 00:30:00", status: "cancelled" },
  { id: "12377", paymentMethod: "СБП", bank: "УБРиР", paymentDetails: "+7 (999) 999-00-11", ownerName: "Глебов Глеб Глебович", amount: "80,000 ₽", amountUSDT: "240.80 USDT", exchangeRate: "332.11", traderReward: "240.80 USDT", createdAt: "31.08.2025 23:00:00", completedAt: "31.08.2025 23:45:00", status: "cancelled" },
  { id: "12378", paymentMethod: "C2C", bank: "Открытие", paymentDetails: "5336 6800 0000 0000", ownerName: "Денисов Денис Денисович", amount: "130,000 ₽", amountUSDT: "391.30 USDT", exchangeRate: "332.11", traderReward: "391.30 USDT", createdAt: "31.08.2025 22:15:00", completedAt: "31.08.2025 23:00:00", status: "cancelled" },
  
  // Dispute deals (10)
  { id: "12348", paymentMethod: "C2C", bank: "Тинькофф Банк", paymentDetails: "5536 9139 1234 5678", ownerName: "Козлова Анна Сергеевна", amount: "75,000 ₽", amountUSDT: "225.75 USDT", exchangeRate: "332.11", traderReward: "225.75 USDT", createdAt: "01.09.2025 11:30:00", completedAt: "", status: "dispute" },
  { id: "12380", paymentMethod: "СБП", bank: "Сбербанк", paymentDetails: "+7 (999) 123-00-11", ownerName: "Климов Климент Климентович", amount: "65,000 ₽", amountUSDT: "195.65 USDT", exchangeRate: "332.11", traderReward: "195.65 USDT", createdAt: "01.09.2025 10:45:00", completedAt: "", status: "dispute" },
  { id: "12381", paymentMethod: "C2C", bank: "Т-Банк", paymentDetails: "5536 9100 9999 8888", ownerName: "Гришин Григорий Григорьевич", amount: "90,000 ₽", amountUSDT: "270.90 USDT", exchangeRate: "332.11", traderReward: "270.90 USDT", createdAt: "01.09.2025 10:00:00", completedAt: "", status: "dispute" },
  { id: "12382", paymentMethod: "СБП", bank: "ВТБ", paymentDetails: "+7 (999) 234-11-22", ownerName: "Данилов Данила Данилович", amount: "45,000 ₽", amountUSDT: "135.45 USDT", exchangeRate: "332.11", traderReward: "135.45 USDT", createdAt: "01.09.2025 09:30:00", completedAt: "", status: "dispute" },
  { id: "12383", paymentMethod: "C2C", bank: "Альфа-Банк", paymentDetails: "4276 3700 7777 6666", ownerName: "Ефимов Ефим Ефимович", amount: "105,000 ₽", amountUSDT: "316.05 USDT", exchangeRate: "332.11", traderReward: "316.05 USDT", createdAt: "01.09.2025 09:00:00", completedAt: "", status: "dispute" },
  { id: "12384", paymentMethod: "СБП", bank: "Газпромбанк", paymentDetails: "+7 (999) 345-22-33", ownerName: "Жуков Жорж Жоржевич", amount: "50,000 ₽", amountUSDT: "150.50 USDT", exchangeRate: "332.11", traderReward: "150.50 USDT", createdAt: "01.09.2025 08:30:00", completedAt: "", status: "dispute" },
  { id: "12385", paymentMethod: "C2C", bank: "Райффайзенбанк", paymentDetails: "5469 5200 5555 4444", ownerName: "Ильин Илья Ильич", amount: "85,000 ₽", amountUSDT: "255.85 USDT", exchangeRate: "332.11", traderReward: "255.85 USDT", createdAt: "01.09.2025 08:00:00", completedAt: "", status: "dispute" },
  { id: "12386", paymentMethod: "СБП", bank: "ПСБ", paymentDetails: "+7 (999) 456-33-44", ownerName: "Королев Константин Константинович", amount: "120,000 ₽", amountUSDT: "361.20 USDT", exchangeRate: "332.11", traderReward: "361.20 USDT", createdAt: "31.08.2025 23:30:00", completedAt: "", status: "dispute" },
  { id: "12387", paymentMethod: "C2C", bank: "ОТП Банк", paymentDetails: "6390 0300 3333 2222", ownerName: "Лазарев Лазарь Лазаревич", amount: "95,000 ₽", amountUSDT: "285.95 USDT", exchangeRate: "332.11", traderReward: "285.95 USDT", createdAt: "31.08.2025 23:00:00", completedAt: "", status: "dispute" },
  { id: "12388", paymentMethod: "СБП", bank: "УБРиР", paymentDetails: "+7 (999) 567-44-55", ownerName: "Мельников Мирон Миронович", amount: "110,000 ₽", amountUSDT: "331.10 USDT", exchangeRate: "332.11", traderReward: "331.10 USDT", createdAt: "31.08.2025 22:30:00", completedAt: "", status: "dispute" },
];
export default function Deals() {
  const [searchId, setSearchId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const getTimeSince = (createdAt: string) => {
    const created = new Date(createdAt.replace(/(\d{2})\.(\d{2})\.(\d{4}) (\d{2}):(\d{2}):(\d{2})/, '$3-$2-$1T$4:$5:$6'));
    const diffMs = currentTime.getTime() - created.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const remainingMinutes = diffMinutes % 60;
    
    if (diffHours > 0) {
      return `${diffHours}ч ${remainingMinutes}м`;
    }
    return `${diffMinutes}м`;
  };

  const getColumnTitle = () => {
    switch (activeTab) {
      case "active":
        return "Время активности";
      case "completed":
        return "Завершено в";
      case "cancelled":
        return "Отменено в";
      case "dispute":
        return "Отменено в";
      default:
        return "Завершено в";
    }
  };
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

  // Pagination logic
  const totalPages = Math.ceil(filteredDeals.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedDeals = filteredDeals.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when tab changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab]);
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
          <div className="grid gap-4 md:grid-cols-5">
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
            <div className="space-y-2">
              <label className="text-sm font-medium">Время от</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateFrom && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateFrom}
                    onSelect={setDateFrom}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Время до</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !dateTo && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {dateTo ? format(dateTo, "dd.MM.yyyy") : "Выберите дату"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={dateTo}
                    onSelect={setDateTo}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">{getColumnTitle()}</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                     {paginatedDeals.map(deal => {
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
                             {deal.status === "active" ? getTimeSince(deal.createdAt) : (deal.completedAt || "—")}
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

              {paginatedDeals.length === 0 && <div className="text-center py-12">
                  <p className="text-muted-foreground rounded-none">Сделки не найдены</p>
                </div>}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-4 border-t border-border">
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
                    <div className="flex items-center gap-1">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
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
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      Вперед
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>;
}