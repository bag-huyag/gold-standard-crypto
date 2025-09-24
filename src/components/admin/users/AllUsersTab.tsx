// components/admin/users/AllUsersTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function AllUsersTab() {
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    login: "",
    password: "",
    role: "trader"
  });

  // Объединенные данные пользователей
  const allUsers = [
    { 
      id: 1, 
      username: "john_trader", 
      login: "john.doe@example.com", 
      role: "trader", 
      type: "Трейдер",
      status: "active",
      phone: "+79123456789",
      createdAt: "2024-01-15",
      lastActive: "2024-09-12 14:30"
    },
    { 
      id: 2, 
      username: "sarah_lead", 
      login: "sarah.smith@example.com", 
      role: "team_lead", 
      type: "Тим-лид",
      status: "active",
      phone: "+79123456780",
      createdAt: "2024-02-20",
      lastActive: "2024-09-12 13:45"
    },
    { 
      id: 3, 
      username: "mike_trader", 
      login: "mike.johnson@example.com", 
      role: "trader", 
      type: "Трейдер",
      status: "active",
      phone: "+79123456781",
      createdAt: "2024-03-10",
      lastActive: "2024-09-12 12:15"
    },
    { 
      id: 4, 
      username: "merchant_one", 
      login: "merchant1@example.com", 
      role: "merchant", 
      type: "Мерчант",
      status: "active",
      phone: "+79123456782",
      createdAt: "2024-01-05",
      lastActive: "2024-09-12 11:20"
    },
    { 
      id: 5, 
      username: "merchant_two", 
      login: "merchant2@example.com", 
      role: "merchant", 
      type: "Мерчант",
      status: "inactive",
      phone: "+79123456783",
      createdAt: "2024-04-18",
      lastActive: "2024-09-10 16:40"
    }
  ];

  const filteredUsers = allUsers.filter(user => {
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    const matchesSearch = user.username.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         user.login.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRole && matchesStatus && matchesSearch;
  });

  const handleCreateUser = () => {
    console.log("Создание пользователя:", newUser);
    // Здесь будет API вызов
    setIsCreateDialogOpen(false);
    setNewUser({ username: "", login: "", password: "", role: "trader" });
  };

  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'team_lead': return 'default';
      case 'merchant': return 'secondary';
      default: return 'outline';
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Все пользователи</span>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить пользователя
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Создание нового пользователя</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={newUser.username}
                      onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                      placeholder="Введите username"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login">Login (Email)</Label>
                    <Input
                      id="login"
                      type="email"
                      value={newUser.login}
                      onChange={(e) => setNewUser({...newUser, login: e.target.value})}
                      placeholder="Введите login"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newUser.password}
                      onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                      placeholder="Введите пароль"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Роль</Label>
                    <Select value={newUser.role} onValueChange={(value: any) => setNewUser({...newUser, role: value})}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader">Трейдер</SelectItem>
                        <SelectItem value="team_lead">Тим-лид</SelectItem>
                        <SelectItem value="merchant">Мерчант</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateUser}>
                      Создать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтры и поиск */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Поиск по username или email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Все роли" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="trader">Трейдеры</SelectItem>
                <SelectItem value="team_lead">Тим-лиды</SelectItem>
                <SelectItem value="merchant">Мерчанты</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Все статусы" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все статусы</SelectItem>
                <SelectItem value="active">Активные</SelectItem>
                <SelectItem value="inactive">Неактивные</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Таблица пользователей */}
          <div className="border rounded-lg">
            <div className="relative w-full overflow-auto">
              <table className="w-full caption-bottom text-sm">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="h-12 px-4 text-left align-middle font-medium">Пользователь</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Контакт</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Роль</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Статус</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Активность</th>
                    <th className="h-12 px-4 text-left align-middle font-medium">Действия</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-muted-foreground">ID: {user.id}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm">
                            <Mail className="h-3 w-3" />
                            {user.login}
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            {user.phone}
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getRoleBadgeVariant(user.role)}>
                          {user.type}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusBadgeVariant(user.status)}>
                          {user.status === 'active' ? 'Активен' : 'Неактивен'}
                        </Badge>
                      </td>
                      <td className="p-4">
                        <div className="text-sm space-y-1">
                          <div>Создан: {user.createdAt}</div>
                          <div className="text-muted-foreground">Был в сети: {user.lastActive}</div>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            Редактировать
                          </Button>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Пользователи не найдены
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}