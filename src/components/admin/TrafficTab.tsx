import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { TrendingUp } from "lucide-react";
import { useState } from "react";
import { mockTrafficData } from "@/data/mockData";

export function TrafficTab() {
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Управление трафиком
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for creating/editing traffic */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">
            {editingTraffic ? "Редактировать трафик" : "Создать новый трафик"}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="merchant">Мерчант</Label>
              <Select 
                value={formData.merchant} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, merchant: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите мерчанта" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="merchant_1">Мерчант 1</SelectItem>
                  <SelectItem value="merchant_2">Мерчант 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="trader">Трейдер</Label>
              <Select 
                value={formData.trader} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, trader: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите трейдера" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="trader_1">Трейдер 1</SelectItem>
                  <SelectItem value="trader_2">Трейдер 2</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="commission">Комиссия</Label>
              <Input
                id="commission"
                value={formData.commission}
                onChange={(e) => setFormData(prev => ({ ...prev, commission: e.target.value }))}
                placeholder="2.5%"
              />
            </div>
            <div>
              <Label htmlFor="reward">Вознаграждение</Label>
              <Input
                id="reward"
                value={formData.reward}
                onChange={(e) => setFormData(prev => ({ ...prev, reward: e.target.value }))}
                placeholder="1000₽"
              />
            </div>
            <div>
              <Label htmlFor="priority">Приоритет</Label>
              <Select 
                value={formData.priority} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, priority: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Выберите приоритет" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">Высокий</SelectItem>
                  <SelectItem value="medium">Средний</SelectItem>
                  <SelectItem value="low">Низкий</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="active"
                checked={formData.active}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, active: checked }))}
              />
              <Label htmlFor="active">Активен</Label>
            </div>
          </div>
          <div className="flex gap-2">
            <Button onClick={editingTraffic ? handleUpdateTraffic : () => {}}>
              {editingTraffic ? "Обновить" : "Создать"}
            </Button>
            {editingTraffic && (
              <Button variant="outline" onClick={handleCancelEdit}>
                Отмена
              </Button>
            )}
          </div>
        </div>

        {/* Traffic table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список трафика</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Мерчант</TableHead>
                <TableHead>Трейдер</TableHead>
                <TableHead>Комиссия</TableHead>
                <TableHead>Вознаграждение</TableHead>
                <TableHead>Приоритет</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockTrafficData.map((traffic) => (
                <TableRow key={traffic.id}>
                  <TableCell>{traffic.id}</TableCell>
                  <TableCell>{traffic.merchant}</TableCell>
                  <TableCell>{traffic.trader}</TableCell>
                  <TableCell>{traffic.commission}</TableCell>
                  <TableCell>{traffic.reward}</TableCell>
                  <TableCell>
                    <Badge variant={traffic.priority === 'high' ? 'destructive' : traffic.priority === 'medium' ? 'default' : 'secondary'}>
                      {traffic.priority === 'high' ? 'Высокий' : traffic.priority === 'medium' ? 'Средний' : 'Низкий'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={traffic.active ? 'default' : 'secondary'}>
                      {traffic.active ? 'Активен' : 'Неактивен'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => handleEditTraffic(traffic)}
                    >
                      Редактировать
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}