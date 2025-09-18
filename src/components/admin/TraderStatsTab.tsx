import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BarChart3 } from "lucide-react";

export function TraderStatsTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          Статистика трейдеров
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Трейдер</TableHead>
              <TableHead>Команда</TableHead>
              <TableHead>Сделки</TableHead>
              <TableHead>Успешные</TableHead>
              <TableHead>Отмененные</TableHead>
              <TableHead>Диспуты</TableHead>
              <TableHead>Оборот</TableHead>
              <TableHead>Комиссия</TableHead>
              <TableHead>Рейтинг</TableHead>
              <TableHead>Статус</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>john_trader</TableCell>
              <TableCell>Alpha Team</TableCell>
              <TableCell>89</TableCell>
              <TableCell>82</TableCell>
              <TableCell>7</TableCell>
              <TableCell>2</TableCell>
              <TableCell>2,450,000 ₽</TableCell>
              <TableCell>61,250 ₽</TableCell>
              <TableCell>
                <Badge variant="default">4.8</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="default">Активен</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>sarah_lead</TableCell>
              <TableCell>Alpha Team</TableCell>
              <TableCell>156</TableCell>
              <TableCell>148</TableCell>
              <TableCell>8</TableCell>
              <TableCell>1</TableCell>
              <TableCell>4,200,000 ₽</TableCell>
              <TableCell>105,000 ₽</TableCell>
              <TableCell>
                <Badge variant="default">4.9</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="default">Активен</Badge>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>mike_trader</TableCell>
              <TableCell>Beta Team</TableCell>
              <TableCell>45</TableCell>
              <TableCell>38</TableCell>
              <TableCell>7</TableCell>
              <TableCell>4</TableCell>
              <TableCell>1,200,000 ₽</TableCell>
              <TableCell>30,000 ₽</TableCell>
              <TableCell>
                <Badge variant="secondary">4.2</Badge>
              </TableCell>
              <TableCell>
                <Badge variant="secondary">На проверке</Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}