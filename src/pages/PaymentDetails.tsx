import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Phone, Building } from "lucide-react";
import { Progress } from "@/components/ui/progress";
const mockPaymentDetails = [{
  id: "1",
  system: "СБП",
  bank: "Т-Банк",
  phone: "+7 (828) 880-88-80",
  owner: "Иван И.",
  currency: "RUB",
  minAmount: 0,
  maxAmount: 1000000,
  simultaneously: 2,
  todayDeals: {
    current: 0,
    max: 2,
    percentage: 0
  },
  monthDeals: {
    current: 1,
    max: 4,
    percentage: 25
  },
  todayAmount: {
    current: 0,
    max: 1000000,
    percentage: 0
  },
  monthAmount: {
    current: 5540,
    max: 999998,
    percentage: 0.6
  },
  active: true
}];
const ProgressBar = ({
  current,
  max,
  percentage,
  type
}: {
  current: number;
  max: number;
  percentage: number;
  type: "deals" | "amount";
}) => {
  // Three colors for different states: empty, processing, completed
  const getColor = () => {
    if (percentage === 0) return "bg-muted";
    if (percentage < 50) return "bg-warning";
    if (percentage < 80) return "bg-secondary";
    return "bg-success";
  };
  return <div className="space-y-1">
      <div className="flex justify-between text-xs">
        <span>{type === "deals" ? "штук" : "₽"}</span>
        
      </div>
      <div className="w-full bg-muted rounded-full h-2">
        <div className={`h-2 rounded-full transition-all ${getColor()}`} style={{
        width: `${Math.min(percentage, 100)}%`
      }} />
      </div>
      <div className="text-xs text-muted-foreground">
        {type === "amount" ? `${current.toLocaleString()} / ${max.toLocaleString()}` : `${current} / ${max}`}
      </div>
    </div>;
};
export default function PaymentDetails() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    currency: "",
    paymentMethod: "",
    bank: "",
    owner: "",
    minAmount: "",
    maxAmount: "",
    dailyAmount: "",
    monthlyAmount: "",
    maxDailyDeals: "",
    maxMonthlyDeals: "",
    simultaneousDeals: "",
    delayBetweenDeals: "",
    active: true
  });
  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Реквизиты</h1>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Добавить реквизит
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Добавить новый реквизит</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Валюта</Label>
                  <Select onValueChange={value => handleInputChange("currency", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите валюту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">RUB</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Способ оплаты</Label>
                  <Select onValueChange={value => handleInputChange("paymentMethod", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите способ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="SBP">СБП</SelectItem>
                      <SelectItem value="CARD">Карта</SelectItem>
                      <SelectItem value="CASH">Наличные</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Банк</Label>
                  <Input placeholder="Например: Т-Банк" value={formData.bank} onChange={e => handleInputChange("bank", e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Имя владельца</Label>
                  <Input placeholder="Например: Иван И." value={formData.owner} onChange={e => handleInputChange("owner", e.target.value)} />
                </div>
              </div>

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Лимиты</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Мин сумма сделки</Label>
                    <Input type="number" placeholder="0" value={formData.minAmount} onChange={e => handleInputChange("minAmount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Макс сумма сделки</Label>
                    <Input type="number" placeholder="1000000" value={formData.maxAmount} onChange={e => handleInputChange("maxAmount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма (день)</Label>
                    <Input type="number" placeholder="1000000" value={formData.dailyAmount} onChange={e => handleInputChange("dailyAmount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма (месяц)</Label>
                    <Input type="number" placeholder="30000000" value={formData.monthlyAmount} onChange={e => handleInputChange("monthlyAmount", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Макс кол-во сделок (день)</Label>
                    <Input type="number" placeholder="10" value={formData.maxDailyDeals} onChange={e => handleInputChange("maxDailyDeals", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Макс кол-во сделок (месяц)</Label>
                    <Input type="number" placeholder="300" value={formData.maxMonthlyDeals} onChange={e => handleInputChange("maxMonthlyDeals", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Сделок одновременно</Label>
                    <Input type="number" placeholder="2" value={formData.simultaneousDeals} onChange={e => handleInputChange("simultaneousDeals", e.target.value)} />
                  </div>
                  <div className="space-y-2">
                    <Label>Задержка между сделками (мин)</Label>
                    <Input type="number" placeholder="5" value={formData.delayBetweenDeals} onChange={e => handleInputChange("delayBetweenDeals", e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2 pt-4 border-t">
                <Switch id="active" checked={formData.active} onCheckedChange={value => handleInputChange("active", value)} />
                <Label htmlFor="active">Активность</Label>
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button variant="outline" onClick={() => setDialogOpen(false)}>
                  Отмена
                </Button>
                <Button onClick={() => setDialogOpen(false)}>
                  Сохранить
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Details List */}
      <div className="space-y-4">
        {mockPaymentDetails.map(detail => <Card key={detail.id} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="grid gap-6 lg:grid-cols-3">
                {/* Basic Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Реквизиты</h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">Система:</span>
                        <Badge variant="outline">{detail.system}</Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">Банк: {detail.bank}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm">{detail.phone}</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Владелец: </span>
                        <span className="font-medium">{detail.owner}</span>
                      </div>
                      <Badge variant="secondary">{detail.currency}</Badge>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Лимиты</h4>
                    <div className="space-y-1 text-sm">
                      <div>
                        <span className="text-muted-foreground">Сумма сделки</span>
                        <div>От: {detail.minAmount.toLocaleString()} {detail.currency}</div>
                        <div>До: {detail.maxAmount.toLocaleString()} {detail.currency}</div>
                      </div>
                      <div className="pt-2">
                        <span className="text-muted-foreground">Одновременно: </span>
                        <span className="font-medium">{detail.simultaneously}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Statistics */}
                <div className="space-y-4">
                  <h4 className="font-medium">Статистика</h4>
                  <div className="space-y-4">
                    <div>
                      <div className="text-sm font-medium mb-2">Сегодня (штук): {detail.todayDeals.current} / {detail.todayDeals.max}</div>
                      <ProgressBar {...detail.todayDeals} type="deals" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Месяц (штук): {detail.monthDeals.current} / {detail.monthDeals.max}</div>
                      <ProgressBar {...detail.monthDeals} type="deals" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Сегодня (₽): {detail.todayAmount.current} / {detail.todayAmount.max.toLocaleString()}</div>
                      <ProgressBar {...detail.todayAmount} type="amount" />
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-2">Месяц (₽): {detail.monthAmount.current.toLocaleString()} / {detail.monthAmount.max.toLocaleString()}</div>
                      <ProgressBar {...detail.monthAmount} type="amount" />
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-3">Действия</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Статус</span>
                        <div className="flex items-center gap-2">
                          <Switch checked={detail.active} />
                          <span className={`text-xs px-2 py-1 rounded-full ${detail.active ? 'bg-success/10 text-success' : 'bg-destructive/10 text-destructive'}`}>
                            {detail.active ? "Активен" : "Неактивен"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Редактировать
                    </Button>
                    <Button variant="destructive" size="sm" className="w-full">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Удалить
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>)}
      </div>

      {mockPaymentDetails.length === 0 && <Card>
          <CardContent className="py-12">
            <div className="text-center">
              <p className="text-muted-foreground mb-4">Реквизиты не добавлены</p>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Добавить первый реквизит
              </Button>
            </div>
          </CardContent>
        </Card>}
    </div>;
}