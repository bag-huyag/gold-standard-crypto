import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Lock, Users, Building2, TrendingUp, Wallet, MessageSquare, Handshake, Settings, Command, BarChart3, CreditCard } from "lucide-react";

export default function Admin() {
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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="traffic" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Аналитика трафика
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