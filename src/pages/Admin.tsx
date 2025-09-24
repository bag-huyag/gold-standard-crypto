// components/Admin.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  Wallet, 
  CreditCard,
  Handshake,
  MessageSquare,
  Settings,
  BarChart3,
  Command
} from "lucide-react";

// Новые группированные компоненты
import DashboardTab from "@/components/admin/DashboardTab";
import UsersTab from "@/components/admin/UsersTab";
import FinanceTab from "@/components/admin/FinanceTab";
import OperationsTab from "@/components/admin/OperationsTab";
import PlatformTab from "@/components/admin/PlatformTab";

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

      {/* Переработанные вкладки по бизнес-процессам */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 h-auto p-1 bg-muted/50 rounded-lg">
          <TabsTrigger 
            value="dashboard" 
            className="flex flex-col sm:flex-row items-center gap-2 text-xs px-3 py-3 min-h-[60px] sm:min-h-[50px] data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Дашборд</span>
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            className="flex flex-col sm:flex-row items-center gap-2 text-xs px-3 py-3 min-h-[60px] sm:min-h-[50px] data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Users className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Пользователи</span>
          </TabsTrigger>
          <TabsTrigger 
            value="finance" 
            className="flex flex-col sm:flex-row items-center gap-2 text-xs px-3 py-3 min-h-[60px] sm:min-h-[50px] data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Wallet className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Финансы</span>
          </TabsTrigger>
          <TabsTrigger 
            value="operations" 
            className="flex flex-col sm:flex-row items-center gap-2 text-xs px-3 py-3 min-h-[60px] sm:min-h-[50px] data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Handshake className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Операции</span>
          </TabsTrigger>
          <TabsTrigger 
            value="platform" 
            className="flex flex-col sm:flex-row items-center gap-2 text-xs px-3 py-3 min-h-[60px] sm:min-h-[50px] data-[state=active]:bg-background data-[state=active]:shadow-sm transition-all"
          >
            <Settings className="h-4 w-4 sm:h-5 sm:w-5" />
            <span className="text-xs sm:text-sm">Платформа</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-6 space-y-6">
          <DashboardTab />
        </TabsContent>

        <TabsContent value="users" className="mt-6 space-y-6">
          <UsersTab />
        </TabsContent>

        <TabsContent value="finance" className="mt-6 space-y-6">
          <FinanceTab />
        </TabsContent>

        <TabsContent value="operations" className="mt-6 space-y-6">
          <OperationsTab />
        </TabsContent>

        <TabsContent value="platform" className="mt-6 space-y-6">
          <PlatformTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}