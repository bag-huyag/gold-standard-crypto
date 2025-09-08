import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Edit, Trash2, Phone, Building } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
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
  dailyAmount: 1000000,
  monthlyAmount: 30000000,
  maxDailyDeals: 2,
  maxMonthlyDeals: 4,
  delayBetweenDeals: 5,
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
  const [editingId, setEditingId] = useState<string | null>(null);
  const [paymentDetails, setPaymentDetails] = useState(mockPaymentDetails);
  const [formData, setFormData] = useState({
    currency: "",
    paymentMethod: "",
    bank: "",
    phone: "",
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

  const handleToggleStatus = (id: string) => {
    setPaymentDetails(prev => prev.map(detail => 
      detail.id === id ? { ...detail, active: !detail.active } : detail
    ));
    toast({
      title: "Статус изменен",
      description: "Статус реквизита был успешно изменен",
    });
  };

  const handleEdit = (detail: typeof mockPaymentDetails[0]) => {
    setEditingId(detail.id);
    setFormData({
      currency: detail.currency,
      paymentMethod: detail.system,
      bank: detail.bank,
      phone: detail.phone,
      owner: detail.owner,
      minAmount: detail.minAmount.toString(),
      maxAmount: detail.maxAmount.toString(),
      dailyAmount: detail.dailyAmount.toString(),
      monthlyAmount: detail.monthlyAmount.toString(),
      maxDailyDeals: detail.maxDailyDeals.toString(),
      maxMonthlyDeals: detail.maxMonthlyDeals.toString(),
      simultaneousDeals: detail.simultaneously.toString(),
      delayBetweenDeals: detail.delayBetweenDeals.toString(),
      active: detail.active
    });
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setPaymentDetails(prev => prev.filter(detail => detail.id !== id));
    toast({
      title: "Реквизит удален",
      description: "Реквизит был успешно удален из системы",
    });
  };

  const resetForm = () => {
    setFormData({
      currency: "",
      paymentMethod: "",
      bank: "",
      phone: "",
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
    setEditingId(null);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm();
  };

  const handleSave = () => {
    if (!formData.bank || !formData.owner || !formData.currency || !formData.paymentMethod) {
      toast({
        title: "Ошибка",
        description: "Заполните все обязательные поля",
        variant: "destructive"
      });
      return;
    }

    const newPaymentDetail = {
      id: editingId || Date.now().toString(),
      system: formData.paymentMethod,
      bank: formData.bank,
      phone: formData.phone || "+7 (000) 000-00-00",
      owner: formData.owner,
      currency: formData.currency,
      minAmount: parseInt(formData.minAmount) || 0,
      maxAmount: parseInt(formData.maxAmount) || 1000000,
      simultaneously: parseInt(formData.simultaneousDeals) || 1,
      dailyAmount: parseInt(formData.dailyAmount) || 1000000,
      monthlyAmount: parseInt(formData.monthlyAmount) || 30000000,
      maxDailyDeals: parseInt(formData.maxDailyDeals) || 10,
      maxMonthlyDeals: parseInt(formData.maxMonthlyDeals) || 300,
      delayBetweenDeals: parseInt(formData.delayBetweenDeals) || 5,
      todayDeals: {
        current: 0,
        max: parseInt(formData.maxDailyDeals) || 10,
        percentage: 0
      },
      monthDeals: {
        current: 0,
        max: parseInt(formData.maxMonthlyDeals) || 300,
        percentage: 0
      },
      todayAmount: {
        current: 0,
        max: parseInt(formData.dailyAmount) || 1000000,
        percentage: 0
      },
      monthAmount: {
        current: 0,
        max: parseInt(formData.monthlyAmount) || 30000000,
        percentage: 0
      },
      active: formData.active
    };

    if (editingId) {
      setPaymentDetails(prev => prev.map(detail => 
        detail.id === editingId ? newPaymentDetail : detail
      ));
      toast({
        title: "Реквизит обновлен",
        description: "Реквизит был успешно обновлен",
      });
    } else {
      setPaymentDetails(prev => [...prev, newPaymentDetail]);
      toast({
        title: "Реквизит добавлен",
        description: "Новый реквизит был успешно добавлен",
      });
    }

    handleDialogClose();
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Реквизиты</h1>
        
        <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
          <DialogTrigger asChild>
            <Button className="bg-primary hover:bg-primary/90">
              <Plus className="mr-2 h-4 w-4" />
              Добавить реквизит
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать реквизит" : "Добавить новый реквизит"}</DialogTitle>
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

              <div className="space-y-2">
                <Label htmlFor="phone">Телефон</Label>
                <Input placeholder="+7 (123) 456-78-90" value={formData.phone} onChange={e => handleInputChange("phone", e.target.value)} />
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
                <Button variant="outline" onClick={handleDialogClose}>
                  Отмена
                </Button>
                <Button onClick={handleSave}>
                  {editingId ? "Обновить" : "Сохранить"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Payment Details Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Реквизиты</TableHead>
              <TableHead className="w-[150px]">Лимиты</TableHead>
              <TableHead className="w-[120px]">Сделки</TableHead>
              <TableHead className="w-[120px]">Сумма</TableHead>
              <TableHead className="w-[100px]">Статус</TableHead>
              <TableHead className="w-[120px]">Действия</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paymentDetails.map(detail => (
              <TableRow key={detail.id}>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">{detail.system}</Badge>
                      <Badge variant="secondary" className="text-xs">{detail.currency}</Badge>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Building className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{detail.bank}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm">
                      <Phone className="h-3 w-3 text-muted-foreground" />
                      <span className="text-xs">{detail.phone}</span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {detail.owner}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-1 text-xs">
                    <div>
                      <div className="text-muted-foreground">Сделка:</div>
                      <div>{detail.minAmount.toLocaleString()} - {detail.maxAmount.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Одновременно:</div>
                      <div className="font-medium">{detail.simultaneously}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Сегодня: {detail.todayDeals.current}/{detail.todayDeals.max}</div>
                      <ProgressBar {...detail.todayDeals} type="deals" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Месяц: {detail.monthDeals.current}/{detail.monthDeals.max}</div>
                      <ProgressBar {...detail.monthDeals} type="deals" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="space-y-2">
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Сегодня</div>
                      <ProgressBar {...detail.todayAmount} type="amount" />
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground mb-1">Месяц</div>
                      <ProgressBar {...detail.monthAmount} type="amount" />
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col items-center gap-2">
                    <Switch 
                      checked={detail.active} 
                      onCheckedChange={() => handleToggleStatus(detail.id)}
                    />
                    <span className={`text-xs px-2 py-1 rounded-full ${detail.active ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>
                      {detail.active ? "Активен" : "Неактивен"}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-col gap-1">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 text-xs"
                      onClick={() => handleEdit(detail)}
                    >
                      <Edit className="mr-1 h-3 w-3" />
                      Изменить
                    </Button>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" size="sm" className="h-8 text-xs">
                          <Trash2 className="mr-1 h-3 w-3" />
                          Удалить
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Это действие нельзя отменить. Реквизит будет удален из системы навсегда.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Нет</AlertDialogCancel>
                          <AlertDialogAction 
                            onClick={() => handleDelete(detail.id)}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          >
                            Да
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {paymentDetails.length === 0 && (
        <div className="text-center py-12 border rounded-lg">
          <p className="text-muted-foreground mb-4">Реквизиты не добавлены</p>
          <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Добавить первый реквизит
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Добавить новый реквизит</DialogTitle>
              </DialogHeader>
              {/* Form content would be the same as above */}
            </DialogContent>
          </Dialog>
        </div>
      )}
    </div>;
}