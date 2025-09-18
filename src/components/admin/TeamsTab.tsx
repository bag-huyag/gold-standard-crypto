import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Command } from "lucide-react";

export function TeamsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Command className="h-5 w-5" />
          Управление командами
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for creating new team */}
        <div className="p-4 border rounded-lg space-y-4">
          <h3 className="text-lg font-semibold">Создать команду</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <Label htmlFor="team-name">Название команды</Label>
              <Input id="team-name" placeholder="Введите название команды" />
            </div>
            <div>
              <Label htmlFor="team-lead">Тим-лид</Label>
              <Input id="team-lead" placeholder="Выберите тим-лида" />
            </div>
            <div>
              <Label htmlFor="team-description">Описание</Label>
              <Input id="team-description" placeholder="Краткое описание команды" />
            </div>
          </div>
          <Button>Создать команду</Button>
        </div>

        {/* Teams table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список команд</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>Тим-лид</TableHead>
                <TableHead>Участники</TableHead>
                <TableHead>Сделки</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Alpha Team</TableCell>
                <TableCell>sarah_lead</TableCell>
                <TableCell>5</TableCell>
                <TableCell>142</TableCell>
                <TableCell>
                  <Badge variant="default">Активна</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="destructive" size="sm">
                      Расформировать
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>Beta Team</TableCell>
                <TableCell>mike_lead</TableCell>
                <TableCell>3</TableCell>
                <TableCell>87</TableCell>
                <TableCell>
                  <Badge variant="secondary">Неактивна</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="default" size="sm">
                      Активировать
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