// components/admin/users/TeamsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Command, Plus, Search, Users, Edit, Trash2 } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";

export default function TeamsTab() {
  const [selectedTeamLead, setSelectedTeamLead] = useState("lightning23");
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTeam, setNewTeam] = useState({
    trader: "",
    commission: "0.5"
  });

  // Данные по командам
  const teamLeads = [
    { id: "lightning23", name: "Lightning's23", username: "Lightning's23" },
    { id: "sarah_lead", name: "Sarah Lead", username: "sarah.smith" },
    { id: "john_lead", name: "John Lead", username: "john.doe" }
  ];

  const teamsData = {
    lightning23: [
      { trader: "Lmanaliew_001", commission: "1.5%", joinDate: "2024-01-15", status: "active" },
      { trader: "leleha10", commission: "0.5%", joinDate: "2024-02-20", status: "active" },
      { trader: "abdusalamovm77", commission: "0.5%", joinDate: "2024-03-10", status: "active" },
      { trader: "adus20091", commission: "0.5%", joinDate: "2024-04-05", status: "inactive" }
    ],
    sarah_lead: [
      { trader: "trader_sarah_1", commission: "1.0%", joinDate: "2024-05-15", status: "active" },
      { trader: "trader_sarah_2", commission: "0.8%", joinDate: "2024-06-20", status: "active" }
    ],
    john_lead: []
  };

  const currentTeams = teamsData[selectedTeamLead as keyof typeof teamsData] || [];
  const selectedLead = teamLeads.find(lead => lead.id === selectedTeamLead);

  const handleCreateTeam = () => {
    console.log("Создание команды:", { teamLead: selectedLead, ...newTeam });
    // Здесь будет API вызов
    setIsCreateDialogOpen(false);
    setNewTeam({ trader: "", commission: "0.5" });
  };

  const handleDeleteTeam = (trader: string) => {
    console.log("Удаление из команды:", trader);
    // Здесь будет API вызов
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Command className="h-5 w-5" />
              <span>Управление командами</span>
            </div>
            <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Добавить в команду
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Добавить трейдера в команду</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Тим-лид</Label>
                    <Select value={selectedTeamLead} onValueChange={setSelectedTeamLead}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {teamLeads.map(lead => (
                          <SelectItem key={lead.id} value={lead.id}>
                            {lead.name} ({lead.username})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="trader">Трейдер</Label>
                    <Select value={newTeam.trader} onValueChange={(value) => setNewTeam({...newTeam, trader: value})}>
                      <SelectTrigger>
                        <SelectValue placeholder="-- Выберите трейдера --" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="trader1">Трейдер 1 (trader1)</SelectItem>
                        <SelectItem value="trader2">Трейдер 2 (trader2)</SelectItem>
                        <SelectItem value="trader3">Трейдер 3 (trader3)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="commission">Комиссия (доля)</Label>
                    <Input
                      id="commission"
                      type="number"
                      step="0.001"
                      min="0"
                      max="1"
                      value={newTeam.commission}
                      onChange={(e) => setNewTeam({...newTeam, commission: e.target.value})}
                      placeholder="Введите долю от 0 до 1 (например, 0.05 = 5%)"
                    />
                    <p className="text-xs text-muted-foreground">
                      Введите долю от 0 до 1 (например, 0.05 = 5%)
                    </p>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                      Отмена
                    </Button>
                    <Button onClick={handleCreateTeam}>
                      Создать
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Выбор тим-лида */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="team-lead-select">Выберите тим-лида:</Label>
              <Select value={selectedTeamLead} onValueChange={setSelectedTeamLead}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {teamLeads.map(lead => (
                    <SelectItem key={lead.id} value={lead.id}>
                      {lead.name} ({lead.username})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <p className="text-sm text-muted-foreground">
                Отношения для: <strong>{selectedLead?.name}</strong>
              </p>
            </div>
          </div>

          {/* Поиск */}
          <div className="relative">
            <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Поиск по имени трейдера..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>

          {/* Таблица команд */}
          <div className="border rounded-lg">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Трейдер</TableHead>
                  <TableHead>Комиссия</TableHead>
                  <TableHead>Дата присоединения</TableHead>
                  <TableHead>Статус</TableHead>
                  <TableHead>Действия</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentTeams.length > 0 ? (
                  currentTeams
                    .filter(team => team.trader.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((team, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{team.trader}</TableCell>
                        <TableCell>{team.commission}</TableCell>
                        <TableCell>{team.joinDate}</TableCell>
                        <TableCell>
                          <Badge variant={team.status === 'active' ? 'default' : 'secondary'}>
                            {team.status === 'active' ? 'Активен' : 'Неактивен'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4 mr-1" />
                              Изменить
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => handleDeleteTeam(team.trader)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Удалить
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                      <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>В команде пока нет трейдеров</p>
                      <p className="text-sm">Добавьте первого трейдера в команду</p>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Статистика команды */}
          {currentTeams.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Статистика команды</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{currentTeams.length}</div>
                    <div className="text-sm text-muted-foreground">Всего трейдеров</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">
                      {currentTeams.filter(t => t.status === 'active').length}
                    </div>
                    <div className="text-sm text-muted-foreground">Активных</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">
                      {currentTeams.reduce((acc, team) => acc + parseFloat(team.commission), 0).toFixed(1)}%
                    </div>
                    <div className="text-sm text-muted-foreground">Средняя комиссия</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold">24</div>
                    <div className="text-sm text-muted-foreground">Сделок за месяц</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}