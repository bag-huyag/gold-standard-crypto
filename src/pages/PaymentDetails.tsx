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
import { Plus, Edit, Trash2, Phone, Building, Monitor, QrCode, Smartphone } from "lucide-react";
import { toast } from "@/components/ui/use-toast";
const banksList = [
  "Т-Банк",
  "Сбербанк", 
  "ВТБ",
  "Альфа-Банк",
  "Открытие",
  "Газпромбанк",
  "Россельхозбанк",
  "Рокетбанк",
  "МКБ",
  "Райффайзенбанк",
  "ЮMoney",
  "QIWI",
  "WebMoney"
];

const mockDevices = [
  {
    id: "1",
    name: "Основной компьютер",
    status: "active",
    lastLogin: "2024-01-15 14:30:25",
    qrCode: "device_1_qr_code_data"
  },
  {
    id: "2", 
    name: "Мобильное устройство",
    status: "active",
    lastLogin: "2024-01-14 09:15:42",
    qrCode: "device_2_qr_code_data"
  },
  {
    id: "3",
    name: "Резервный ноутбук",
    status: "inactive",
    lastLogin: "2024-01-10 16:22:13",
    qrCode: "device_3_qr_code_data"
  }
];

const mockPaymentDetails = [
  {
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
  },
  {
    id: "2",
    system: "Карта",
    bank: "Сбербанк",
    phone: "+7 (903) 123-45-67",
    owner: "Анна П.",
    currency: "RUB",
    minAmount: 500,
    maxAmount: 500000,
    simultaneously: 1,
    dailyAmount: 2000000,
    monthlyAmount: 50000000,
    maxDailyDeals: 5,
    maxMonthlyDeals: 150,
    delayBetweenDeals: 3,
    todayDeals: {
      current: 3,
      max: 5,
      percentage: 60
    },
    monthDeals: {
      current: 45,
      max: 150,
      percentage: 30
    },
    todayAmount: {
      current: 750000,
      max: 2000000,
      percentage: 37.5
    },
    monthAmount: {
      current: 12500000,
      max: 50000000,
      percentage: 25
    },
    active: true
  },
  {
    id: "3",
    system: "СБП",
    bank: "ВТБ",
    phone: "+7 (915) 987-65-43",
    owner: "Михаил С.",
    currency: "RUB",
    minAmount: 100,
    maxAmount: 800000,
    simultaneously: 3,
    dailyAmount: 1500000,
    monthlyAmount: 40000000,
    maxDailyDeals: 8,
    maxMonthlyDeals: 200,
    delayBetweenDeals: 2,
    todayDeals: {
      current: 2,
      max: 8,
      percentage: 25
    },
    monthDeals: {
      current: 67,
      max: 200,
      percentage: 33.5
    },
    todayAmount: {
      current: 320000,
      max: 1500000,
      percentage: 21.3
    },
    monthAmount: {
      current: 18750000,
      max: 40000000,
      percentage: 46.9
    },
    active: false
  },
  {
    id: "4",
    system: "Наличные",
    bank: "Альфа-Банк",
    phone: "+7 (922) 456-78-90",
    owner: "Елена К.",
    currency: "USD",
    minAmount: 10,
    maxAmount: 50000,
    simultaneously: 1,
    dailyAmount: 100000,
    monthlyAmount: 2000000,
    maxDailyDeals: 3,
    maxMonthlyDeals: 80,
    delayBetweenDeals: 10,
    todayDeals: {
      current: 1,
      max: 3,
      percentage: 33.3
    },
    monthDeals: {
      current: 23,
      max: 80,
      percentage: 28.8
    },
    todayAmount: {
      current: 15000,
      max: 100000,
      percentage: 15
    },
    monthAmount: {
      current: 450000,
      max: 2000000,
      percentage: 22.5
    },
    active: true
  },
  {
    id: "5",
    system: "Карта",
    bank: "Открытие",
    phone: "+7 (933) 234-56-78",
    owner: "Дмитрий В.",
    currency: "RUB",
    minAmount: 1000,
    maxAmount: 300000,
    simultaneously: 2,
    dailyAmount: 800000,
    monthlyAmount: 20000000,
    maxDailyDeals: 4,
    maxMonthlyDeals: 120,
    delayBetweenDeals: 7,
    todayDeals: {
      current: 4,
      max: 4,
      percentage: 100
    },
    monthDeals: {
      current: 89,
      max: 120,
      percentage: 74.2
    },
    todayAmount: {
      current: 800000,
      max: 800000,
      percentage: 100
    },
    monthAmount: {
      current: 15600000,
      max: 20000000,
      percentage: 78
    },
    active: true
  },
  {
    id: "6",
    system: "СБП",
    bank: "Газпромбанк",
    phone: "+7 (944) 345-67-89",
    owner: "Ольга Р.",
    currency: "EUR",
    minAmount: 5,
    maxAmount: 25000,
    simultaneously: 1,
    dailyAmount: 75000,
    monthlyAmount: 1500000,
    maxDailyDeals: 6,
    maxMonthlyDeals: 180,
    delayBetweenDeals: 4,
    todayDeals: {
      current: 0,
      max: 6,
      percentage: 0
    },
    monthDeals: {
      current: 12,
      max: 180,
      percentage: 6.7
    },
    todayAmount: {
      current: 0,
      max: 75000,
      percentage: 0
    },
    monthAmount: {
      current: 156000,
      max: 1500000,
      percentage: 10.4
    },
    active: false
  },
  {
    id: "7",
    system: "Карта",
    bank: "Россельхозбанк",
    phone: "+7 (955) 456-78-91",
    owner: "Павел Т.",
    currency: "RUB",
    minAmount: 200,
    maxAmount: 400000,
    simultaneously: 3,
    dailyAmount: 1200000,
    monthlyAmount: 35000000,
    maxDailyDeals: 7,
    maxMonthlyDeals: 210,
    delayBetweenDeals: 6,
    todayDeals: {
      current: 5,
      max: 7,
      percentage: 71.4
    },
    monthDeals: {
      current: 156,
      max: 210,
      percentage: 74.3
    },
    todayAmount: {
      current: 890000,
      max: 1200000,
      percentage: 74.2
    },
    monthAmount: {
      current: 28700000,
      max: 35000000,
      percentage: 82
    },
    active: true
  },
  {
    id: "8",
    system: "СБП",
    bank: "Рокетбанк",
    phone: "+7 (966) 567-89-01",
    owner: "Светлана Н.",
    currency: "RUB",
    minAmount: 50,
    maxAmount: 600000,
    simultaneously: 4,
    dailyAmount: 2500000,
    monthlyAmount: 60000000,
    maxDailyDeals: 10,
    maxMonthlyDeals: 300,
    delayBetweenDeals: 1,
    todayDeals: {
      current: 7,
      max: 10,
      percentage: 70
    },
    monthDeals: {
      current: 234,
      max: 300,
      percentage: 78
    },
    todayAmount: {
      current: 1800000,
      max: 2500000,
      percentage: 72
    },
    monthAmount: {
      current: 45000000,
      max: 60000000,
      percentage: 75
    },
    active: true
  },
  {
    id: "9",
    system: "Наличные",
    bank: "МКБ",
    phone: "+7 (977) 678-90-12",
    owner: "Александр М.",
    currency: "USD",
    minAmount: 20,
    maxAmount: 30000,
    simultaneously: 1,
    dailyAmount: 80000,
    monthlyAmount: 1800000,
    maxDailyDeals: 4,
    maxMonthlyDeals: 100,
    delayBetweenDeals: 15,
    todayDeals: {
      current: 2,
      max: 4,
      percentage: 50
    },
    monthDeals: {
      current: 67,
      max: 100,
      percentage: 67
    },
    todayAmount: {
      current: 35000,
      max: 80000,
      percentage: 43.8
    },
    monthAmount: {
      current: 1120000,
      max: 1800000,
      percentage: 62.2
    },
    active: false
  },
  {
    id: "10",
    system: "Карта",
    bank: "Райффайзенбанк",
    phone: "+7 (988) 789-01-23",
    owner: "Татьяна Л.",
    currency: "RUB",
    minAmount: 300,
    maxAmount: 700000,
    simultaneously: 2,
    dailyAmount: 1800000,
    monthlyAmount: 45000000,
    maxDailyDeals: 6,
    maxMonthlyDeals: 180,
    delayBetweenDeals: 8,
    todayDeals: {
      current: 3,
      max: 6,
      percentage: 50
    },
    monthDeals: {
      current: 98,
      max: 180,
      percentage: 54.4
    },
    todayAmount: {
      current: 1200000,
      max: 1800000,
      percentage: 66.7
    },
    monthAmount: {
      current: 32500000,
      max: 45000000,
      percentage: 72.2
    },
    active: true
  }
];
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
  
  // Devices state
  const [devicesDialogOpen, setDevicesDialogOpen] = useState(false);
  const [qrDialogOpen, setQrDialogOpen] = useState(false);
  const [devices, setDevices] = useState(mockDevices);
  const [editingDeviceId, setEditingDeviceId] = useState<string | null>(null);
  const [currentQrDevice, setCurrentQrDevice] = useState<string>("");
  const [deviceFormData, setDeviceFormData] = useState({
    name: "",
    status: "active"
  });
  const [deviceErrors, setDeviceErrors] = useState<{[key: string]: string}>({});
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  
  // Pagination handlers
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  
  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
  };
  const [formData, setFormData] = useState({
    currency: "",
    paymentMethod: "",
    bank: "",
    phone: "",
    cardNumber: "",
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

  const [errors, setErrors] = useState<{[key: string]: string}>({});
  // Filter state
  const [filters, setFilters] = useState({
    currency: "all",
    paymentMethod: "all", 
    paymentType: "all",
    status: "all"
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };

  // Apply filters to payment details
  const filteredPaymentDetails = paymentDetails.filter(detail => {
    if (filters.currency !== "all" && detail.currency !== filters.currency) return false;
    if (filters.paymentMethod !== "all" && detail.system !== filters.paymentMethod) return false;
    if (filters.paymentType !== "all") {
      // Group payment types
      const cardTypes = ["Карта"];
      const cashTypes = ["Наличные"];
      const digitalTypes = ["СБП"];
      
      if (filters.paymentType === "card" && !cardTypes.includes(detail.system)) return false;
      if (filters.paymentType === "cash" && !cashTypes.includes(detail.system)) return false;
      if (filters.paymentType === "digital" && !digitalTypes.includes(detail.system)) return false;
    }
    if (filters.status !== "all") {
      if (filters.status === "active" && !detail.active) return false;
      if (filters.status === "inactive" && detail.active) return false;
    }
    return true;
  });

  // Update pagination calculations to use filtered data
  const totalItems = filteredPaymentDetails.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentData = filteredPaymentDetails.slice(startIndex, endIndex);

  const handleToggleStatus = (id: string) => {
    setPaymentDetails(prev => prev.map(detail => 
      detail.id === id ? { ...detail, active: !detail.active } : detail
    ));
    toast({
      title: "Статус изменен",
      description: "Статус реквизита был успешно изменен",
    });
  };

  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!formData.bank) newErrors.bank = "Выберите банк";
    if (!formData.owner.trim()) newErrors.owner = "Укажите имя владельца";
    if (!formData.currency) newErrors.currency = "Выберите валюту";
    if (!formData.paymentMethod) newErrors.paymentMethod = "Выберите способ оплаты";
    
    // Validation for phone/card based on payment method
    if (formData.paymentMethod === "Карта") {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = "Укажите номер карты";
      } else if (!/^\d{4}\s\d{4}\s\d{4}\s\d{4}$/.test(formData.cardNumber)) {
        newErrors.cardNumber = "Неверный формат номера карты (1234 5678 9012 3456)";
      }
    } else if (formData.paymentMethod !== "Наличные") {
      if (!formData.phone.trim()) {
        newErrors.phone = "Укажите номер телефона";
      } else if (!/^\+7\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/.test(formData.phone)) {
        newErrors.phone = "Неверный формат телефона (+7 (123) 456-78-90)";
      }
    }
    
    // Validate positive numbers
    const numericFields = ['minAmount', 'maxAmount', 'dailyAmount', 'monthlyAmount', 'maxDailyDeals', 'maxMonthlyDeals', 'simultaneousDeals', 'delayBetweenDeals'];
    numericFields.forEach(field => {
      const value = formData[field as keyof typeof formData] as string;
      if (value && (isNaN(Number(value)) || Number(value) < 0)) {
        newErrors[field] = "Введите положительное число";
      }
    });
    
    // Validate max > min amounts
    if (formData.minAmount && formData.maxAmount && Number(formData.minAmount) >= Number(formData.maxAmount)) {
      newErrors.maxAmount = "Максимальная сумма должна быть больше минимальной";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEdit = (detail: typeof mockPaymentDetails[0]) => {
    setEditingId(detail.id);
    setFormData({
      currency: detail.currency,
      paymentMethod: detail.system,
      bank: detail.bank,
      phone: detail.phone,
      cardNumber: "",
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
    setErrors({});
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
      cardNumber: "",
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
    setErrors({});
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    resetForm();
  };

  const handleSave = () => {
    if (!validateForm()) {
      toast({
        title: "Ошибка",
        description: "Исправьте ошибки в форме",
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

  const handleToggleDeviceStatus = (id: string) => {
    setDevices(prev => prev.map(device => 
      device.id === id ? { ...device, status: device.status === "active" ? "inactive" : "active" } : device
    ));
    toast({
      title: "Статус устройства изменен",
      description: "Статус устройства был успешно изменен",
    });
  };

  const handleDeviceInputChange = (field: string, value: string) => {
    setDeviceFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateDeviceForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (!deviceFormData.name.trim()) newErrors.name = "Укажите название устройства";
    
    setDeviceErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleDeviceEdit = (device: typeof mockDevices[0]) => {
    setEditingDeviceId(device.id);
    setDeviceFormData({
      name: device.name,
      status: device.status
    });
    setDeviceErrors({});
  };

  const handleDeviceDelete = (id: string) => {
    setDevices(prev => prev.filter(device => device.id !== id));
    toast({
      title: "Устройство удалено",
      description: "Устройство было успешно удалено из системы",
    });
  };

  const resetDeviceForm = () => {
    setDeviceFormData({
      name: "",
      status: "active"
    });
    setEditingDeviceId(null);
    setDeviceErrors({});
  };

  const handleDeviceSave = () => {
    if (!validateDeviceForm()) {
      toast({
        title: "Ошибка",
        description: "Исправьте ошибки в форме",
        variant: "destructive"
      });
      return;
    }

    const newDevice = {
      id: editingDeviceId || Date.now().toString(),
      name: deviceFormData.name,
      status: deviceFormData.status,
      lastLogin: new Date().toISOString().slice(0, 19).replace('T', ' '),
      qrCode: `device_${Date.now()}_qr_code_data`
    };

    if (editingDeviceId) {
      setDevices(prev => prev.map(device => 
        device.id === editingDeviceId ? newDevice : device
      ));
      toast({
        title: "Устройство обновлено",
        description: "Устройство было успешно обновлено",
      });
    } else {
      setDevices(prev => [...prev, newDevice]);
      toast({
        title: "Устройство добавлено",
        description: "Новое устройство было успешно добавлено",
      });
    }

    resetDeviceForm();
  };

  const handleShowQrCode = (device: typeof mockDevices[0]) => {
    setCurrentQrDevice(device.name);
    setQrDialogOpen(true);
  };
  return <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-foreground">Реквизиты</h1>
        
        <div className="flex items-center gap-3 flex-wrap">
          <Dialog open={dialogOpen} onOpenChange={(open) => {
            if (open) {
              resetForm();
              setDialogOpen(true);
            } else {
              handleDialogClose();
            }
          }}>
            <DialogTrigger asChild>
              <Button className="bg-primary hover:bg-primary/90">
                <Plus className="mr-2 h-4 w-4" />
                Добавить реквизит
              </Button>
            </DialogTrigger>
            
            {/* Devices Dialog */}
            <Dialog open={devicesDialogOpen} onOpenChange={(open) => {
              if (!open) {
                resetDeviceForm();
                setDevicesDialogOpen(false);
              } else {
                setDevicesDialogOpen(true);
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline">
                  <Monitor className="mr-2 h-4 w-4" />
                  Устройства
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Управление устройствами</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  {/* Devices Table */}
                  <div className="border rounded-lg overflow-hidden">
                    <Table>
                      <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Имя</TableHead>
                            <TableHead>Статус</TableHead>
                            <TableHead>Последний вход</TableHead>
                            <TableHead>Действия</TableHead>
                          </TableRow>
                      </TableHeader>
                      <TableBody>
                        {devices.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                              Нет добавленных устройств
                            </TableCell>
                          </TableRow>
                        ) : (
                          devices.map(device => (
                            <TableRow key={device.id}>
                              <TableCell className="font-mono text-sm">#{device.id}</TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  {device.status === "active" ? 
                                    <Smartphone className="h-4 w-4 text-green-500" /> : 
                                    <Monitor className="h-4 w-4 text-gray-400" />
                                  }
                                  <span>{device.name}</span>
                                </div>
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Switch 
                                    checked={device.status === "active"} 
                                    onCheckedChange={() => handleToggleDeviceStatus(device.id)}
                                  />
                                  <Badge variant={device.status === "active" ? "default" : "secondary"}>
                                    {device.status === "active" ? "Активно" : "Неактивно"}
                                  </Badge>
                                </div>
                              </TableCell>
                              <TableCell className="text-sm text-muted-foreground">
                                {device.lastLogin}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleShowQrCode(device)}
                                  >
                                    <QrCode className="h-4 w-4" />
                                  </Button>
                                  <Button 
                                    variant="outline" 
                                    size="sm"
                                    onClick={() => handleDeviceEdit(device)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                      <Button variant="destructive" size="sm">
                                        <Trash2 className="h-4 w-4" />
                                      </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                      <AlertDialogHeader>
                                        <AlertDialogTitle>Удалить устройство?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                          Это действие нельзя отменить. Устройство будет удалено из системы.
                                        </AlertDialogDescription>
                                      </AlertDialogHeader>
                                      <AlertDialogFooter>
                                        <AlertDialogCancel>Отмена</AlertDialogCancel>
                                        <AlertDialogAction 
                                          onClick={() => handleDeviceDelete(device.id)}
                                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                          Удалить
                                        </AlertDialogAction>
                                      </AlertDialogFooter>
                                    </AlertDialogContent>
                                  </AlertDialog>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>

                  {/* Add Device Form */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium mb-4">
                      {editingDeviceId ? "Редактировать устройство" : "Добавить новое устройство"}
                    </h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="deviceName">Название устройства*</Label>
                        <Input 
                          id="deviceName"
                          placeholder="Например: Рабочий компьютер" 
                          value={deviceFormData.name} 
                          onChange={e => handleDeviceInputChange("name", e.target.value)}
                          className={deviceErrors.name ? "border-red-500" : ""}
                        />
                        {deviceErrors.name && <span className="text-red-500 text-xs">{deviceErrors.name}</span>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="deviceStatus">Статус</Label>
                        <Select value={deviceFormData.status} onValueChange={value => handleDeviceInputChange("status", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите статус" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="active">Активно</SelectItem>
                            <SelectItem value="inactive">Неактивно</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="flex justify-end space-x-2 mt-4">
                      <Button variant="outline" onClick={resetDeviceForm}>
                        {editingDeviceId ? "Отмена" : "Очистить"}
                      </Button>
                      <Button onClick={handleDeviceSave}>
                        {editingDeviceId ? "Обновить" : "Добавить устройство"}
                      </Button>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </Dialog>
          
          {/* QR Code Dialog */}
          <Dialog open={qrDialogOpen} onOpenChange={setQrDialogOpen}>
            <DialogContent className="max-w-md">
              <DialogHeader>
                <DialogTitle>QR-код для привязки устройства</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="bg-muted rounded-lg p-8 mb-4">
                    <QrCode className="h-32 w-32 mx-auto text-muted-foreground" />
                    <p className="text-sm text-muted-foreground mt-2">QR-код для: {currentQrDevice}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Отсканируйте этот QR-код с помощью приложения для привязки устройства к аккаунту.
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button onClick={() => setQrDialogOpen(false)}>
                    Закрыть
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={(open) => {
          if (open) {
            resetForm();
            setDialogOpen(true);
          } else {
            handleDialogClose();
          }
        }}>
          <DialogTrigger asChild>
            <div></div>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>{editingId ? "Редактировать реквизит" : "Добавить новый реквизит"}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="currency">Валюта*</Label>
                  <Select value={formData.currency} onValueChange={value => handleInputChange("currency", value)}>
                    <SelectTrigger className={errors.currency ? "border-red-500" : ""}>
                      <SelectValue placeholder="Выберите валюту" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="RUB">RUB</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.currency && <span className="text-red-500 text-xs">{errors.currency}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="paymentMethod">Способ оплаты*</Label>
                  <Select value={formData.paymentMethod} onValueChange={value => {
                    handleInputChange("paymentMethod", value);
                    // Clear phone/card when changing payment method
                    handleInputChange("phone", "");
                    handleInputChange("cardNumber", "");
                  }}>
                    <SelectTrigger className={errors.paymentMethod ? "border-red-500" : ""}>
                      <SelectValue placeholder="Выберите способ" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="СБП">СБП</SelectItem>
                      <SelectItem value="Карта">Карта (C2C)</SelectItem>
                      <SelectItem value="Наличные">Наличные</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.paymentMethod && <span className="text-red-500 text-xs">{errors.paymentMethod}</span>}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bank">Банк*</Label>
                  <Select value={formData.bank} onValueChange={value => handleInputChange("bank", value)}>
                    <SelectTrigger className={errors.bank ? "border-red-500" : ""}>
                      <SelectValue placeholder="Выберите банк" />
                    </SelectTrigger>
                    <SelectContent>
                      {banksList.map(bank => (
                        <SelectItem key={bank} value={bank}>{bank}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.bank && <span className="text-red-500 text-xs">{errors.bank}</span>}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner">Имя владельца*</Label>
                  <Input 
                    placeholder="Например: Иван И." 
                    value={formData.owner} 
                    onChange={e => handleInputChange("owner", e.target.value)}
                    className={errors.owner ? "border-red-500" : ""}
                  />
                  {errors.owner && <span className="text-red-500 text-xs">{errors.owner}</span>}
                </div>
              </div>

              {/* Conditional phone/card field */}
              {formData.paymentMethod === "Карта" ? (
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Номер карты*</Label>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    value={formData.cardNumber} 
                    onChange={e => {
                      // Format card number with spaces
                      const value = e.target.value.replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ').substr(0, 19);
                      handleInputChange("cardNumber", value);
                    }}
                    className={errors.cardNumber ? "border-red-500" : ""}
                  />
                  {errors.cardNumber && <span className="text-red-500 text-xs">{errors.cardNumber}</span>}
                </div>
              ) : formData.paymentMethod !== "Наличные" ? (
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон*</Label>
                  <Input 
                    placeholder="+7 (123) 456-78-90" 
                    value={formData.phone} 
                    onChange={e => {
                      // Format phone number automatically
                      const value = e.target.value.replace(/\D/g, '');
                      let formattedValue = '';
                      
                      if (value.length > 0) {
                        if (value.startsWith('7') || value.startsWith('8')) {
                          const cleanValue = value.startsWith('8') ? '7' + value.slice(1) : value;
                          formattedValue = `+7${cleanValue.slice(1)}`;
                          
                          if (cleanValue.length > 1) {
                            formattedValue = `+7 (${cleanValue.slice(1, 4)}`;
                          }
                          if (cleanValue.length > 4) {
                            formattedValue += `) ${cleanValue.slice(4, 7)}`;
                          }
                          if (cleanValue.length > 7) {
                            formattedValue += `-${cleanValue.slice(7, 9)}`;
                          }
                          if (cleanValue.length > 9) {
                            formattedValue += `-${cleanValue.slice(9, 11)}`;
                          }
                        } else {
                          formattedValue = '+7 (' + value.slice(0, 3);
                          if (value.length > 3) {
                            formattedValue += ') ' + value.slice(3, 6);
                          }
                          if (value.length > 6) {
                            formattedValue += '-' + value.slice(6, 8);
                          }
                          if (value.length > 8) {
                            formattedValue += '-' + value.slice(8, 10);
                          }
                        }
                      } else if (e.target.value.startsWith('+7')) {
                        formattedValue = '+7';
                      }
                      
                      handleInputChange("phone", formattedValue);
                    }}
                    className={errors.phone ? "border-red-500" : ""}
                    maxLength={18}
                  />
                  {errors.phone && <span className="text-red-500 text-xs">{errors.phone}</span>}
                </div>
              ) : null}

              <div className="border-t pt-4">
                <h4 className="font-medium mb-4">Лимиты</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Мин сумма сделки</Label>
                    <Input 
                      type="number" 
                      placeholder="0" 
                      min="0"
                      value={formData.minAmount} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("minAmount", value);
                        }
                      }}
                      className={errors.minAmount ? "border-red-500" : ""}
                    />
                    {errors.minAmount && <span className="text-red-500 text-xs">{errors.minAmount}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Макс сумма сделки</Label>
                    <Input 
                      type="number" 
                      placeholder="1000000" 
                      min="0"
                      value={formData.maxAmount} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("maxAmount", value);
                        }
                      }}
                      className={errors.maxAmount ? "border-red-500" : ""}
                    />
                    {errors.maxAmount && <span className="text-red-500 text-xs">{errors.maxAmount}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма (день)</Label>
                    <Input 
                      type="number" 
                      placeholder="1000000" 
                      min="0"
                      value={formData.dailyAmount} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("dailyAmount", value);
                        }
                      }}
                      className={errors.dailyAmount ? "border-red-500" : ""}
                    />
                    {errors.dailyAmount && <span className="text-red-500 text-xs">{errors.dailyAmount}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Сумма (месяц)</Label>
                    <Input 
                      type="number" 
                      placeholder="30000000" 
                      min="0"
                      value={formData.monthlyAmount} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("monthlyAmount", value);
                        }
                      }}
                      className={errors.monthlyAmount ? "border-red-500" : ""}
                    />
                    {errors.monthlyAmount && <span className="text-red-500 text-xs">{errors.monthlyAmount}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Макс кол-во сделок (день)</Label>
                    <Input 
                      type="number" 
                      placeholder="10" 
                      min="1"
                      value={formData.maxDailyDeals} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("maxDailyDeals", value);
                        }
                      }}
                      className={errors.maxDailyDeals ? "border-red-500" : ""}
                    />
                    {errors.maxDailyDeals && <span className="text-red-500 text-xs">{errors.maxDailyDeals}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Макс кол-во сделок (месяц)</Label>
                    <Input 
                      type="number" 
                      placeholder="300" 
                      min="1"
                      value={formData.maxMonthlyDeals} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("maxMonthlyDeals", value);
                        }
                      }}
                      className={errors.maxMonthlyDeals ? "border-red-500" : ""}
                    />
                    {errors.maxMonthlyDeals && <span className="text-red-500 text-xs">{errors.maxMonthlyDeals}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Сделок одновременно</Label>
                    <Input 
                      type="number" 
                      placeholder="2" 
                      min="1"
                      value={formData.simultaneousDeals} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("simultaneousDeals", value);
                        }
                      }}
                      className={errors.simultaneousDeals ? "border-red-500" : ""}
                    />
                    {errors.simultaneousDeals && <span className="text-red-500 text-xs">{errors.simultaneousDeals}</span>}
                  </div>
                  <div className="space-y-2">
                    <Label>Задержка между сделками (мин)</Label>
                    <Input 
                      type="number" 
                      placeholder="5" 
                      min="0"
                      value={formData.delayBetweenDeals} 
                      onChange={e => {
                        const value = e.target.value;
                        if (value === '' || (!isNaN(Number(value)) && Number(value) >= 0)) {
                          handleInputChange("delayBetweenDeals", value);
                        }
                      }}
                      className={errors.delayBetweenDeals ? "border-red-500" : ""}
                    />
                    {errors.delayBetweenDeals && <span className="text-red-500 text-xs">{errors.delayBetweenDeals}</span>}
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

      {/* Filters */}
      <div className="bg-card rounded-lg border p-4">
        <h3 className="text-lg font-medium mb-4">Фильтры</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="space-y-2">
            <Label>Валюта</Label>
            <Select value={filters.currency} onValueChange={(value) => handleFilterChange("currency", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все валюты" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все валюты</SelectItem>
                <SelectItem value="RUB">RUB</SelectItem>
                <SelectItem value="USD">USD</SelectItem>
                <SelectItem value="EUR">EUR</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Способ оплаты</Label>
            <Select value={filters.paymentMethod} onValueChange={(value) => handleFilterChange("paymentMethod", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все способы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все способы</SelectItem>
                <SelectItem value="СБП">СБП</SelectItem>
                <SelectItem value="Карта">Карта</SelectItem>
                <SelectItem value="Наличные">Наличные</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Тип оплаты</Label>
            <Select value={filters.paymentType} onValueChange={(value) => handleFilterChange("paymentType", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все типы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все типы</SelectItem>
                <SelectItem value="digital">Цифровые</SelectItem>
                <SelectItem value="card">Карточные</SelectItem>
                <SelectItem value="cash">Наличные</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label>Статус</Label>
            <Select value={filters.status} onValueChange={(value) => handleFilterChange("status", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активен</SelectItem>
                <SelectItem value="inactive">Отключён</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        {/* Reset filters button */}
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => {
              setFilters({
                currency: "all",
                paymentMethod: "all",
                paymentType: "all", 
                status: "all"
              });
              setCurrentPage(1);
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
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
            {currentData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  Нет данных для отображения
                </TableCell>
              </TableRow>
            ) : (
              currentData.map(detail => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Show "no results" message when filters return empty results */}
      {filteredPaymentDetails.length === 0 && paymentDetails.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            Нет реквизитов, соответствующих выбранным фильтрам
          </p>
          <Button 
            variant="outline"
            onClick={() => {
              setFilters({
                currency: "all",
                paymentMethod: "all",
                paymentType: "all",
                status: "all"
              });
              setCurrentPage(1);
            }}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}

      {/* Pagination */}
      {filteredPaymentDetails.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Показать:</span>
            <Select value={pageSize.toString()} onValueChange={(value) => handlePageSizeChange(Number(value))}>
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="20">20</SelectItem>
                <SelectItem value="50">50</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              записей на странице
            </span>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {startIndex + 1}-{Math.min(endIndex, totalItems)} из {totalItems}
            </span>
            
            <div className="flex items-center gap-1">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Назад
              </Button>
              
              {/* Page numbers */}
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <Button
                    key={pageNum}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className="w-8 h-8 p-0"
                  >
                    {pageNum}
                  </Button>
                );
              })}
              
              {totalPages > 5 && currentPage < totalPages - 2 && (
                <>
                  <span className="text-muted-foreground">...</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(totalPages)}
                    className="w-8 h-8 p-0"
                  >
                    {totalPages}
                  </Button>
                </>
              )}
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Вперед
              </Button>
            </div>
          </div>
        </div>
      )}

      {paymentDetails.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground mb-4">
            У вас пока нет добавленных реквизитов
          </p>
          <Dialog open={dialogOpen} onOpenChange={handleDialogClose}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Добавить первый реквизит
              </Button>
            </DialogTrigger>
          </Dialog>
        </div>
      )}
    </div>
}