import ImageUpload from '../components/ImageUpload';
import { useForm, Controller } from 'react-hook-form';
import { Input } from '@/shared/components/ui/input';
import { Save, Send } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/shared/components/ui/select';
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from '@tinymce/tinymce-react';
import type { Post } from '@/interfaces/Post';
import { toast } from 'sonner';
import { createPost } from '../services/post.api';
import { useGetCategoriasPublicacion } from '../hooks/useCategoriasPublicacion';
import LoadingSpinner from '@/shared/components/common/LoadingSpinner';

const PostCreate = () => {
  const { data: categoriasList, isLoading, isError, error } = useGetCategoriasPublicacion();

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<Post>({
    defaultValues: {
      titulo: '',
      contenido: '',
      portada: '',
      categoriaPublicacion: ''
    }
  });

  const editorRef = useRef<TinyMCEEditor['editor'] | null>(null);

  const onSubmit = async (data: Post) => {
    try {
      const res = await createPost(data);

      console.log(res);
      reset();
      toast.success('Publicación creada exitosamente.');
    } catch {
      toast.error('Algo sucedió mal, vuelva a intentarlo.');
    }
  };

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />;
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <form
      className='flex flex-col flex-1 border rounded-lg shadow-md'
      onSubmit={() => handleSubmit(onSubmit)}
    >
      {/* Header */}
      <div className='border-b px-4 py-5'>
        <h2 className='text-2xl font-bold'>Crear nueva publicación</h2>
      </div>

      <div className='p-4 flex-1 space-y-8'>
        <div className='grid grid-cols-2 gap-4'>
          {/* Título de la publicación */}
          <div className='space-y-2'>
            <label htmlFor='titulo' className='block text-sm font-medium text-gray-700'>
              Título de la publicación
            </label>
            <Input
              id='titulo'
              type='text'
              placeholder='Escribir el título de la publicación'
              className='block w-full border-gray-300 rounded-md shadow-sm text-lg focus:border-wonder-blue focus:ring-wonder-blue'
              {...register('titulo', {
                required: 'Este campo es requerido',
                minLength: {
                  value: 5,
                  message: 'El título de la publicación debe tener al menos 5 caracteres'
                }
              })}
            />
            {errors.titulo && (
              <p className='text-red-500 text-xs italic mt-1'>{errors.titulo.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>Categoría</label>
            <Controller
              name='categoriaPublicacion'
              control={control}
              rules={{ required: 'La categoría es requerida' }}
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Seleccionar categoría' />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.isArray(categoriasList) && categoriasList.map((cat) => (
                      <SelectItem key={cat.idTipoGeneral} value={cat.nombre}>
                        {cat.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoriaPublicacion && (
              <p className='text-red-500 text-xs italic mt-1'>
                {errors.categoriaPublicacion.message}
              </p>
            )}
          </div>
        </div>

        <div className='space-y-2 flex flex-col flex-1'>
          <label className='block text-sm font-medium text-gray-700'>Contenido</label>
          <div className='flex-1'>
            <Controller
              name='contenido'
              control={control}
              rules={{
                required: 'El contenido es requerido',
                minLength: {
                  value: 200,
                  message: 'El contenido debe tener al menos 200 caracteres'
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TinyMCEEditor
                  apiKey='931uiwwfzxr53fuqliaj0xioohglj46skimbgi4fni4aw4bb'
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: '300px',
                    menubar: false,
                    plugins: [
                      'advlist',
                      'autolink',
                      'lists',
                      'link',
                      'image',
                      'charmap',
                      'preview',
                      'anchor',
                      'searchreplace',
                      'visualblocks',
                      'code',
                      'fullscreen',
                      'insertdatetime',
                      'media',
                      'table',
                      'code',
                      'help',
                      'wordcount'
                    ],
                    toolbar:
                      'undo redo | blocks | bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat | help',
                    content_style:
                      'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }',
                    resize: true,
                    autoresize_bottom_margin: 0
                  }}
                  value={value}
                  onEditorChange={onChange}
                />
              )}
            />
          </div>
          {errors.contenido && (
            <p className='text-red-500 text-xs italic mt-1'>{errors.contenido.message}</p>
          )}
        </div>

        {/* Cover Image */}
        <div className='space-y-2'>
          <label className='block text-sm font-medium text-gray-700'>Portada</label>
          <Controller
            name='portada'
            control={control}
            rules={{ required: 'La portada es requerida' }}
            render={({ field: { onChange, value } }) => (
              <ImageUpload value={value} onChange={onChange} />
            )}
          />
          {errors.portada && (
            <p className='text-red-500 text-xs italic mt-1'>{errors.portada.message}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className='border-t px-4 py-2 flex justify-between'>
        <div className='flex gap-2'>
          <button
            type='button'
            className='flex items-center px-4 py-2 border rounded-lg text-gray-700 hover:bg-gray-100'
          >
            <Save className='w-4 h-4 mr-2' />
            Guardar
          </button>
        </div>
        <button
          type='submit'
          className='flex items-center bg-wonder-blue text-white font-bold rounded-lg hover:bg-wonder transition transform hover:scale-105 active:scale-95 px-4 py-2'
        >
          <Send className='w-4 h-4 mr-2' />
          Publicar
        </button>
      </div>
    </form>
  );
};

export default PostCreate;
