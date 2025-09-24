// components/admin/FinanceTab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Wallet, CreditCard, History } from "lucide-react";
import WalletsTab from "@/components/admin/finance/WalletsTab";
import PaymentDetailsTab from "@/components/admin/finance/PaymentDetailsTab";
import TransactionsTab from "@/components/admin/finance/TransactionsTab";

export default function FinanceTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Финансовое управление</h2>
        <p className="text-muted-foreground">Управление кошельками, реквизитами и транзакциями</p>
      </div>

      <Tabs defaultValue="wallets" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-muted/50 rounded-lg p-1">
          <TabsTrigger 
            value="wallets" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Wallet className="h-4 w-4" />
            <span>Кошельки</span>
          </TabsTrigger>
          <TabsTrigger 
            value="payment-details" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <CreditCard className="h-4 w-4" />
            <span>Реквизиты</span>
          </TabsTrigger>
          <TabsTrigger 
            value="transactions" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <History className="h-4 w-4" />
            <span>Транзакции</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="wallets" className="mt-6">
          <WalletsTab />
        </TabsContent>

        <TabsContent value="payment-details" className="mt-6">
          <PaymentDetailsTab />
        </TabsContent>

        <TabsContent value="transactions" className="mt-6">
          <TransactionsTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}