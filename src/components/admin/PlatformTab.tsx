// components/admin/PlatformTab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Settings, MessageSquare, TrendingUp } from "lucide-react";
import TrafficTab from "@/components/admin/platform/TrafficTab";
import TelegramTab from "@/components/admin/platform/TelegramTab";
import SettleSettingsTab from "@/components/admin/platform/SettleSettingsTab";

export default function PlatformTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Настройки платформы</h2>
        <p className="text-muted-foreground">Управление интеграциями и системными настройками</p>
      </div>

      <Tabs defaultValue="traffic" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-muted/50 rounded-lg p-1">
          <TabsTrigger 
            value="traffic" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <TrendingUp className="h-4 w-4" />
            <span>Трафик</span>
          </TabsTrigger>
          <TabsTrigger 
            value="telegram" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Телеграм</span>
          </TabsTrigger>
          <TabsTrigger 
            value="settle" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Settings className="h-4 w-4" />
            <span>Settle</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="traffic" className="mt-6">
          <TrafficTab />
        </TabsContent>

        <TabsContent value="telegram" className="mt-6">
          <TelegramTab />
        </TabsContent>

        <TabsContent value="settle" className="mt-6">
          <SettleSettingsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}