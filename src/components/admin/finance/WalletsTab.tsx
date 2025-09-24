// components/admin/finance/WalletsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Wallet, Download, Upload } from "lucide-react";
import { useState } from "react";

export default function WalletsTab() {
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedWallet, setSelectedWallet] = useState("");
  const [depositAmount, setDepositAmount] = useState("");
  const [withdrawAmount, setWithdrawAmount] = useState("");

  const users = [
    { id: "user1", name: "john_trader", email: "john.doe@example.com" },
    { id: "user2", name: "sarah_lead", email: "sarah.smith@example.com" },
    { id: "platform", name: "Платформа", email: "Основной кошелек" }
  ];

  const wallets = [
    { id: "wallet1", address: "TUowL9EwagYcezrKNXd6Y4XhpCts3qHYLn", currency: "USDT", balance: -0.5401389845963962, frozen: 0.000003138556010640059 },
    { id: "wallet2", address: "1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa", currency: "BTC", balance: 0.002543, frozen: 0.000001 }
  ];

  const selectedWalletData = wallets.find(w => w.id === selectedWallet);

  const handleDeposit = () => {
    console.log("Пополнение кошелька:", { user: selectedUser, wallet: selectedWallet, amount: depositAmount });
    setDepositAmount("");
  };

  const handleWithdraw = () => {
    console.log("Списание с кошелька:", { user: selectedUser, wallet: selectedWallet, amount: withdrawAmount });
    setWithdrawAmount("");
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wallet className="h-5 w-5" />
            Управление кошельками
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор пользователя и кошелька */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>Выберите пользователя или платформу</Label>
              <Select value={selectedUser} onValueChange={setSelectedUser}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите пользователя" />
                </SelectTrigger>
                <SelectContent>
                  {users.map(user => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Выбор кошелька</Label>
              <Select value={selectedWallet} onValueChange={setSelectedWallet}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите кошелек" />
                </SelectTrigger>
                <SelectContent>
                  {wallets.map(wallet => (
                    <SelectItem key={wallet.id} value={wallet.id}>
                      {wallet.currency} Wallet ({wallet.address.slice(0, 8)}...)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Информация о кошельке */}
          {selectedWalletData && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between text-lg">
                  <span>Информация о кошельке</span>
                  <Button variant="destructive" size="sm">
                    <Download className="h-4 w-4 mr-2" />
                    Вывод средств
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-sm"><span className="font-medium">Адрес:</span> {selectedWalletData.address}</p>
                <p className="text-sm"><span className="font-medium">Баланс:</span> {selectedWalletData.balance} {selectedWalletData.currency}</p>
                <p className="text-sm"><span className="font-medium">Заморожено:</span> {selectedWalletData.frozen} {selectedWalletData.currency}</p>
                <p className="text-sm"><span className="font-medium">Доступно:</span> {selectedWalletData.balance - selectedWalletData.frozen} {selectedWalletData.currency}</p>
              </CardContent>
            </Card>
          )}

          {/* Операции с кошельком */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Upload className="h-5 w-5" />
                  Пополнение кошелька
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="deposit-amount">Сумма депозита</Label>
                  <Input
                    id="deposit-amount"
                    type="text"
                    placeholder="Введите сумму"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleDeposit} className="w-full bg-green-600 hover:bg-green-700">
                  Пополнить
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Download className="h-5 w-5" />
                  Списание средств
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="withdraw-amount">Сумма списания</Label>
                  <Input
                    id="withdraw-amount"
                    type="text"
                    placeholder="Введите сумму"
                    value={withdrawAmount}
                    onChange={(e) => setWithdrawAmount(e.target.value)}
                  />
                </div>
                <Button onClick={handleWithdraw} variant="destructive" className="w-full">
                  Списать
                </Button>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}