import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Pagination, PaginationContent, PaginationEllipsis, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import { Search, Filter, CalendarIcon, Eye, ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Expanded mock data - 40 deals total (10 per status)
const mockDeals = [
  // Active deals (10)
  {
    id: "12345",
    device: "Устройство #1",
    paymentMethod: "СБП",
    bank: "Т-Банк",
    paymentDetails: "+7 (999) 123-45-67",
    ownerName: "Иванов Иван Иванович",
    amount: "50,000 ₽",
    amountUSDT: "150.50 USDT",
    exchangeRate: "332.11",
    traderReward: "150.50 USDT",
    createdAt: "2025-01-09T14:30:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12349",
    device: "Устройство #2",
    paymentMethod: "C2C",
    bank: "Сбербанк",
    paymentDetails: "2202 2020 9876 5432",
    ownerName: "Смирнов Алексей Викторович",
    amount: "120,000 ₽",
    amountUSDT: "360.12 USDT",
    exchangeRate: "333.20",
    traderReward: "360.12 USDT",
    createdAt: "2025-01-09T13:45:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12350",
    device: "Устройство #3",
    paymentMethod: "СБП", 
    bank: "ВТБ",
    paymentDetails: "+7 (999) 888-77-66",
    ownerName: "Козлова Мария Петровна",
    amount: "85,000 ₽",
    amountUSDT: "255.15 USDT",
    exchangeRate: "333.00",
    traderReward: "255.15 USDT",
    createdAt: "2025-01-09T12:20:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12351",
    device: "Устройство #1",
    paymentMethod: "C2C",
    bank: "Альфа-Банк",
    paymentDetails: "4276 1600 1234 5678",
    ownerName: "Петрова Анна Сергеевна", 
    amount: "200,000 ₽",
    amountUSDT: "600.60 USDT",
    exchangeRate: "333.00",
    traderReward: "600.60 USDT",
    createdAt: "2025-01-09T11:10:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12352",
    device: "Устройство #4",
    paymentMethod: "СБП",
    bank: "Газпромбанк",
    paymentDetails: "+7 (999) 555-44-33",
    ownerName: "Сидоров Дмитрий Андреевич",
    amount: "75,000 ₽",
    amountUSDT: "225.23 USDT",
    exchangeRate: "333.11",
    traderReward: "225.23 USDT",
    createdAt: "2025-01-09T10:30:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12353",
    device: "Устройство #2",
    paymentMethod: "C2C",
    bank: "Тинькофф Банк",
    paymentDetails: "5536 9139 8765 4321",
    ownerName: "Федорова Елена Михайловна",
    amount: "95,000 ₽",
    amountUSDT: "285.28 USDT",
    exchangeRate: "333.05",
    traderReward: "285.28 USDT",
    createdAt: "2025-01-09T09:45:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12354",
    device: "Устройство #5",
    paymentMethod: "СБП",
    bank: "Райффайзенбанк",
    paymentDetails: "+7 (999) 222-11-00",
    ownerName: "Морозов Игорь Валентинович",
    amount: "130,000 ₽",
    amountUSDT: "390.39 USDT",
    exchangeRate: "333.07",
    traderReward: "390.39 USDT",
    createdAt: "2025-01-09T08:15:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12355",
    device: "Устройство #3",
    paymentMethod: "C2C",
    bank: "ЮниКредит Банк",
    paymentDetails: "4274 3200 9999 8888",
    ownerName: "Николаева Ольга Владимировна",
    amount: "110,000 ₽",
    amountUSDT: "330.33 USDT",
    exchangeRate: "333.00",
    traderReward: "330.33 USDT",
    createdAt: "2025-01-09T07:30:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12356",
    device: "Устройство #1",
    paymentMethod: "СБП",
    bank: "Почта Банк",
    paymentDetails: "+7 (999) 777-88-99",
    ownerName: "Васильев Сергей Николаевич",
    amount: "60,000 ₽",
    amountUSDT: "180.18 USDT",
    exchangeRate: "333.00",
    traderReward: "180.18 USDT",
    createdAt: "2025-01-09T06:45:00",
    completedAt: null,
    status: "active"
  },
  {
    id: "12357",
    device: "Устройство #4",
    paymentMethod: "C2C",
    bank: "МТС Банк",
    paymentDetails: "5469 5500 1111 2222",
    ownerName: "Романова Татьяна Игоревна",
    amount: "140,000 ₽",
    amountUSDT: "420.42 USDT",
    exchangeRate: "333.00",
    traderReward: "420.42 USDT",
    createdAt: "2025-01-09T05:20:00",
    completedAt: null,
    status: "active"
  },

  // Completed deals (10)
  {
    id: "12346",
    device: "Устройство #2",
    paymentMethod: "C2C",
    bank: "Сбербанк",
    paymentDetails: "2202 2020 1234 5678",
    ownerName: "Петров Петр Петрович",
    amount: "25,000 ₽",
    amountUSDT: "75.25 USDT",
    exchangeRate: "332.11",
    traderReward: "75.25 USDT",
    createdAt: "2025-01-08T13:15:00",
    completedAt: "2025-01-08T13:30:00",
    status: "completed"
  },
  {
    id: "12358",
    device: "Устройство #3",
    paymentMethod: "СБП",
    bank: "Т-Банк",
    paymentDetails: "+7 (999) 111-22-33",
    ownerName: "Лебедев Михаил Александрович",
    amount: "80,000 ₽",
    amountUSDT: "240.24 USDT",
    exchangeRate: "333.00",
    traderReward: "240.24 USDT",
    createdAt: "2025-01-08T12:00:00",
    completedAt: "2025-01-08T12:25:00",
    status: "completed"
  },
  {
    id: "12359",
    device: "Устройство #5",
    paymentMethod: "C2C",
    bank: "ВТБ",
    paymentDetails: "4272 2900 5555 6666",
    ownerName: "Григорьева Екатерина Дмитриевна",
    amount: "150,000 ₽",
    amountUSDT: "450.45 USDT",
    exchangeRate: "333.00",
    traderReward: "450.45 USDT",
    createdAt: "2025-01-08T11:30:00",
    completedAt: "2025-01-08T11:55:00",
    status: "completed"
  },
  {
    id: "12360",
    device: "Устройство #1",
    paymentMethod: "СБП",
    bank: "Альфа-Банк",
    paymentDetails: "+7 (999) 444-55-66",
    ownerName: "Соколов Владимир Юрьевич",
    amount: "90,000 ₽",
    amountUSDT: "270.27 USDT",
    exchangeRate: "333.00",
    traderReward: "270.27 USDT",
    createdAt: "2025-01-08T10:15:00",
    completedAt: "2025-01-08T10:40:00",
    status: "completed"
  },
  {
    id: "12361",
    device: "Устройство #4",
    paymentMethod: "C2C",
    bank: "Газпромбанк",
    paymentDetails: "4276 5500 7777 8888",
    ownerName: "Орлова Ирина Викторовна",
    amount: "35,000 ₽",
    amountUSDT: "105.11 USDT",
    exchangeRate: "333.05",
    traderReward: "105.11 USDT",
    createdAt: "2025-01-08T09:20:00",
    completedAt: "2025-01-08T09:45:00",
    status: "completed"
  },
  {
    id: "12362",
    device: "Устройство #2",
    paymentMethod: "СБП",
    bank: "Тинькофф Банк",
    paymentDetails: "+7 (999) 333-44-55",
    ownerName: "Павлов Артем Сергеевич",
    amount: "175,000 ₽",
    amountUSDT: "525.53 USDT",
    exchangeRate: "333.00",
    traderReward: "525.53 USDT",
    createdAt: "2025-01-08T08:10:00",
    completedAt: "2025-01-08T08:35:00",
    status: "completed"
  },
  {
    id: "12363",
    device: "Устройство #3",
    paymentMethod: "C2C",
    bank: "Райффайзенбанк",
    paymentDetails: "5469 3800 9999 0000",
    ownerName: "Кузнецова Людмила Ивановна",
    amount: "65,000 ₽",
    amountUSDT: "195.20 USDT",
    exchangeRate: "333.08",
    traderReward: "195.20 USDT",
    createdAt: "2025-01-08T07:30:00",
    completedAt: "2025-01-08T07:55:00",
    status: "completed"
  },
  {
    id: "12364",
    device: "Устройство #5",
    paymentMethod: "СБП",
    bank: "ЮниКредит Банк",
    paymentDetails: "+7 (999) 666-77-88",
    ownerName: "Белов Константин Андреевич",
    amount: "105,000 ₽",
    amountUSDT: "315.32 USDT",
    exchangeRate: "333.00",
    traderReward: "315.32 USDT",
    createdAt: "2025-01-08T06:45:00",
    completedAt: "2025-01-08T07:10:00",
    status: "completed"
  },
  {
    id: "12365",
    device: "Устройство #1",
    paymentMethod: "C2C",
    bank: "Почта Банк",
    paymentDetails: "4276 7200 1111 3333",
    ownerName: "Зайцева Наталья Павловна",
    amount: "45,000 ₽",
    amountUSDT: "135.14 USDT",
    exchangeRate: "333.00",
    traderReward: "135.14 USDT",
    createdAt: "2025-01-08T05:15:00",
    completedAt: "2025-01-08T05:40:00",
    status: "completed"
  },
  {
    id: "12366",
    device: "Устройство #4",
    paymentMethod: "СБП",
    bank: "МТС Банк",
    paymentDetails: "+7 (999) 888-99-00",
    ownerName: "Новиков Роман Владимирович",
    amount: "225,000 ₽",
    amountUSDT: "675.68 USDT",
    exchangeRate: "333.00",
    traderReward: "675.68 USDT",
    createdAt: "2025-01-08T04:20:00",
    completedAt: "2025-01-08T04:45:00",
    status: "completed"
  },

  // Cancelled deals (10)
  {
    id: "12347",
    device: "Устройство #2",
    paymentMethod: "СБП",
    bank: "ВТБ",
    paymentDetails: "+7 (999) 987-65-43",
    ownerName: "Сидоров Алексей Михайлович",
    amount: "100,000 ₽",
    amountUSDT: "300.00 USDT",
    exchangeRate: "333.33",
    traderReward: "300.00 USDT",
    createdAt: "2025-01-07T12:00:00",
    completedAt: "2025-01-07T12:30:00",
    status: "cancelled"
  },
  {
    id: "12367",
    device: "Устройство #3",
    paymentMethod: "C2C",
    bank: "Сбербанк",
    paymentDetails: "2202 2020 4444 5555",
    ownerName: "Волков Андрей Геннадьевич",
    amount: "55,000 ₽",
    amountUSDT: "165.17 USDT",
    exchangeRate: "333.00",
    traderReward: "165.17 USDT",
    createdAt: "2025-01-07T11:30:00",
    completedAt: "2025-01-07T12:00:00",
    status: "cancelled"
  },
  {
    id: "12368",
    device: "Устройство #5",
    paymentMethod: "СБП",
    bank: "Т-Банк",
    paymentDetails: "+7 (999) 222-33-44",
    ownerName: "Макарова Светлана Олеговна",
    amount: "180,000 ₽",
    amountUSDT: "540.54 USDT",
    exchangeRate: "333.00",
    traderReward: "540.54 USDT",
    createdAt: "2025-01-07T10:45:00",
    completedAt: "2025-01-07T11:15:00",
    status: "cancelled"
  },
  {
    id: "12369",
    device: "Устройство #1",
    paymentMethod: "C2C",
    bank: "Альфа-Банк",
    paymentDetails: "4276 1600 6666 7777",
    ownerName: "Попов Максим Евгеньевич",
    amount: "70,000 ₽",
    amountUSDT: "210.21 USDT",
    exchangeRate: "333.00",
    traderReward: "210.21 USDT",
    createdAt: "2025-01-07T09:20:00",
    completedAt: "2025-01-07T09:50:00",
    status: "cancelled"
  },
  {
    id: "12370",
    device: "Устройство #4",
    paymentMethod: "СБП",
    bank: "Газпромбанк",
    paymentDetails: "+7 (999) 555-66-77",
    ownerName: "Сергеева Марина Дмитриевна",
    amount: "125,000 ₽",
    amountUSDT: "375.38 USDT",
    exchangeRate: "333.00",
    traderReward: "375.38 USDT",
    createdAt: "2025-01-07T08:15:00",
    completedAt: "2025-01-07T08:45:00",
    status: "cancelled"
  },
  {
    id: "12371",
    device: "Устройство #2",
    paymentMethod: "C2C",
    bank: "Тинькофф Банк",
    paymentDetails: "5536 9139 2222 3333",
    ownerName: "Жуков Денис Артурович",
    amount: "95,000 ₽",
    amountUSDT: "285.29 USDT",
    exchangeRate: "333.00",
    traderReward: "285.29 USDT",
    createdAt: "2025-01-07T07:40:00",
    completedAt: "2025-01-07T08:10:00",
    status: "cancelled"
  },
  {
    id: "12372",
    device: "Устройство #3",
    paymentMethod: "СБП",
    bank: "Райффайзенбанк",
    paymentDetails: "+7 (999) 777-88-99",
    ownerName: "Фролова Валентина Петровна",
    amount: "40,000 ₽",
    amountUSDT: "120.12 USDT",
    exchangeRate: "333.00",
    traderReward: "120.12 USDT",
    createdAt: "2025-01-07T06:25:00",
    completedAt: "2025-01-07T06:55:00",
    status: "cancelled"
  },
  {
    id: "12373",
    device: "Устройство #5",
    paymentMethod: "C2C",
    bank: "ЮниКредит Банк",
    paymentDetails: "4274 3200 8888 9999",
    ownerName: "Крылов Владислав Сергеевич",
    amount: "160,000 ₽",
    amountUSDT: "480.48 USDT",
    exchangeRate: "333.00",
    traderReward: "480.48 USDT",
    createdAt: "2025-01-07T05:30:00",
    completedAt: "2025-01-07T06:00:00",
    status: "cancelled"
  },
  {
    id: "12374",
    device: "Устройство #1",
    paymentMethod: "СБП",
    bank: "Почта Банк",
    paymentDetails: "+7 (999) 999-00-11",
    ownerName: "Медведева Юлия Александровна",
    amount: "85,000 ₽",
    amountUSDT: "255.26 USDT",
    exchangeRate: "333.00",
    traderReward: "255.26 USDT",
    createdAt: "2025-01-07T04:45:00",
    completedAt: "2025-01-07T05:15:00",
    status: "cancelled"
  },
  {
    id: "12375",
    device: "Устройство #4",
    paymentMethod: "C2C",
    bank: "МТС Банк",
    paymentDetails: "5469 5500 4444 5555",
    ownerName: "Борисов Илья Романович",
    amount: "210,000 ₽",
    amountUSDT: "630.63 USDT",
    exchangeRate: "333.00",
    traderReward: "630.63 USDT",
    createdAt: "2025-01-07T03:20:00",
    completedAt: "2025-01-07T03:50:00",
    status: "cancelled"
  },

  // Dispute deals (10)
  {
    id: "12348",
    device: "Устройство #3",
    paymentMethod: "C2C",
    bank: "Тинькофф Банк",
    paymentDetails: "5536 9139 1234 5678",
    ownerName: "Козлова Анна Сергеевна",
    amount: "75,000 ₽",
    amountUSDT: "225.75 USDT",
    exchangeRate: "332.11",
    traderReward: "225.75 USDT",
    createdAt: "2025-01-06T11:30:00",
    completedAt: "2025-01-06T12:00:00",
    status: "dispute"
  },
  {
    id: "12376",
    device: "Устройство #1",
    paymentMethod: "СБП",
    bank: "Сбербанк",
    paymentDetails: "+7 (999) 123-99-88",
    ownerName: "Никитин Егор Владимирович",
    amount: "115,000 ₽",
    amountUSDT: "345.35 USDT",
    exchangeRate: "333.00",
    traderReward: "345.35 USDT",
    createdAt: "2025-01-06T10:20:00",
    completedAt: "2025-01-06T10:50:00",
    status: "dispute"
  },
  {
    id: "12377",
    device: "Устройство #4",
    paymentMethod: "C2C",
    bank: "ВТБ",
    paymentDetails: "4272 2900 7777 8888",
    ownerName: "Степанова Алина Михайловна",
    amount: "190,000 ₽",
    amountUSDT: "570.57 USDT",
    exchangeRate: "333.00",
    traderReward: "570.57 USDT",
    createdAt: "2025-01-06T09:15:00",
    completedAt: "2025-01-06T09:45:00",
    status: "dispute"
  },
  {
    id: "12378",
    device: "Устройство #2",
    paymentMethod: "СБП",
    bank: "Альфа-Банк",
    paymentDetails: "+7 (999) 456-78-90",
    ownerName: "Комаров Виктор Игоревич",
    amount: "50,000 ₽",
    amountUSDT: "150.15 USDT",
    exchangeRate: "333.00",
    traderReward: "150.15 USDT",
    createdAt: "2025-01-06T08:30:00",
    completedAt: "2025-01-06T09:00:00",
    status: "dispute"
  },
  {
    id: "12379",
    device: "Устройство #5",
    paymentMethod: "C2C",
    bank: "Газпромбанк",
    paymentDetails: "4276 5500 3333 4444",
    ownerName: "Лазарева Кристина Андреевна",
    amount: "135,000 ₽",
    amountUSDT: "405.41 USDT",
    exchangeRate: "333.00",
    traderReward: "405.41 USDT",
    createdAt: "2025-01-06T07:45:00",
    completedAt: "2025-01-06T08:15:00",
    status: "dispute"
  },
  {
    id: "12380",
    device: "Устройство #3",
    paymentMethod: "СБП",
    bank: "Тинькофф Банк",
    paymentDetails: "+7 (999) 789-01-23",
    ownerName: "Антонов Дмитрий Олегович",
    amount: "80,000 ₽",
    amountUSDT: "240.24 USDT",
    exchangeRate: "333.00",
    traderReward: "240.24 USDT",
    createdAt: "2025-01-06T06:20:00",
    completedAt: "2025-01-06T06:50:00",
    status: "dispute"
  },
  {
    id: "12381",
    device: "Устройство #1",
    paymentMethod: "C2C",
    bank: "Райффайзенбанк",
    paymentDetails: "5469 3800 5555 6666",
    ownerName: "Богданова Полина Сергеевна",
    amount: "165,000 ₽",
    amountUSDT: "495.50 USDT",
    exchangeRate: "333.00",
    traderReward: "495.50 USDT",
    createdAt: "2025-01-06T05:10:00",
    completedAt: "2025-01-06T05:40:00",
    status: "dispute"
  },
  {
    id: "12382",
    device: "Устройство #4",
    paymentMethod: "СБП",
    bank: "ЮниКредит Банк",
    paymentDetails: "+7 (999) 012-34-56",
    ownerName: "Михайлов Артур Валентинович",
    amount: "95,000 ₽",
    amountUSDT: "285.29 USDT",
    exchangeRate: "333.00",
    traderReward: "285.29 USDT",
    createdAt: "2025-01-06T04:35:00",
    completedAt: "2025-01-06T05:05:00",
    status: "dispute"
  },
  {
    id: "12383",
    device: "Устройство #2",
    paymentMethod: "C2C",
    bank: "Почта Банк",
    paymentDetails: "4276 7200 9999 0000",
    ownerName: "Соловьева Виктория Дмитриевна",
    amount: "220,000 ₽",
    amountUSDT: "660.66 USDT",
    exchangeRate: "333.00",
    traderReward: "660.66 USDT",
    createdAt: "2025-01-06T03:25:00",
    completedAt: "2025-01-06T03:55:00",
    status: "dispute"
  },
  {
    id: "12384",
    device: "Устройство #5",
    paymentMethod: "СБП",
    bank: "МТС Банк",
    paymentDetails: "+7 (999) 345-67-89",
    ownerName: "Семенов Роман Игоревич",
    amount: "110,000 ₽",
    amountUSDT: "330.33 USDT",
    exchangeRate: "333.00",
    traderReward: "330.33 USDT",
    createdAt: "2025-01-06T02:40:00",
    completedAt: "2025-01-06T03:10:00",
    status: "dispute"
  }
];

export default function Deals() {
  const [searchId, setSearchId] = useState("");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [activeTab, setActiveTab] = useState("active");
  const [dateFrom, setDateFrom] = useState<Date>();
  const [dateTo, setDateTo] = useState<Date>();
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Timer state for active deals
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update timer every second for active deals
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { label: "Активна", variant: "default" as const },
      completed: { label: "Завершена", variant: "secondary" as const },
      cancelled: { label: "Отменена", variant: "destructive" as const },
      dispute: { label: "Спор", variant: "outline" as const }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.active;
  };

  const getTimeDisplay = (deal: any, status: string) => {
    if (status === "active") {
      // Calculate elapsed time since creation
      const createdAt = new Date(deal.createdAt);
      const now = currentTime;
      const diffMs = now.getTime() - createdAt.getTime();
      
      const hours = Math.floor(diffMs / (1000 * 60 * 60));
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);
      
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    } else {
      return deal.completedAt ? format(new Date(deal.completedAt), "dd.MM.yyyy HH:mm:ss") : "—";
    }
  };

  const getTimeColumnHeader = (status: string) => {
    switch (status) {
      case "active": return "Таймер";
      case "completed": return "Завершено в";
      case "cancelled": return "Отменено в";
      case "dispute": return "Отменено в";
      default: return "Время";
    }
  };

  // Filter deals
  const filteredDeals = mockDeals.filter(deal => {
    if (deal.status !== activeTab) return false;
    if (searchId && !deal.id.includes(searchId)) return false;
    
    // Amount filtering
    if (minAmount) {
      const dealAmount = parseFloat(deal.amount.replace(/[₽,\s]/g, ''));
      const minAmountNum = parseFloat(minAmount);
      if (dealAmount < minAmountNum) return false;
    }
    
    if (maxAmount) {
      const dealAmount = parseFloat(deal.amount.replace(/[₽,\s]/g, ''));
      const maxAmountNum = parseFloat(maxAmount);
      if (dealAmount > maxAmountNum) return false;
    }
    
    // Date filtering
    if (dateFrom) {
      const dealDate = new Date(deal.createdAt);
      if (dealDate < dateFrom) return false;
    }
    
    if (dateTo) {
      const dealDate = new Date(deal.createdAt);
      if (dealDate > dateTo) return false;
    }
    
    return true;
  });

  // Pagination logic
  const totalItems = filteredDeals.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);
  const paginatedDeals = filteredDeals.slice(startIndex, endIndex);

  // Reset pagination when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchId, minAmount, maxAmount, activeTab, dateFrom, dateTo, pageSize]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const renderPaginationItems = () => {
    const items = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }
    } else {
      // Always show first page
      items.push(
        <PaginationItem key={1}>
          <PaginationLink 
            onClick={() => handlePageChange(1)}
            isActive={currentPage === 1}
            className="cursor-pointer"
          >
            1
          </PaginationLink>
        </PaginationItem>
      );

      // Show ellipsis if needed
      if (currentPage > 3) {
        items.push(<PaginationEllipsis key="start-ellipsis" />);
      }

      // Show pages around current page
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);
      
      for (let i = start; i <= end; i++) {
        items.push(
          <PaginationItem key={i}>
            <PaginationLink 
              onClick={() => handlePageChange(i)}
              isActive={currentPage === i}
              className="cursor-pointer"
            >
              {i}
            </PaginationLink>
          </PaginationItem>
        );
      }

      // Show ellipsis if needed
      if (currentPage < totalPages - 2) {
        items.push(<PaginationEllipsis key="end-ellipsis" />);
      }

      // Always show last page
      items.push(
        <PaginationItem key={totalPages}>
          <PaginationLink 
            onClick={() => handlePageChange(totalPages)}
            isActive={currentPage === totalPages}
            className="cursor-pointer"
          >
            {totalPages}
          </PaginationLink>
        </PaginationItem>
      );
    }
    
    return items;
  };

  return (
    <div className="space-y-6">
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
                <Input 
                  placeholder="Введите ID сделки" 
                  value={searchId} 
                  onChange={(e) => setSearchId(e.target.value)} 
                  className="pl-9" 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Мин. сумма (RUB)</label>
              <Input 
                type="number" 
                placeholder="0" 
                value={minAmount} 
                onChange={(e) => setMinAmount(e.target.value)} 
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Макс. сумма (RUB)</label>
              <Input 
                type="number" 
                placeholder="1000000" 
                value={maxAmount} 
                onChange={(e) => setMaxAmount(e.target.value)} 
              />
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
                    {dateFrom ? format(dateFrom, "dd.MM.yyyy") : "выберите дату"}
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
                    {dateTo ? format(dateTo, "dd.MM.yyyy") : "выберите дату"}
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
          </div>
        </CardContent>
      </Card>

      {/* Deals Table */}
      <Card>
        <CardContent className="p-0">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <div className="border-b border-border">
              <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 bg-transparent h-12">
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
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Устройство</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground min-w-[320px]">Реквизиты</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Сумма сделки</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Создана в</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">{getTimeColumnHeader(activeTab)}</th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">Действия</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedDeals.map((deal) => (
                      <tr key={deal.id} className="border-b border-border last:border-0 hover:bg-muted/50">
                        <td className="py-3 px-4 font-mono text-sm whitespace-nowrap">{deal.id}</td>
                        <td className="py-3 px-4 text-sm font-medium whitespace-nowrap">{deal.device}</td>
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
                            <div className="text-sm font-semibold whitespace-nowrap">{deal.amount}</div>
                            <div className="text-sm text-success font-semibold whitespace-nowrap">{deal.amountUSDT}</div>
                            <div className="text-xs text-muted-foreground whitespace-nowrap">Курс: {deal.exchangeRate} ₽/USDT</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground whitespace-nowrap">
                          {format(new Date(deal.createdAt), "dd.MM.yyyy HH:mm:ss")}
                        </td>
                        <td className="py-3 px-4 text-sm text-muted-foreground font-mono whitespace-nowrap">
                          {getTimeDisplay(deal, activeTab)}
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex gap-2 items-center">
                            {/* Кнопка подтвердить - не показывать для отмененных и завершенных */}
                            {activeTab !== "cancelled" && activeTab !== "completed" && (
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    Подтвердить
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>Подтверждение сделки</AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Вы действительно хотите подтвердить сделку {deal.id}? Это действие нельзя будет отменить.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>Нет</AlertDialogCancel>
                                    <AlertDialogAction>Да</AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            )}
                            
                            {/* Кнопка подробнее */}
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Подробности сделки {deal.id}</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-6">
                                  <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-3">
                                      <h4 className="font-semibold">Основная информация</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">ID сделки:</span>
                                          <span className="font-mono">{deal.id}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Статус:</span>
                                          <Badge variant={getStatusBadge(deal.status).variant}>
                                            {getStatusBadge(deal.status).label}
                                          </Badge>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Создана:</span>
                                          <span>{format(new Date(deal.createdAt), "dd.MM.yyyy HH:mm:ss")}</span>
                                        </div>
                                        {deal.completedAt && (
                                          <div className="flex justify-between">
                                            <span className="text-muted-foreground">Завершена:</span>
                                            <span>{format(new Date(deal.completedAt), "dd.MM.yyyy HH:mm:ss")}</span>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                    
                                    <div className="space-y-3">
                                      <h4 className="font-semibold">Финансовая информация</h4>
                                      <div className="space-y-2 text-sm">
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Сумма в рублях:</span>
                                          <span className="font-semibold">{deal.amount}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Сумма в USDT:</span>
                                          <span className="font-semibold text-success">{deal.amountUSDT}</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Курс обмена:</span>
                                          <span>{deal.exchangeRate} ₽/USDT</span>
                                        </div>
                                        <div className="flex justify-between">
                                          <span className="text-muted-foreground">Награда трейдера:</span>
                                          <span className="font-semibold text-success">{deal.traderReward}</span>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  
                                  <div className="space-y-3">
                                    <h4 className="font-semibold">Платежные реквизиты</h4>
                                    <div className="bg-muted p-4 rounded-lg space-y-2 text-sm">
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Метод платежа:</span>
                                        <span className="font-medium">{deal.paymentMethod}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Банк:</span>
                                        <span>{deal.bank}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Реквизиты:</span>
                                        <span className="font-mono">{deal.paymentDetails}</span>
                                      </div>
                                      <div className="flex justify-between">
                                        <span className="text-muted-foreground">Владелец:</span>
                                        <span>{deal.ownerName}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalItems > 0 && (
                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Показать</span>
                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger className="w-20">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                    <span>из {totalItems} записей</span>
                  </div>

                  <Pagination className="mx-0 w-auto">
                    <PaginationContent className="flex-wrap">
                      <PaginationItem>
                        <PaginationPrevious 
                          onClick={() => currentPage > 1 && handlePageChange(currentPage - 1)}
                          className={cn(
                            "cursor-pointer",
                            currentPage <= 1 && "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                      
                      {renderPaginationItems()}
                      
                      <PaginationItem>
                        <PaginationNext 
                          onClick={() => currentPage < totalPages && handlePageChange(currentPage + 1)}
                          className={cn(
                            "cursor-pointer",
                            currentPage >= totalPages && "pointer-events-none opacity-50"
                          )}
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}

              {filteredDeals.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">Сделки не найдены</p>
                </div>
              )}
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}