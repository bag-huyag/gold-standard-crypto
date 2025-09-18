import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Wallet } from "lucide-react";

export function WalletsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          Управление кошельками
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for adding new wallet */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Добавить кошелек</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="wallet-address">Адрес кошелька</Label>
              <Input id="wallet-address" placeholder="Введите адрес кошелька" />
            </div>
            <div>
              <Label htmlFor="wallet-type">Тип криптовалюты</Label>
              <Input id="wallet-type" placeholder="BTC, ETH, USDT..." />
            </div>
            <div>
              <Label htmlFor="wallet-network">Сеть</Label>
              <Input id="wallet-network" placeholder="TRC20, ERC20..." />
            </div>
          </div>
          <Button>Добавить кошелек</Button>
        </div>

        {/* Wallets table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список кошельков</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Адрес</TableHead>
                <TableHead>Тип</TableHead>
                <TableHead>Сеть</TableHead>
                <TableHead>Баланс</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell className="font-mono text-xs">1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa</TableCell>
                <TableCell>BTC</TableCell>
                <TableCell>Bitcoin</TableCell>
                <TableCell>0.5 BTC</TableCell>
                <TableCell>
                  <Badge variant="default">Активен</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="destructive" size="sm">
                      Отключить
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell className="font-mono text-xs">0x742d35Cc6129C...8B4f68</TableCell>
                <TableCell>USDT</TableCell>
                <TableCell>TRC20</TableCell>
                <TableCell>15,000 USDT</TableCell>
                <TableCell>
                  <Badge variant="default">Активен</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="destructive" size="sm">
                      Отключить
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}