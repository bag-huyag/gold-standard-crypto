import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Shield, Lock, Users, Building2, TrendingUp, Wallet, MessageSquare, Handshake, Settings, Command, BarChart3, CreditCard, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

export default function Admin() {
  const [editingTraffic, setEditingTraffic] = useState<any>(null);
  const [formData, setFormData] = useState({
    merchant: "",
    trader: "",
    commission: "",
    reward: "",
    priority: "",
    active: false
  });

  // Pagination state for disputes
  const [disputesCurrentPage, setDisputesCurrentPage] = useState(1);
  const disputesPerPage = 10;
  
  // Pagination state for deals
  const [dealsCurrentPage, setDealsCurrentPage] = useState(1);
  const dealsPerPage = 10;

  // Mock data for disputes (in real app, this would come from API)
  const allDisputes = [
    {
      id: "dfa176c4-29b6-4ffb-ad2a-035c00538892",
      bankDetails: {
        bank: "Т-Банк (SBP)",
        phone: "+79815574742",
        owner: "Бодя",
        trader: "obsthandler"
      },
      dealDetails: {
        orderId: "685a5d8e-fc6d-4f32-9c3e-9d6ba64eaee5",
        merchantOrderId: "trip-prod-test-1",
        amountRub: 2007,
        amountCrypto: 25.342829,
        rate: 79.194
      },
      disputeDetails: {
        reason: "WRONG_AMOUNT",
        status: "Открыт",
        amountRubDispute: 2007,
        amountCryptoDispute: 25.342829,
        autoAccept: "Истекло"
      }
    },
    {
      id: "xyz789ab-29b6-4ffb-ad2a-035c00538123",
      bankDetails: {
        bank: "Сбербанк",
        phone: "+79123456789",
        owner: "Иван Иванов",
        trader: "john_trader"
      },
      dealDetails: {
        orderId: "abc123de-fc6d-4f32-9c3e-9d6ba64eef78",
        merchantOrderId: "crypto-test-2",
        amountRub: 5000,
        amountCrypto: 62.5,
        rate: 80.0
      },
      disputeDetails: {
        reason: "PAYMENT_NOT_RECEIVED",
        status: "Заморожен",
        amountRubDispute: 5000,
        amountCryptoDispute: 62.5,
        autoAccept: "2 дня"
      }
    },
    // Add more mock disputes to demonstrate pagination
    ...Array.from({ length: 25 }, (_, i) => ({
      id: `dispute-${i + 3}`,
      bankDetails: {
        bank: i % 2 === 0 ? "Сбербанк" : "Т-Банк",
        phone: `+7912345${String(i).padStart(4, '0')}`,
        owner: `Владелец ${i + 3}`,
        trader: i % 3 === 0 ? "obsthandler" : i % 3 === 1 ? "john_trader" : "mike_trader"
      },
      dealDetails: {
        orderId: `order-${i + 3}`,
        merchantOrderId: `merchant-${i + 3}`,
        amountRub: 1000 + i * 100,
        amountCrypto: 10 + i,
        rate: 80 + i * 0.1
      },
      disputeDetails: {
        reason: i % 2 === 0 ? "WRONG_AMOUNT" : "PAYMENT_NOT_RECEIVED",
        status: i % 3 === 0 ? "Открыт" : i % 3 === 1 ? "Заморожен" : "Закрыт",
        amountRubDispute: 1000 + i * 100,
        amountCryptoDispute: 10 + i,
        autoAccept: i % 2 === 0 ? "Истекло" : `${i} дней`
      }
    }))
  ];

  // Mock data for deals
  const allDeals = [
    {
      id: "0e33...2294",
      bankDetails: {
        bank: "Т-Банк",
        code: "-",
        paymentSystem: "SBP",
        owner: "Магомед Темирбекович",
        requisites: "+79696650172"
      },
      amount: {
        rub: 15042,
        crypto: 178.075056,
        rate: 84.47
      },
      merchant: {
        name: "biwire_finance",
        id: "4558...8109"
      },
      merchantOrderId: "5f8c9774-7023-486b-ad34-2d56a4e10318",
      trader: {
        name: "Lightning's23",
        id: "f506...d788"
      },
      created: {
        utc: "12.09 16:47",
        local: "12.09 19:47"
      },
      updated: {
        utc: "12.09 16:47",
        local: "12.09 19:47"
      },
      timer: "6м 6с",
      status: "PENDING",
      action: "24fc...5e33"
    },
    // Add more mock deals to demonstrate pagination
    ...Array.from({ length: 30 }, (_, i) => ({
      id: `deal-${i + 2}`,
      bankDetails: {
        bank: i % 3 === 0 ? "Т-Банк" : i % 3 === 1 ? "Сбербанк" : "Альфа-Банк",
        code: "-",
        paymentSystem: i % 2 === 0 ? "SBP" : "CARD",
        owner: `Владелец ${i + 2}`,
        requisites: `+7912345${String(i).padStart(4, '0')}`
      },
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
      created: {
        utc: "12.09 16:47",
        local: "12.09 19:47"
      },
      updated: {
        utc: "12.09 16:47",
        local: "12.09 19:47"
      },
      timer: `${i + 1}м ${(i * 10) % 60}с`,
      status: i % 3 === 0 ? "PENDING" : i % 3 === 1 ? "COMPLETED" : "CANCELLED",
      action: `action-${i + 2}`
    }))
  ];

  // Calculate disputes pagination
  const totalDisputes = allDisputes.length;
  const totalDisputesPages = Math.ceil(totalDisputes / disputesPerPage);
  const disputesStartIndex = (disputesCurrentPage - 1) * disputesPerPage;
  const disputesEndIndex = disputesStartIndex + disputesPerPage;
  const currentDisputes = allDisputes.slice(disputesStartIndex, disputesEndIndex);

  // Calculate deals pagination
  const totalDeals = allDeals.length;
  const totalDealsPages = Math.ceil(totalDeals / dealsPerPage);
  const dealsStartIndex = (dealsCurrentPage - 1) * dealsPerPage;
  const dealsEndIndex = dealsStartIndex + dealsPerPage;
  const currentDeals = allDeals.slice(dealsStartIndex, dealsEndIndex);

  const handleEditTraffic = (traffic: any) => {
    setEditingTraffic(traffic);
    setFormData({
      merchant: traffic.merchant,
      trader: traffic.trader,
      commission: traffic.commission,
      reward: traffic.reward,
      priority: traffic.priority,
      active: traffic.active
    });
  };

  const handleCancelEdit = () => {
    setEditingTraffic(null);
    setFormData({
      merchant: "",
      trader: "",
      commission: "",
      reward: "",
      priority: "",
      active: false
    });
  };

  const handleUpdateTraffic = () => {
    // Here you would update the traffic record
    console.log("Updating traffic:", formData);
    setEditingTraffic(null);
    setFormData({
      merchant: "",
      trader: "",
      commission: "",
      reward: "",
      priority: "",
      active: false
    });
  };
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Shield className="h-8 w-8 text-destructive" />
          Админ-панель
        </h1>
      </div>

      {/* Admin Tabs */}
      <Tabs defaultValue="traders" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-11 gap-1">
          <TabsTrigger value="traders" className="flex items-center gap-1 text-xs">
            <Users className="h-3 w-3" />
            <span className="hidden sm:inline">Трейдеры</span>
          </TabsTrigger>
          <TabsTrigger value="merchants" className="flex items-center gap-1 text-xs">
            <Building2 className="h-3 w-3" />
            <span className="hidden sm:inline">Мерчанты</span>
          </TabsTrigger>
          <TabsTrigger value="traffic" className="flex items-center gap-1 text-xs">
            <TrendingUp className="h-3 w-3" />
            <span className="hidden sm:inline">Трафик</span>
          </TabsTrigger>
          <TabsTrigger value="wallets" className="flex items-center gap-1 text-xs">
            <Wallet className="h-3 w-3" />
            <span className="hidden sm:inline">Кошельки</span>
          </TabsTrigger>
          <TabsTrigger value="disputes" className="flex items-center gap-1 text-xs">
            <MessageSquare className="h-3 w-3" />
            <span className="hidden sm:inline">Диспуты</span>
          </TabsTrigger>
          <TabsTrigger value="deals" className="flex items-center gap-1 text-xs">
            <Handshake className="h-3 w-3" />
            <span className="hidden sm:inline">Сделки</span>
          </TabsTrigger>
          <TabsTrigger value="telegram" className="flex items-center gap-1 text-xs">
            <MessageSquare className="h-3 w-3" />
            <span className="hidden sm:inline">Телеграм</span>
          </TabsTrigger>
          <TabsTrigger value="settle-settings" className="flex items-center gap-1 text-xs">
            <Settings className="h-3 w-3" />
            <span className="hidden sm:inline">Settle</span>
          </TabsTrigger>
          <TabsTrigger value="teams" className="flex items-center gap-1 text-xs">
            <Command className="h-3 w-3" />
            <span className="hidden sm:inline">Команды</span>
          </TabsTrigger>
          <TabsTrigger value="trader-stats" className="flex items-center gap-1 text-xs">
            <BarChart3 className="h-3 w-3" />
            <span className="hidden sm:inline">Статистика</span>
          </TabsTrigger>
          <TabsTrigger value="payment-details" className="flex items-center gap-1 text-xs">
            <CreditCard className="h-3 w-3" />
            <span className="hidden sm:inline">Реквизиты</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traders" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Управление трейдерами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form for creating new trader */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-2 block">Username</label>
                  <input
                    type="text"
                    placeholder="Введите username"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Login</label>
                  <input
                    type="text"
                    placeholder="Введите login"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="flex items-end">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                    Создать трейдера
                  </button>
                </div>
              </div>

              {/* Traders table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Список трейдеров и тим-лидов</h3>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Username</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Login</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">1</td>
                        <td className="p-4 align-middle">john_trader</td>
                        <td className="p-4 align-middle">john.doe</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                            Трейдер
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Повысить до тим-лида
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">2</td>
                        <td className="p-4 align-middle">sarah_lead</td>
                        <td className="p-4 align-middle">sarah.smith</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-primary text-primary-foreground">
                            Тим-лид
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Понизить до трейдера
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">3</td>
                        <td className="p-4 align-middle">mike_trader</td>
                        <td className="p-4 align-middle">mike.johnson</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                            Трейдер
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3">
                            Повысить до тим-лида
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchants" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Управление мерчантами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Form for creating new merchant */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-2 block">Username</label>
                  <input
                    type="text"
                    placeholder="Введите username"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Login</label>
                  <input
                    type="text"
                    placeholder="Введите login"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Password</label>
                  <input
                    type="password"
                    placeholder="Введите пароль"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div className="flex items-end">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
                    Создать мерчанта
                  </button>
                </div>
              </div>

              {/* Merchants table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Список мерчантов</h3>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Username</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Login</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">1</td>
                        <td className="p-4 align-middle">merchant_one</td>
                        <td className="p-4 align-middle">merchant1</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                            Мерчант
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">2</td>
                        <td className="p-4 align-middle">merchant_two</td>
                        <td className="p-4 align-middle">merchant2</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                            Мерчант
                          </span>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">3</td>
                        <td className="p-4 align-middle">merchant_three</td>
                        <td className="p-4 align-middle">merchant3</td>
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                            Мерчант
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Управление трафиком
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Create new record panel */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Создание новой записи</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 border rounded-lg">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Мерчант</label>
                    <select 
                      value={formData.merchant}
                      onChange={(e) => setFormData({...formData, merchant: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Выберите мерчанта</option>
                      <option value="merchant1">biwire_finance (account@bitwire.finance)</option>
                      <option value="merchant2">crypto_exchange (admin@cryptoex.com)</option>
                      <option value="merchant3">payment_gateway (info@paygate.io)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Трейдер</label>
                    <select 
                      value={formData.trader}
                      onChange={(e) => setFormData({...formData, trader: e.target.value})}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <option value="">Выберите трейдера</option>
                      <option value="trader1">Puldorovich (Puldorovich)</option>
                      <option value="trader2">john_trader (john.doe)</option>
                      <option value="trader3">mike_trader (mike.johnson)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Комиссия платформы</label>
                    <input
                      type="text"
                      value={formData.commission}
                      onChange={(e) => setFormData({...formData, commission: e.target.value})}
                      placeholder="9.500%"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Награда трейдера (%)</label>
                    <input
                      type="text"
                      value={formData.reward}
                      onChange={(e) => setFormData({...formData, reward: e.target.value})}
                      placeholder="8.000%"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Приоритет трейдера</label>
                    <input
                      type="text"
                      value={formData.priority}
                      onChange={(e) => setFormData({...formData, priority: e.target.value})}
                      placeholder="100"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Активный трафик</label>
                    <div className="flex items-center space-x-2 mt-2">
                      <label className="inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={formData.active}
                          onChange={(e) => setFormData({...formData, active: e.target.checked})}
                          className="sr-only peer" 
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                      </label>
                    </div>
                  </div>
                </div>
                <div className="flex justify-start gap-2">
                  {editingTraffic ? (
                    <>
                      <button 
                        onClick={handleUpdateTraffic}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
                      >
                        Обновить
                      </button>
                      <button 
                        onClick={handleCancelEdit}
                        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2"
                      >
                        Отменить
                      </button>
                    </>
                  ) : (
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                      Создать
                    </button>
                  )}
                </div>
              </div>

              {/* Traffic settings table */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Настройки трафика</h3>
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead className="[&_tr]:border-b">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Статус</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Мерчант</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Трейдер</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Награда</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Приоритет</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Комиссия</th>
                        <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Действия</th>
                      </tr>
                    </thead>
                    <tbody className="[&_tr:last-child]:border-0">
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                            Активен
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">biwire_finance</div>
                            <div className="text-xs text-muted-foreground">(account@bitwire.finance)</div>
                            <div className="text-xs text-muted-foreground">455854...</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">Puldorovich</div>
                            <div className="text-xs text-muted-foreground">(Puldorovich)</div>
                            <div className="text-xs text-muted-foreground">ef1fd4...</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">8.000%</td>
                        <td className="p-4 align-middle">100</td>
                        <td className="p-4 align-middle">9.500%</td>
                        <td className="p-4 align-middle">
                          <button 
                            onClick={() => handleEditTraffic({
                              merchant: "merchant1",
                              trader: "trader1", 
                              commission: "9.500%",
                              reward: "8.000%",
                              priority: "100",
                              active: true
                            })}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                          >
                            Редактировать
                          </button>
                        </td>
                      </tr>
                      <tr className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
                            Неактивен
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">crypto_exchange</div>
                            <div className="text-xs text-muted-foreground">(admin@cryptoex.com)</div>
                            <div className="text-xs text-muted-foreground">789abc...</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">john_trader</div>
                            <div className="text-xs text-muted-foreground">(john.doe)</div>
                            <div className="text-xs text-muted-foreground">123xyz...</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">7.500%</td>
                        <td className="p-4 align-middle">85</td>
                        <td className="p-4 align-middle">8.750%</td>
                        <td className="p-4 align-middle">
                          <button 
                            onClick={() => handleEditTraffic({
                              merchant: "merchant2",
                              trader: "trader2", 
                              commission: "8.750%",
                              reward: "7.500%",
                              priority: "85",
                              active: false
                            })}
                            className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3"
                          >
                            Редактировать
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallets" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wallet className="h-5 w-5" />
                Управление кошельками
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User/Platform Selection */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Выберите пользователя или платформу</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Выберите пользователя</option>
                    <option value="user1">john_trader (john.doe)</option>
                    <option value="user2">sarah_lead (sarah.smith)</option>
                    <option value="platform1">Платформа - Основной кошелек</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Выбор кошелька</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Выберите кошелек</option>
                    <option value="wallet1">USDT Wallet (TUowL9EwagYcezrKNXd6Y4XhpCts3qHYLn)</option>
                    <option value="wallet2">BTC Wallet (1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa)</option>
                  </select>
                </div>
              </div>

              {/* Wallet Information Block */}
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Информация о кошельке</h3>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3">
                      Вывод средств
                    </button>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm"><span className="font-medium">Адрес:</span> TUowL9EwagYcezrKNXd6Y4XhpCts3qHYLn</p>
                    <p className="text-sm"><span className="font-medium">Баланс:</span> -0.5401389845963962 USDT</p>
                    <p className="text-sm"><span className="font-medium">Заморожено:</span> 0.000003138556010640059 USDT</p>
                  </div>
                </div>

                {/* Deposit Block */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Пополнение кошелька</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Сумма депозита</label>
                      <input
                        type="text"
                        placeholder="Введите сумму"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-600 text-white hover:bg-green-700 h-10 px-4 py-2">
                      Пополнить
                    </button>
                  </div>
                </div>

                {/* Withdrawal Block */}
                <div className="border rounded-lg p-4">
                  <h3 className="text-lg font-semibold mb-4">Списание средств</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Сумма списания</label>
                      <input
                        type="text"
                        placeholder="Введите сумму"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      />
                    </div>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-10 px-4 py-2">
                      Списать
                    </button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="disputes" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Управление диспутами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-2 block">Статус</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все статусы</option>
                    <option value="open">Открыты</option>
                    <option value="accepted">Принят</option>
                    <option value="rejected">Отклонён</option>
                    <option value="frozen">Заморожен</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Трейдер</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все трейдеры</option>
                    <option value="obsthandler">obsthandler</option>
                    <option value="john_trader">john_trader</option>
                    <option value="mike_trader">mike_trader</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Мерчант</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все мерчанты</option>
                    <option value="merchant1">biwire_finance</option>
                    <option value="merchant2">crypto_exchange</option>
                    <option value="merchant3">payment_gateway</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ID диспута</label>
                  <input
                    type="text"
                    placeholder="Фильтр по ID диспута"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ID сделки</label>
                  <input
                    type="text"
                    placeholder="Фильтр по ID сделки"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Записей</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                  </select>
                </div>
              </div>
              <div className="flex justify-start">
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  Сбросить фильтр
                </button>
              </div>

              {/* Disputes List */}
              <div className="space-y-4">
                {currentDisputes.map((dispute) => (
                  <div key={dispute.id} className="border rounded-lg p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {/* Bank Details */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">Банковские реквизиты</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Банк:</span> {dispute.bankDetails.bank}</p>
                          <p><span className="font-medium">Телефон:</span> {dispute.bankDetails.phone}</p>
                          <p><span className="font-medium">Владелец:</span> {dispute.bankDetails.owner}</p>
                          <p><span className="font-medium">Trader:</span> {dispute.bankDetails.trader}</p>
                        </div>
                      </div>

                      {/* Deal Details */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">Детали сделки</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">Order ID:</span> {dispute.dealDetails.orderId}</p>
                          <p><span className="font-medium">Merchant Order ID:</span> {dispute.dealDetails.merchantOrderId}</p>
                          <p><span className="font-medium">Сумма (₽):</span> {dispute.dealDetails.amountRub}</p>
                          <p><span className="font-medium">Сумма (крипто):</span> {dispute.dealDetails.amountCrypto}</p>
                          <p><span className="font-medium">Курс:</span> {dispute.dealDetails.rate}</p>
                        </div>
                      </div>

                      {/* Dispute Details */}
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm text-muted-foreground">Детали диспута</h4>
                        <div className="space-y-1 text-sm">
                          <p><span className="font-medium">ID диспута:</span> {dispute.id}</p>
                          <p><span className="font-medium">Причина:</span> {dispute.disputeDetails.reason}</p>
                          <p><span className="font-medium">Статус:</span> 
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ml-2 ${
                              dispute.disputeDetails.status === "Открыт" 
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                                : dispute.disputeDetails.status === "Заморожен"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                            }`}>
                              {dispute.disputeDetails.status}
                            </span>
                          </p>
                          <p><span className="font-medium">Сумма диспута (₽):</span> {dispute.disputeDetails.amountRubDispute}</p>
                          <p><span className="font-medium">Сумма диспута (крипто):</span> {dispute.disputeDetails.amountCryptoDispute}</p>
                          <p><span className="font-medium">Доказательство</span></p>
                          <p><span className="font-medium">До автопринятия:</span> {dispute.disputeDetails.autoAccept}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-4 border-t">
                      {dispute.disputeDetails.status === "Открыт" && (
                        <>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-600 text-white hover:bg-green-700 h-9 px-3">
                            Закрыть
                          </button>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3">
                            Отменить
                          </button>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3">
                            Заморозить
                          </button>
                        </>
                      )}
                      {dispute.disputeDetails.status === "Заморожен" && (
                        <>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-600 text-white hover:bg-green-700 h-9 px-3">
                            Завершить
                          </button>
                          <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3">
                            Отклонить
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Disputes Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Показано {disputesStartIndex + 1}-{Math.min(disputesEndIndex, totalDisputes)} из {totalDisputes} диспутов
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDisputesCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={disputesCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Назад
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalDisputesPages) }, (_, i) => {
                      let pageNum;
                      if (totalDisputesPages <= 5) {
                        pageNum = i + 1;
                      } else if (disputesCurrentPage <= 3) {
                        pageNum = i + 1;
                      } else if (disputesCurrentPage >= totalDisputesPages - 2) {
                        pageNum = totalDisputesPages - 4 + i;
                      } else {
                        pageNum = disputesCurrentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={disputesCurrentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDisputesCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDisputesCurrentPage(prev => Math.min(prev + 1, totalDisputesPages))}
                    disabled={disputesCurrentPage === totalDisputesPages}
                  >
                    Вперёд
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="deals" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Handshake className="h-5 w-5" />
                Управление сделками
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Filters */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4 border rounded-lg">
                <div>
                  <label className="text-sm font-medium mb-2 block">Трейдер</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все трейдеры</option>
                    <option value="lightning">Lightning's23</option>
                    <option value="puldorovich">Puldorovich</option>
                    <option value="john">john_trader</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Мерчант</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все мерчанты</option>
                    <option value="biwire">biwire_finance</option>
                    <option value="crypto">crypto_exchange</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Статус</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все статусы</option>
                    <option value="PENDING">PENDING</option>
                    <option value="COMPLETED">COMPLETED</option>
                    <option value="CANCELLED">CANCELLED</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Тип сделки</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все типы</option>
                    <option value="BUY">Покупка</option>
                    <option value="SELL">Продажа</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ID сделки</label>
                  <input
                    type="text"
                    placeholder="Поиск по ID"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ID заказа мерчанта</label>
                  <input
                    type="text"
                    placeholder="Merchant Order ID"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Банк</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все банки</option>
                    <option value="tbank">Т-Банк</option>
                    <option value="sber">Сбербанк</option>
                    <option value="alfa">Альфа-Банк</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">ID устройства</label>
                  <input
                    type="text"
                    placeholder="Device ID"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Платежная система</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="">Все системы</option>
                    <option value="SBP">SBP</option>
                    <option value="CARD">Карта</option>
                    <option value="QIWI">QIWI</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сумма от</label>
                  <input
                    type="text"
                    placeholder="Мин. сумма (₽)"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Сумма до</label>
                  <input
                    type="text"
                    placeholder="Макс. сумма (₽)"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Дата от</label>
                  <input
                    type="text"
                    placeholder="дд.мм.гггг"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Дата до</label>
                  <input
                    type="text"
                    placeholder="дд.мм.гггг"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Записей на странице</label>
                  <select className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="50">50</option>
                    <option value="100">100</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">&nbsp;</label>
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2 w-full">
                    Сбросить
                  </button>
                </div>
              </div>

              {/* Summary */}
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>Всего сделок: {totalDeals}</span>
                <span>Страница: {dealsCurrentPage} из {totalDealsPages}</span>
              </div>

              {/* Deals Table */}
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead className="[&_tr]:border-b">
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID сделки</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Реквизиты</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Сумма</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Мерчант</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Merchant Order ID</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Трейдер</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Создана</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Обновлена</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Таймер</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Статус</th>
                      <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Действия</th>
                    </tr>
                  </thead>
                  <tbody className="[&_tr:last-child]:border-0">
                    {currentDeals.map((deal) => (
                      <tr key={deal.id} className="border-b transition-colors hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="text-xs">
                            <div className="font-mono">{deal.id}⎘</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs space-y-1">
                            <div><span className="font-medium">Банк:</span> {deal.bankDetails.bank}</div>
                            <div><span className="font-medium">Код:</span> {deal.bankDetails.code}</div>
                            <div><span className="font-medium">ПС:</span> {deal.bankDetails.paymentSystem}</div>
                            <div><span className="font-medium">Владелец:</span> {deal.bankDetails.owner}</div>
                            <div><span className="font-medium">Реквизиты:</span> {deal.bankDetails.requisites}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs space-y-1">
                            <div><span className="font-medium">Рубли:</span> {deal.amount.rub} ₽</div>
                            <div><span className="font-medium">Крипто:</span> {deal.amount.crypto} USD</div>
                            <div><span className="font-medium">Курс:</span> {deal.amount.rate}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs">
                            <div>{deal.merchant.name}</div>
                            <div className="font-mono">{deal.merchant.id}⎘</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs font-mono">{deal.merchantOrderId}</div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs">
                            <div>{deal.trader.name}</div>
                            <div className="font-mono">{deal.trader.id}⎘</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs space-y-1">
                            <div><span className="font-medium">UTC:</span> {deal.created.utc}</div>
                            <div><span className="font-medium">Лок:</span> {deal.created.local}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs space-y-1">
                            <div><span className="font-medium">UTC:</span> {deal.updated.utc}</div>
                            <div><span className="font-medium">Лок:</span> {deal.updated.local}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div className="text-xs">{deal.timer}</div>
                        </td>
                        <td className="p-4 align-middle">
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                            deal.status === "PENDING" 
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : deal.status === "COMPLETED"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}>
                            {deal.status}
                          </span>
                        </td>
                        <td className="p-4 align-middle">
                          {deal.status === "COMPLETED" ? (
                            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-2 text-xs">
                              Открыть диспут
                            </button>
                          ) : (
                            <div className="text-xs font-mono">{deal.action}⎘</div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Deals Pagination */}
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Показано {dealsStartIndex + 1}-{Math.min(dealsEndIndex, totalDeals)} из {totalDeals} сделок
                </div>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDealsCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={dealsCurrentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Назад
                  </Button>
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalDealsPages) }, (_, i) => {
                      let pageNum;
                      if (totalDealsPages <= 5) {
                        pageNum = i + 1;
                      } else if (dealsCurrentPage <= 3) {
                        pageNum = i + 1;
                      } else if (dealsCurrentPage >= totalDealsPages - 2) {
                        pageNum = totalDealsPages - 4 + i;
                      } else {
                        pageNum = dealsCurrentPage - 2 + i;
                      }
                      
                      return (
                        <Button
                          key={pageNum}
                          variant={dealsCurrentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => setDealsCurrentPage(pageNum)}
                          className="w-8 h-8 p-0"
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => setDealsCurrentPage(prev => Math.min(prev + 1, totalDealsPages))}
                    disabled={dealsCurrentPage === totalDealsPages}
                  >
                    Вперёд
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="telegram" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Интеграция с Телеграм
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">Генерация токена</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="login">Login</Label>
                    <Input
                      id="login"
                      type="text"
                      placeholder="Введите логин"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Введите пароль"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Войти
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settle-settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Настройки Settle
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="user-select">Выберите пользователя</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Выберите пользователя" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="user1">Пользователь 1</SelectItem>
                    <SelectItem value="user2">Пользователь 2</SelectItem>
                    <SelectItem value="user3">Пользователь 3</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="fixed-fee">Fixed Fee:</Label>
                  <Input
                    id="fixed-fee"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="min-amount">Min Amount:</Label>
                  <Input
                    id="min-amount"
                    type="number"
                    placeholder="0.00"
                  />
                </div>
                <div>
                  <Label htmlFor="cooldown-seconds">Cooldown Seconds:</Label>
                  <Input
                    id="cooldown-seconds"
                    type="number"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <Button type="submit" className="w-full md:w-auto">
                Создать / Обновить правило
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Command className="h-5 w-5" />
                Управление командами
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Team Lead Selection */}
              <div>
                <Label htmlFor="team-lead-select">Выберите тим-лида:</Label>
                <Select>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Lightning's23 (Lightning's23)" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lightning23">Lightning's23 (Lightning's23)</SelectItem>
                    <SelectItem value="merchant1">Merchant 1</SelectItem>
                    <SelectItem value="trader2">Trader 2</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Relationships Display */}
              <div>
                <p className="text-sm font-medium mb-4">Отношения для: Lightning's23</p>
              </div>

              {/* Current Teams */}
              <div>
                <h3 className="text-lg font-medium mb-4">Текущие команды</h3>
                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Трейдер</TableHead>
                        <TableHead>Комиссия</TableHead>
                        <TableHead>Действия</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Lmanaliew_001</TableCell>
                        <TableCell>1.5%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Изменить</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>leleha10</TableCell>
                        <TableCell>0.5%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Изменить</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>abdusalamovm77</TableCell>
                        <TableCell>0.5%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Изменить</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>adus20091</TableCell>
                        <TableCell>0.5%</TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">Изменить</Button>
                            <Button variant="destructive" size="sm">Удалить</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Create New Team */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium mb-4">Создать новую команду</h3>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="trader-select">Трейдер:</Label>
                    <Select>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="-- Выберите трейдера --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader1">Трейдер 1</SelectItem>
                        <SelectItem value="trader2">Трейдер 2</SelectItem>
                        <SelectItem value="trader3">Трейдер 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="commission-share">Комиссия (доля):</Label>
                    <Input
                      id="commission-share"
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      defaultValue="0"
                      placeholder="Введите долю от 0 до 1 (например, 0.05 = 5%)"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Введите долю от 0 до 1 (например, 0.05 = 5%)
                    </p>
                  </div>
                  
                  <Button type="submit" className="w-full md:w-auto">
                    Создать
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="trader-stats" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Статистика пользователя
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* User Selection */}
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="user-stats-select">Выберите пользователя:</Label>
                  <Select>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="adus20091 (TRADER)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="adus20091">adus20091 (TRADER)</SelectItem>
                      <SelectItem value="lightning23">Lightning's23 (TRADER)</SelectItem>
                      <SelectItem value="merchant1">Merchant 1 (MERCHANT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Date Range */}
                <div className="flex gap-2">
                  <div>
                    <Label>С</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          11.09.2025
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div>
                    <Label>По</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-[140px] justify-start text-left font-normal">
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          12.09.2025
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          initialFocus
                          className="p-3 pointer-events-auto"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-muted-foreground">Успешных сделок</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Обработано заявок</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-muted-foreground">Отменённых сделок</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Отклонено заявок</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0 USD</div>
                      <div className="text-xs text-muted-foreground">Сумма в крипте (обработано)</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Успешные заявки</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0 ₽</div>
                      <div className="text-xs text-muted-foreground">Сумма в фиате (обработано)</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Успешные заявки</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0 USD</div>
                      <div className="text-xs text-muted-foreground">Сумма в крипте (отмена)</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Отклонённые заявки</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0 ₽</div>
                      <div className="text-xs text-muted-foreground">Сумма в фиате (отмена)</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Отклонённые заявки</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">+0 USD</div>
                      <div className="text-xs text-muted-foreground">Прибыль в крипте</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">Чистая прибыль</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">0</div>
                      <div className="text-xs text-muted-foreground">Всего сделок</div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-muted-foreground">—</div>
                      <div className="text-xs text-muted-foreground">За период</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payment-details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Управление реквизитами
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <Label>Трейдер/Тимлид:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="shrayder">Shrayder</SelectItem>
                        <SelectItem value="lightning">Lightning's23</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Банк:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="sberbank">Сбербанк</SelectItem>
                        <SelectItem value="tbank">Т-Банк</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Платежная система:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="sberbank">Сбербанк</SelectItem>
                        <SelectItem value="tbank">Т-Банк</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label>Статус:</Label>
                    <Select defaultValue="all">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Все</SelectItem>
                        <SelectItem value="enabled">Включен</SelectItem>
                        <SelectItem value="disabled">Выключен</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Трейдер</TableHead>
                        <TableHead>Банк</TableHead>
                        <TableHead>Ограничения</TableHead>
                        <TableHead>Статус</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell className="font-mono text-xs">ae871c06...f0f2</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium">S</span>
                            </div>
                            Shrayder
                            <span className="text-xs text-muted-foreground">9d61a677...4b84</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">Сбербанк</div>
                            <div className="text-sm text-muted-foreground">Пономарев Владислав Павлович</div>
                            <div className="text-sm text-muted-foreground">Карта: 2202206901098942</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>Мин: 5000 Макс: 100000</div>
                            <div>В день: 10000000 В месяц: 10000000</div>
                            <div>Одновр. заказов: 50</div>
                            <div>Кол-во в день: 10000000</div>
                            <div>Кол-во в месяц: 1000000</div>
                            <div>Интервал между сделками (мин): 0</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="destructive">Выключен</Badge>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell className="font-mono text-xs">fffe8816...b3eb</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-xs font-medium">L</span>
                            </div>
                            Lightning's23
                            <span className="text-xs text-muted-foreground">f506a0e7...d788</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium">Т-Банк</div>
                            <div className="text-sm text-muted-foreground">Магомед Темирбекович</div>
                            <div className="text-sm text-muted-foreground">Телефон: +79696650172</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm space-y-1">
                            <div>Мин: 9000 Макс: 20000</div>
                            <div>В день: 25000 В месяц: 1000000</div>
                            <div>Одновр. заказов: 3</div>
                            <div>Кол-во в день: 2</div>
                            <div>Кол-во в месяц: 1000000</div>
                            <div>Интервал между сделками (мин): 20</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant="default">Включен</Badge>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}