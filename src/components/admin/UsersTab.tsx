// components/admin/UsersTab.tsx
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, Command, Building2 } from "lucide-react";
import AllUsersTab from "@/components/admin/users/AllUsersTab";
import TeamsTab from "@/components/admin/users/TeamsTab";
import RolesTab from "@/components/admin/users/RolesTab";

export default function UsersTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Управление пользователями</h2>
        <p className="text-muted-foreground">Создание и управление трейдерами, мерчантами и командами</p>
      </div>

      <Tabs defaultValue="all-users" className="w-full">
        <TabsList className="grid w-full grid-cols-3 gap-2 bg-muted/50 rounded-lg p-1">
          <TabsTrigger 
            value="all-users" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Users className="h-4 w-4" />
            <span>Все пользователи</span>
          </TabsTrigger>
          <TabsTrigger 
            value="teams" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Command className="h-4 w-4" />
            <span>Команды</span>
          </TabsTrigger>
          <TabsTrigger 
            value="roles" 
            className="flex items-center gap-2 data-[state=active]:bg-background data-[state=active]:shadow-sm"
          >
            <Building2 className="h-4 w-4" />
            <span>Роли и доступы</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all-users" className="mt-6">
          <AllUsersTab />
        </TabsContent>

        <TabsContent value="teams" className="mt-6">
          <TeamsTab />
        </TabsContent>

        <TabsContent value="roles" className="mt-6">
          <RolesTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}