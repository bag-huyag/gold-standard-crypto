// tabs/MerchantsTab.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

export default function MerchantsTab() {
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
            <label className="text-sm font-medium mb-2 block">Username</label>
            <input
              type="text"
              placeholder="Введите username"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Login</label>
            <input
              type="text"
              placeholder="Введите login"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-2 block">Password</label>
            <input
              type="password"
              placeholder="Введите пароль"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
          <div className="flex items-end">
            <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full">
              Создать мерчанта
            </button>
          </div>
        </div>

        {/* Merchants table */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Список мерчантов</h3>
          <div className="relative w-full overflow-auto">
            <table className="w-full caption-bottom text-sm">
              <thead className="[&_tr]:border-b">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">ID</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Username</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Login</th>
                  <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground">Role</th>
                </tr>
              </thead>
              <tbody className="[&_tr:last-child]:border-0">
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">1</td>
                  <td className="p-4 align-middle">merchant_one</td>
                  <td className="p-4 align-middle">merchant1</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                      Мерчант
                    </span>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">2</td>
                  <td className="p-4 align-middle">merchant_two</td>
                  <td className="p-4 align-middle">merchant2</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                      Мерчант
                    </span>
                  </td>
                </tr>
                <tr className="border-b transition-colors hover:bg-muted/50">
                  <td className="p-4 align-middle">3</td>
                  <td className="p-4 align-middle">merchant_three</td>
                  <td className="p-4 align-middle">merchant3</td>
                  <td className="p-4 align-middle">
                    <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium bg-secondary text-secondary-foreground">
                      Мерчант
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}