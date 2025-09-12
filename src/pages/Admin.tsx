import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Shield, Lock, Users, Building2, TrendingUp, Wallet, MessageSquare, Handshake, Settings, Command, BarChart3, CreditCard } from "lucide-react";
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
                {/* Dispute Card 1 - Open */}
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bank Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Банковские реквизиты</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Банк:</span> Т-Банк (SBP)</p>
                        <p><span className="font-medium">Телефон:</span> +79815574742</p>
                        <p><span className="font-medium">Владелец:</span> Бодя</p>
                        <p><span className="font-medium">Trader:</span> obsthandler</p>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Детали сделки</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Order ID:</span> 685a5d8e-fc6d-4f32-9c3e-9d6ba64eaee5</p>
                        <p><span className="font-medium">Merchant Order ID:</span> trip-prod-test-1</p>
                        <p><span className="font-medium">Сумма (₽):</span> 2007</p>
                        <p><span className="font-medium">Сумма (крипто):</span> 25.342829</p>
                        <p><span className="font-medium">Курс:</span> 79.194</p>
                      </div>
                    </div>

                    {/* Dispute Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Детали диспута</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">ID диспута:</span> dfa176c4-29b6-4ffb-ad2a-035c00538892</p>
                        <p><span className="font-medium">Причина:</span> WRONG_AMOUNT</p>
                        <p><span className="font-medium">Статус:</span> <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">Открыт</span></p>
                        <p><span className="font-medium">Сумма диспута (₽):</span> 2007</p>
                        <p><span className="font-medium">Сумма диспута (крипто):</span> 25.342829</p>
                        <p><span className="font-medium">Доказательство</span></p>
                        <p><span className="font-medium">До автопринятия:</span> Истекло</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Open Dispute */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-600 text-white hover:bg-green-700 h-9 px-3">
                      Закрыть
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3">
                      Отменить
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-blue-600 text-white hover:bg-blue-700 h-9 px-3">
                      Заморозить
                    </button>
                  </div>
                </div>

                {/* Dispute Card 2 - Frozen */}
                <div className="border rounded-lg p-6 space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Bank Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Банковские реквизиты</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Банк:</span> Сбербанк</p>
                        <p><span className="font-medium">Телефон:</span> +79123456789</p>
                        <p><span className="font-medium">Владелец:</span> Иван Иванов</p>
                        <p><span className="font-medium">Trader:</span> john_trader</p>
                      </div>
                    </div>

                    {/* Deal Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Детали сделки</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">Order ID:</span> abc123de-fc6d-4f32-9c3e-9d6ba64eef78</p>
                        <p><span className="font-medium">Merchant Order ID:</span> crypto-test-2</p>
                        <p><span className="font-medium">Сумма (₽):</span> 5000</p>
                        <p><span className="font-medium">Сумма (крипто):</span> 62.5</p>
                        <p><span className="font-medium">Курс:</span> 80.0</p>
                      </div>
                    </div>

                    {/* Dispute Details */}
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm text-muted-foreground">Детали диспута</h4>
                      <div className="space-y-1 text-sm">
                        <p><span className="font-medium">ID диспута:</span> xyz789ab-29b6-4ffb-ad2a-035c00538123</p>
                        <p><span className="font-medium">Причина:</span> PAYMENT_NOT_RECEIVED</p>
                        <p><span className="font-medium">Статус:</span> <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">Заморожен</span></p>
                        <p><span className="font-medium">Сумма диспута (₽):</span> 5000</p>
                        <p><span className="font-medium">Сумма диспута (крипто):</span> 62.5</p>
                        <p><span className="font-medium">Доказательство</span></p>
                        <p><span className="font-medium">До автопринятия:</span> 2 дня</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons for Frozen Dispute */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-green-600 text-white hover:bg-green-700 h-9 px-3">
                      Завершить
                    </button>
                    <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-destructive text-destructive-foreground hover:bg-destructive/90 h-9 px-3">
                      Отклонить
                    </button>
                  </div>
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
                <span>Всего сделок: 3199</span>
                <span>Страница: 1 из 320</span>
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
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div className="font-mono">0e33...2294⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Банк:</span> Т-Банк</div>
                          <div><span className="font-medium">Код:</span> -</div>
                          <div><span className="font-medium">ПС:</span> SBP</div>
                          <div><span className="font-medium">Владелец:</span> Магомед Темирбекович</div>
                          <div><span className="font-medium">Реквизиты:</span> +79696650172</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Рубли:</span> 15042 ₽</div>
                          <div><span className="font-medium">Крипто:</span> 178.075056 USD</div>
                          <div><span className="font-medium">Курс:</span> 84.47</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>biwire_finance</div>
                          <div className="font-mono">4558...8109⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">5f8c9774-7023-486b-ad34-2d56a4e10318</div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>Lightning's23</div>
                          <div className="font-mono">f506...d788⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:47</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:47</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:47</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:47</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">6м 6с</div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          PENDING
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">24fc...5e33⎘</div>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div className="font-mono">24fc...5e33⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Банк:</span> Т-Банк</div>
                          <div><span className="font-medium">Код:</span> -</div>
                          <div><span className="font-medium">ПС:</span> SBP</div>
                          <div><span className="font-medium">Владелец:</span> Марьям Алиевна</div>
                          <div><span className="font-medium">Реквизиты:</span> +79332111094</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Рубли:</span> 11556 ₽</div>
                          <div><span className="font-medium">Крипто:</span> 136.841607 USD</div>
                          <div><span className="font-medium">Курс:</span> 84.448</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>biwire_finance</div>
                          <div className="font-mono">4558...8109⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">cb65e73b-3d19-4f17-9554-01c71ba9783f</div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>Lightning's23</div>
                          <div className="font-mono">f506...d788⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:46</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:46</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:46</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:46</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">4м 55с</div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
                          PENDING
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">0f53...1943⎘</div>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div className="font-mono">0f53...1943⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Банк:</span> Т-Банк</div>
                          <div><span className="font-medium">Код:</span> -</div>
                          <div><span className="font-medium">ПС:</span> SBP</div>
                          <div><span className="font-medium">Владелец:</span> Бозоров Улугбек Жура У</div>
                          <div><span className="font-medium">Реквизиты:</span> +79152711412</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Рубли:</span> 5480 ₽</div>
                          <div><span className="font-medium">Крипто:</span> 64.892005 USD</div>
                          <div><span className="font-medium">Курс:</span> 84.448</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>biwire_finance</div>
                          <div className="font-mono">4558...8109⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">fdb38091-5c52-4fba-af69-91b80fea82c0</div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>Puldorovich</div>
                          <div className="font-mono">ef1f...5dea⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:46</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:46</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:47</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:47</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">4м 39с</div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          COMPLETED
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-2 text-xs">
                          Открыть диспут
                        </button>
                      </td>
                    </tr>
                    <tr className="border-b transition-colors hover:bg-muted/50">
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div className="font-mono">ef6b...854f⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Банк:</span> Т-Банк</div>
                          <div><span className="font-medium">Код:</span> -</div>
                          <div><span className="font-medium">ПС:</span> SBP</div>
                          <div><span className="font-medium">Владелец:</span> Марьям Алиевна</div>
                          <div><span className="font-medium">Реквизиты:</span> +79332111094</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">Рубли:</span> 9721 ₽</div>
                          <div><span className="font-medium">Крипто:</span> 115.112258 USD</div>
                          <div><span className="font-medium">Курс:</span> 84.448</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>biwire_finance</div>
                          <div className="font-mono">4558...8109⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs font-mono">acb401bb-62ff-40ac-bf65-ea5ccc92f780</div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">
                          <div>Lightning's23</div>
                          <div className="font-mono">f506...d788⎘</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:42</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:42</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs space-y-1">
                          <div><span className="font-medium">UTC:</span> 12.09 16:58</div>
                          <div><span className="font-medium">Лок:</span> 12.09 19:58</div>
                        </div>
                      </td>
                      <td className="p-4 align-middle">
                        <div className="text-xs">1м 7с</div>
                      </td>
                      <td className="p-4 align-middle">
                        <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
                          COMPLETED
                        </span>
                      </td>
                      <td className="p-4 align-middle">
                        <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-8 px-2 text-xs">
                          Открыть диспут
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
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
                Статистика трейдеров
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}