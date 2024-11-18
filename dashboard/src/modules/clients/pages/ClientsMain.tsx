"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(3),
  passwordConfirm: z.string(),
  accountType: z.enum(["personal", "company"]),
  companyName: z.string().optional(),
}).refine((data) => {
  return data.password === data.passwordConfirm
}, {
  message: "Las Contraseñas no coenciden.",
  path: ["passwordConfirm"]
}).refine((data) => {
  if (data.accountType === "company")
    return !!data.companyName;
  return true;
}, {
  message: "El nombre de la Compañía es Requerida.",
  path: ["companyName"],
})

function ClientsMain() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: "",
      companyName: "",
    }
  });

  const accountType = form.watch("accountType");

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values })
  }

  return (
    <main className="flex flex-col items-center justify-between p-24 min-h-screen">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="max-w-md w-full flex flex-col gap-4">
          <FormField name="emailAddress" control={form.control} render={({ field }) => {
            return <FormItem>
              <FormLabel>Correo</FormLabel>
              <FormControl>
                <Input {...field} type="email" placeholder="Ingresa tu Correo" />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <FormField name="accountType" control={form.control} render={({ field }) => {
            return <FormItem>
              <FormLabel>Tipo de Companía</FormLabel>
              <Select onValueChange={field.onChange}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un Tipo de Cuenta" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="personal">Personal</SelectItem>
                  <SelectItem value="company">Company</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          }} />
          {accountType === "company" &&
            <FormField name="companyName" control={form.control} render={({ field }) => {
              return <FormItem>
                <FormLabel>Compañía</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Ingresa tu Compañía" />
                </FormControl>
                <FormMessage />
              </FormItem>
            }} />
          }
          <FormField name="password" control={form.control} render={({ field }) => {
            return <FormItem>
              <FormLabel>Contraseña</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="**********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <FormField name="passwordConfirm" control={form.control} render={({ field }) => {
            return <FormItem>
              <FormLabel>Confirmar Contraseña</FormLabel>
              <FormControl>
                <Input {...field} type="password" placeholder="**********" />
              </FormControl>
              <FormMessage />
            </FormItem>
          }} />
          <Button type="submit" className="w-full">
            Enviar
          </Button>
        </form>
      </Form>
    </main>
  )
}

export default ClientsMain