'use client';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { Button } from '@/shared/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';

const formSchema = z
  .object({
    name: z.string(),
    paternalSurname: z.string(),
    maternalSurname: z.string(),
    nroDocument: z.string().min(8),
    phone: z.number().int(),
    emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string(),
    accountType: z.enum(['personal', 'company']),
    companyName: z.string().optional()
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: 'Las Contraseñas no coenciden.',
      path: ['passwordConfirm']
    }
  )
  .refine(
    (data) => {
      if (data.accountType === 'company') return !!data.companyName;

      return true;
    },
    {
      message: 'El nombre de la Compañía es Requerida.',
      path: ['companyName']
    }
  )
  .refine(
    (data) => {
      return data.phone >= 0 && data.phone >= 111111111;
    },
    {
      message: 'El número de celular debe tener como mínimo 9 dígitos.',
      path: ['phone']
    }
  );

function ClientsMain() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nroDocument: '',
      emailAddress: '',
      password: '',
      passwordConfirm: '',
      companyName: ''
    }
  });

  const accountType = form.watch('accountType');

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  return (
    <main className='flex flex-col items-center justify-between p-24 min-h-screen'>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className='max-w-md w-full flex flex-col gap-4'
        >
          <FormField
            name='name'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nombre</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ingresa el Nombre del Cliente' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='paternalSurname'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Apellido Paterno</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ingresa el Apellido Paterno del Cliente' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='maternalSurname'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Apellido Materno</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='Ingresa el Apellido Materno del Cliente' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='nroDocument'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Nro. de Documento</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='Ingresa el Nro de Doc. del Cliente'
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 8) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 8);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='phone'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Número de Celular</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      type='number'
                      placeholder='Ingresa el Nro de Celular del Cliente'
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      onInput={(e) => {
                        if (e.currentTarget.value.length > 9) {
                          e.currentTarget.value = e.currentTarget.value.slice(0, 9);
                        }
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='emailAddress'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Correo</FormLabel>
                  <FormControl>
                    <Input {...field} type='email' placeholder='Ingresa el Correo del Cliente' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='accountType'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Tipo de Companía</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecciona un Tipo de Cuenta' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value='personal'>Personal</SelectItem>
                      <SelectItem value='company'>Company</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {accountType === 'company' && (
            <FormField
              name='companyName'
              control={form.control}
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Compañía</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder='Ingresa tu Compañía' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          )}

          <FormField
            name='password'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='**********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            name='passwordConfirm'
            control={form.control}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormLabel>Confirmar Contraseña</FormLabel>
                  <FormControl>
                    <Input {...field} type='password' placeholder='**********' />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type='submit' className='w-full'>
            Enviar
          </Button>
        </form>
      </Form>
    </main>
  );
}

export default ClientsMain;
