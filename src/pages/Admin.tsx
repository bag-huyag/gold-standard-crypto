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
            <CardContent>
              <div className="text-center py-12">
                <Lock className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Раздел в разработке</p>
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