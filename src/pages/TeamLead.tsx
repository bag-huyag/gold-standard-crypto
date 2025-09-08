import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Crown, Lock } from "lucide-react";

export default function TeamLead() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground flex items-center gap-2">
          <Crown className="h-8 w-8 text-warning" />
          Кабинет тимлида
        </h1>
      </div>

      {/* Coming Soon */}
      <Card>
        <CardContent className="py-12">
          <div className="text-center space-y-4">
            <Lock className="h-16 w-16 text-muted-foreground mx-auto" />
            <h2 className="text-2xl font-bold">Раздел в разработке</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Кабинет тимлида будет содержать расширенные инструменты управления командой и аналитику.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}