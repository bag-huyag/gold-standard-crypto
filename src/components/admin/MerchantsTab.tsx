import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

export function MerchantsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Building2 className="h-5 w-5" />
          Управление мерчантами
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Form for creating new merchant */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 p-4 border rounded-lg">
          <div>
            <label className="text-sm font-medium mb-2 block">Название</label>
            <Input type="text" placeholder="Введите название мерчанта" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">API Key</label>
            <Input type="text" placeholder="Введите API ключ" />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Callback URL</label>
            <Input type="url" placeholder="https://example.com/callback" />
          </div>
          <div className="flex items-end">
            <Button className="w-full">
              Создать мерчанта
            </Button>
          </div>
        </div>

        {/* Merchants table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список мерчантов</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Название</TableHead>
                <TableHead>API Key</TableHead>
                <TableHead>Callback URL</TableHead>
                <TableHead>Статус</TableHead>
                <TableHead>Действия</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>biwire_finance</TableCell>
                <TableCell>api_key_***</TableCell>
                <TableCell>https://biwire.com/callback</TableCell>
                <TableCell>
                  <Badge variant="default">Активен</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                      Редактировать
                    </Button>
                    <Button variant="destructive" size="sm">
                      Заблокировать
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>2</TableCell>
                <TableCell>crypto_exchange</TableCell>
                <TableCell>api_key_***</TableCell>
                <TableCell>https://crypto.com/webhook</TableCell>
                <TableCell>
                  <Badge variant="secondary">Неактивен</Badge>
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