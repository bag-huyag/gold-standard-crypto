// components/admin/platform/TrafficTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Search, Plus, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";

export default function TrafficTab() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [editingTraffic, setEditingTraffic] = useState<any>(null);
  const [formData, setFormData] = useState({
    merchant: "",
    trader: "",
    commission: "",
    reward: "",
    priority: "",
    active: true
  });

  const trafficSettings = [
    {
      id: 1,
      merchant: "biwire_finance",
      merchantEmail: "account@bitwire.finance",
      merchantId: "455854...",
      trader: "Puldorovich",
      traderUsername: "Puldorovich",
      traderId: "ef1fd4...",
      reward: "8.000%",
      priority: 100,
      commission: "9.500%",
      active: true
    },
    {
      id: 2,
      merchant: "crypto_exchange",
      merchantEmail: "admin@cryptoex.com",
      merchantId: "789abc...",
      trader: "john_trader",
      traderUsername: "john.doe",
      traderId: "123xyz...",
      reward: "7.500%",
      priority: 85,
      commission: "8.750%",
      active: false
    }
  ];

  const handleEdit = (traffic: any) => {
    setEditingTraffic(traffic);
    setFormData({
      merchant: traffic.merchant,
      trader: traffic.trader,
      commission: traffic.commission,
      reward: traffic.reward,
      priority: traffic.priority.toString(),
      active: traffic.active
    });
    setIsCreateDialogOpen(true);
  };

  const handleCreateOrUpdate = () => {
    if (editingTraffic) {
      console.log("Обновление трафика:", formData);
      // API вызов для обновления
    } else {
      console.log("Создание трафика:", formData);
      // API вызов для создания
    }
    setIsCreateDialogOpen(false);
    setEditingTraffic(null);
    setFormData({
      merchant: "",
      trader: "",
      commission: "",
      reward: "",
      priority: "",
      active: true
    });
  };

  const handleDelete = (id: number) => {
    console.log("Удаление настройки трафика:", id);
    // API вызов для удаления
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Настройки трафика</span>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button onClick={() => setEditingTraffic(null)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Создать правило
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    {editingTraffic ? 'Редактирование правила трафика' : 'Создание нового правила трафика'}
                  </DialogTitle>
                  <DialogDescription>
                    Настройте связку мерчант-трейдер с параметрами комиссий и приоритетов.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="merchant">Мерчант</Label>
                      <Select value={formData.merchant} onValueChange={(value) => setFormData({...formData, merchant: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите мерчанта" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="biwire_finance">biwire_finance (account@bitwire.finance)</SelectItem>
                          <SelectItem value="crypto_exchange">crypto_exchange (admin@cryptoex.com)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="trader">Трейдер</Label>
                      <Select value={formData.trader} onValueChange={(value) => setFormData({...formData, trader: value})}>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите трейдера" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Puldorovich">Puldorovich (Puldorovich)</SelectItem>
                          <SelectItem value="john_trader">john_trader (john.doe)</SelectItem>
                          <SelectItem value="mike_trader">mike_trader (mike.johnson)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="commission">Комиссия платформы (%)</Label>
                      <Input
                        id="commission"
                        value={formData.commission}
                        onChange={(e) => setFormData({...formData, commission: e.target.value})}
                        placeholder="9.500"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reward">Награда трейдера (%)</Label>
                      <Input
                        id="reward"
                        value={formData.reward}
                        onChange={(e) => setFormData({...formData, reward: e.target.value})}
                        placeholder="8.000"
                      />
                    </div>
                    <div>
                      <Label htmlFor="priority">Приоритет трейдера</Label>
                      <Input
                        id="priority"
                        type="number"
                        value={formData.priority}
                        onChange={(e) => setFormData({...formData, priority: e.target.value})}
                        placeholder="100"
                      />
                    </div>
                    <div className="flex items-center justify-between space-y-0 pt-2">
                      <Label htmlFor="active" className="flex-1">Активный трафик</Label>
                      <Switch
                        id="active"
                        checked={formData.active}
                        onCheckedChange={(checked) => setFormData({...formData, active: checked})}
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateOrUpdate}>
                      {editingTraffic ? 'Обновить' : 'Создать'}
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по мерчанту или трейдеру..."
              className="pl-9"
            />
          </div>

          {/* Таблица настроек трафика */}
          <div className="border rounded-lg">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="h-12 px-4 text-left font-medium">Статус</th>
                  <th className="h-12 px-4 text-left font-medium">Мерчант</th>
                  <th className="h-12 px-4 text-left font-medium">Трейдер</th>
                  <th className="h-12 px-4 text-left font-medium">Награда</th>
                  <th className="h-12 px-4 text-left font-medium">Приоритет</th>
                  <th className="h-12 px-4 text-left font-medium">Комиссия</th>
                  <th className="h-12 px-4 text-left font-medium">Действия</th>
                </tr>
              </thead>
              <tbody>
                {trafficSettings.map((traffic) => (
                  <tr key={traffic.id} className="border-b hover:bg-muted/50 transition-colors">
                    <td className="p-4">
                      <Badge variant={traffic.active ? "default" : "secondary"}>
                        {traffic.active ? "Активен" : "Неактивен"}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{traffic.merchant}</div>
                        <div className="text-xs text-muted-foreground">{traffic.merchantEmail}</div>
                        <div className="text-xs text-muted-foreground">{traffic.merchantId}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div>
                        <div className="font-medium">{traffic.trader}</div>
                        <div className="text-xs text-muted-foreground">{traffic.traderUsername}</div>
                        <div className="text-xs text-muted-foreground">{traffic.traderId}</div>
                      </div>
                    </td>
                    <td className="p-4">{traffic.reward}</td>
                    <td className="p-4">{traffic.priority}</td>
                    <td className="p-4">{traffic.commission}</td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleEdit(traffic)}>
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleDelete(traffic.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {trafficSettings.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Настройки трафика не найдены. Создайте первое правило.
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}