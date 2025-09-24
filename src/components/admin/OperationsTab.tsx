// components/admin/OperationsTab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Handshake, MessageSquare, BarChart3 } from "lucide-react";
import DealsTab from "@/components/admin/operations/DealsTab";
import DisputesTab from "@/components/admin/operations/DisputesTab";
import StatisticsTab from "@/components/admin/operations/StatisticsTab";

export default function OperationsTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Операции и транзакции</h2>
        <p className="text-muted-foreground">Управление сделками, диспутами и статистикой</p>
      </div>

      <Tabs defaultValue="deals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-muted/50 rounded-lg p-1">
          <TabsTrigger 
            value="deals" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Handshake className="h-4 w-4" />
            <span>Сделки</span>
          </TabsTrigger>
          <TabsTrigger 
            value="disputes" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Диспуты</span>
          </TabsTrigger>
          <TabsTrigger 
            value="statistics" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <BarChart3 className="h-4 w-4" />
            <span>Статистика</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="deals" className="mt-6">
          <DealsTab />
        </TabsContent>

        <TabsContent value="disputes" className="mt-6">
          <DisputesTab />
        </TabsContent>

        <TabsContent value="statistics" className="mt-6">
          <StatisticsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}