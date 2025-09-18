import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Users } from "lucide-react";

export function TradersTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Управление трейдерами
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for creating new trader */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Username</label>
            <Input type="text" placeholder="Введите username" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Login</label>
            <Input type="text" placeholder="Введите login" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <Input type="password" placeholder="Введите пароль" />
          </div>
          <div className="flex items-end">
            <Button className="w-full">
              Создать трейдера
            </Button>
          </div>
        </div>

        {/* Traders table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список трейдеров и тим-лидов</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Username</TableHead>
                <TableHead>Login</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>john_trader</TableCell>
                <TableCell>john.doe</TableCell>
                <TableCell>
                  <Badge variant="secondary">Трейдер</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Повысить до тим-лида
                  </Button>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>sarah_lead</TableCell>
                <TableCell>sarah.smith</TableCell>
                <TableCell>
                  <Badge>Тим-лид</Badge>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm">
                    Понизить до трейдера
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}