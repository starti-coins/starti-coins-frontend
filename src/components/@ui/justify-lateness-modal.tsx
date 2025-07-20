import { PropsWithChildren } from "react";
import { Button } from "@/components/@ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/@ui/dialog";
import { Label } from "@/components/@ui/label";
import { Textarea } from "./textarea";

export function JustifyLatenessModal({ children }: PropsWithChildren) {
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="sm:max-w-[425px]">
              Justificativa referente ao atraso na realização da tarefa.
            </DialogTitle>
            <DialogDescription className="mt-2">
              Justifique abaixo o motivo do atraso. Se a justificativa for
              válida, você receberá todas as moedas, caso contrário, haverá um
              desconto.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="justify">Justificativa</Label>
              <Textarea id="justify" name="justify" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancelar</Button>
            </DialogClose>
            <Button type="submit">Justificar</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
