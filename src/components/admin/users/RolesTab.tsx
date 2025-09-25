// components/admin/users/RolesTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Building2, Shield, UserCheck, UserX, Mail, Phone } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useState } from "react";

export default function RolesTab() {
  const [roleFilter, setRoleFilter] = useState("all");

  const usersWithRoles = [
    {
      id: 1,
      username: "john_trader",
      login: "john.doe@example.com",
      currentRole: "trader",
      permissions: ["trade", "view_wallet"],
      status: "active",
      canPromote: true,
      canDemote: false
    },
    {
      id: 2,
      username: "sarah_lead",
      login: "sarah.smith@example.com",
      currentRole: "team_lead",
      permissions: ["trade", "view_wallet", "manage_team", "view_reports"],
      status: "active",
      canPromote: false,
      canDemote: true
    },
    {
      id: 3,
      username: "merchant_one",
      login: "merchant1@example.com",
      currentRole: "merchant",
      permissions: ["create_orders", "view_transactions"],
      status: "active",
      canPromote: false,
      canDemote: false
    },
    {
      id: 4,
      username: "admin_support",
      login: "support@example.com",
      currentRole: "support",
      permissions: ["view_all", "manage_disputes", "support_access"],
      status: "active",
      canPromote: false,
      canDemote: false
    }
  ];

  const filteredUsers = usersWithRoles.filter(user => 
    roleFilter === "all" || user.currentRole === roleFilter
  );

  const getRoleInfo = (role: string) => {
    const roles = {
      trader: { name: "Трейдер", color: "bg-blue-100 text-blue-800", description: "Может совершать сделки" },
      team_lead: { name: "Тим-лид", color: "bg-green-100 text-green-800", description: "Управляет командой трейдеров" },
      merchant: { name: "Мерчант", color: "bg-purple-100 text-purple-800", description: "Создает ордера на обмен" },
      support: { name: "Поддержка", color: "bg-orange-100 text-orange-800", description: "Техническая поддержка" },
      admin: { name: "Администратор", color: "bg-red-100 text-red-800", description: "Полный доступ к системе" }
    };
    return roles[role as keyof typeof roles] || { name: role, color: "bg-gray-100 text-gray-800", description: "" };
  };

  const handleRoleChange = (userId: number, newRole: string) => {
    console.log(`Изменение роли пользователя ${userId} на ${newRole}`);
    // API вызов для изменения роли
  };

  const handlePermissionUpdate = (userId: number, permission: string, granted: boolean) => {
    console.log(`Обновление прав пользователя ${userId}: ${permission} = ${granted}`);
    // API вызов для обновления прав
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Управление ролями и доступом
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Фильтр по ролям */}
          <div className="flex items-center gap-4">
            <Label htmlFor="role-filter">Фильтр по роли:</Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Все роли</SelectItem>
                <SelectItem value="trader">Трейдеры</SelectItem>
                <SelectItem value="team_lead">Тим-лиды</SelectItem>
                <SelectItem value="merchant">Мерчанты</SelectItem>
                <SelectItem value="support">Поддержка</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Список пользователей с ролями */}
          <div className="space-y-4">
            {filteredUsers.map((user) => {
              const roleInfo = getRoleInfo(user.currentRole);
              
              return (
                <Card key={user.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3 flex-1">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="font-medium">{user.username}</div>
                          <div className="text-sm text-muted-foreground flex items-center gap-2">
                            <Mail className="h-3 w-3" />
                            {user.login}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <Badge className={roleInfo.color}>
                          {roleInfo.name}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {roleInfo.description}
                        </span>
                      </div>

                      {/* Права доступа */}
                      <div>
                        <Label className="text-sm font-medium">Права доступа:</Label>
                        <div className="flex flex-wrap gap-2 mt-2">
                          {user.permissions.map((permission) => (
                            <Badge key={permission} variant="outline" className="text-xs">
                              {permission}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      {/* Смена роли */}
                      <Select onValueChange={(value) => handleRoleChange(user.id, value)}>
                        <SelectTrigger className="w-[150px]">
                          <SelectValue placeholder="Сменить роль" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="trader" disabled={user.currentRole === "trader"}>
                            Трейдер
                          </SelectItem>
                          <SelectItem value="team_lead" disabled={user.currentRole === "team_lead"}>
                            Тим-лид
                          </SelectItem>
                          <SelectItem value="merchant" disabled={user.currentRole === "merchant"}>
                            Мерчант
                          </SelectItem>
                        </SelectContent>
                      </Select>

                      {/* Действия */}
                      <div className="flex gap-2">
                        {user.canPromote && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <UserCheck className="h-4 w-4 mr-1" />
                            Повысить
                          </Button>
                        )}
                        {user.canDemote && (
                          <Button size="sm" variant="outline" className="flex-1">
                            <UserX className="h-4 w-4 mr-1" />
                            Понизить
                          </Button>
                        )}
                        <Button size="sm" variant="outline">
                          Права
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-8 text-muted-foreground">
              Пользователи с выбранной ролью не найдены
            </div>
          )}
        </CardContent>
      </Card>

      {/* Справочник ролей */}
      <Card>
        <CardHeader>
          <CardTitle>Справочник ролей</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-blue-100 text-blue-800">Трейдер</Badge>
                <span className="text-sm">- Основной участник системы</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Совершение сделок</li>
                <li>• Просмотр кошелька</li>
                <li>• Управление реквизитами</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800">Тим-лид</Badge>
                <span className="text-sm">- Руководитель команды</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Все права трейдера</li>
                <li>• Управление командой</li>
                <li>• Просмотр статистики команды</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-purple-100 text-purple-800">Мерчант</Badge>
                <span className="text-sm">- Поставщик ликвидности</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Создание ордеров</li>
                <li>• Просмотр транзакций</li>
                <li>• Управление трафиком</li>
              </ul>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Badge className="bg-orange-100 text-orange-800">Поддержка</Badge>
                <span className="text-sm">- Техническая поддержка</span>
              </div>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Просмотр всех данных</li>
                <li>• Управление диспутами</li>
                <li>• Техническая поддержка</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}