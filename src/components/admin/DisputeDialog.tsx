import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

interface DisputeDialogProps {
  trigger: React.ReactNode;
  dealAmount: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (formData: any) => void;
}

export function DisputeDialog({ trigger, dealAmount, open, onOpenChange, onSubmit }: DisputeDialogProps) {
  const [disputeForm, setDisputeForm] = useState({
    amount: dealAmount.toString(),
    reason: "неизвестная причина",
    timeInMinutes: ""
  });

  const handleSubmit = () => {
    onSubmit(disputeForm);
    onOpenChange(false);
    setDisputeForm({
      amount: dealAmount.toString(),
      reason: "неизвестная причина",
      timeInMinutes: ""
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Открыть диспут</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="dispute-amount">Сумма диспута</Label>
            <Input
              id="dispute-amount"
              type="number"
              value={disputeForm.amount}
              onChange={(e) => setDisputeForm(prev => ({ ...prev, amount: e.target.value }))}
            />
          </div>
          <div>
            <Label htmlFor="dispute-reason">Причина диспута</Label>
            <Select 
              value={disputeForm.reason} 
              onValueChange={(value) => setDisputeForm(prev => ({ ...prev, reason: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="неверная сумма">Неверная сумма</SelectItem>
                <SelectItem value="нет оплаты">Нет оплаты</SelectItem>
                <SelectItem value="неизвестная причина">Неизвестная причина</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="dispute-time">Время диспута (в минутах)</Label>
            <Input
              id="dispute-time"
              type="number"
              value={disputeForm.timeInMinutes}
              onChange={(e) => setDisputeForm(prev => ({ ...prev, timeInMinutes: e.target.value }))}
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Отмена
            </Button>
            <Button onClick={handleSubmit}>
              Открыть диспут
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}