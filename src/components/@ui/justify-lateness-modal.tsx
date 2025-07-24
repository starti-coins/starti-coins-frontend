import { PropsWithChildren, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { Textarea } from "./textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./form";
import { z } from "zod";

const justifyLatenessSchema = z.object({
  justify: z.string().min(3, "Justificativa deve ter pelo menos 3 caracteres"),
});

type JustifyLatenessFormValues = z.infer<typeof justifyLatenessSchema>;

export function JustifyLatenessModal({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);
  const form = useForm<JustifyLatenessFormValues>({
    resolver: zodResolver(justifyLatenessSchema),
    defaultValues: {
      justify: "",
    },
  });

  const submitJustifyForm = (data: JustifyLatenessFormValues) => {
    console.log("Justification submitted:", data.justify);
    form.reset();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submitJustifyForm)}>
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
            <div className="grid gap-4 mt-4">
              <div className="grid gap-3">
                <FormField
                  control={form.control}
                  name="justify"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel htmlFor="justify">Justificativa</FormLabel>
                      <FormControl>
                        <Textarea id="justify" required {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit">Justificar</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
