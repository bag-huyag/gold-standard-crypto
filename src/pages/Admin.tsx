import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
              </div>
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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