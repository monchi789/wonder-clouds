import ImageUpload from "../components/ImageUpload";
import { useForm, Controller } from 'react-hook-form';
import { Label } from "@/shared/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Button } from "@/shared/components/ui/button";
import { Save, Send } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import { useRef } from 'react';
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { Post } from "@/interfaces/Post";
import { toast } from "sonner";
import { createPost } from "../services/post.api";
import { useGetCategoriasPublicacion } from "../hooks/useCategoriasPublicacion";
import LoadingSpinner from "@/shared/components/common/LoadingSpinner";

const PostCreate = () => {
  const { data: categoriasList, isLoading, isError, error } = useGetCategoriasPublicacion()

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

  const editorRef = useRef<TinyMCEEditor["editor"] | null>(null);

  const onSubmit = async (data: Post) => {
    try {
      const res = await createPost(data);
      console.log(res);
      reset();
      toast.success('Publicación creada exitosamente.');
    } catch {
      toast.error("Algo sucedió mal, vuelva a intentarlo.");
    }
  };

  if (isLoading) {
    return <LoadingSpinner size='w-12 h-12' />
  }

  if (isError) {
    return <div>Error: {error instanceof Error ? error.message : 'Algo salió mal'}</div>;
  }

  return (
    <form className="container max-w-4xl mx-auto" onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Crear nueva publicación</CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Title Input */}
          <div className="space-y-2">
            <Label htmlFor="titulo">Título de la publicación</Label>
            <Input
              id="titulo"
              placeholder="Escribir el título de la publicación"
              className="text-lg"
              {...register("titulo", {
                required: "Este campo es requerido",
                minLength: {
                  value: 5,
                  message: "El título de la publicación debe tener al menos 5 caracteres"
                }
              })}
            />
            {errors.titulo && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.titulo.message}
              </p>
            )}
          </div>

          {/* TinyMCE Editor with Controller */}
          <div className="space-y-2">
            <Label>Contenido</Label>
            <Controller
              name="contenido"
              control={control}
              rules={{
                required: "El contenido es requerido",
                minLength: {
                  value: 200,
                  message: "El contenido debe tener al menos 200 caracteres"
                }
              }}
              render={({ field: { onChange, value } }) => (
                <TinyMCEEditor
                  apiKey='931uiwwfzxr53fuqliaj0xioohglj46skimbgi4fni4aw4bb'
                  onInit={(_evt, editor) => (editorRef.current = editor)}
                  init={{
                    height: 500,
                    menubar: false,
                    plugins: [
                      'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                      'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                      'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                    ],
                    toolbar: 'undo redo | blocks | ' +
                      'bold italic forecolor | alignleft aligncenter ' +
                      'alignright alignjustify | bullist numlist outdent indent | ' +
                      'removeformat | help',
                    content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                  }}
                  value={value}
                  onEditorChange={onChange}
                />
              )}
            />
            {errors.contenido && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.contenido.message}
              </p>
            )}
          </div>
          
          {/* Cover Image */}
          <div className="space-y-2">
            <Label>Portada</Label>
            <Controller
              name="portada"
              control={control}
              rules={{ required: "La portada es requerida" }}
              render={({ field: { onChange, value } }) => (
                <ImageUpload value={value} onChange={onChange} />
              )}
            />
            {errors.portada && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.portada.message}
              </p>
            )}
          </div>

          {/* Category Selection */}
          <div className="space-y-2">
            <Label>Categoría</Label>
            <Controller
              name="categoriaPublicacion"
              control={control}
              rules={{ required: "La categoría es requerida" }}
              render={({ field: { onChange, value } }) => (
                <Select value={value} onValueChange={onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleccionar categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    {categoriasList?.map((cat) => (
                      <SelectItem key={cat.idTipoGeneral} value={cat.nombre}>
                        {cat.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.categoriaPublicacion && (
              <p className="text-red-500 text-xs italic mt-1">
                {errors.categoriaPublicacion.message}
              </p>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <div className="flex gap-2">
            <Button variant="outline" type="button" onClick={() => reset()}>
              <Save className="w-4 h-4 mr-2" />
              Borrar
            </Button>
          </div>
          <Button type="submit" className="bg-wonder-blue hover:bg-wonder">
            <Send className="w-4 h-4 mr-2" />
            Publicar
          </Button>
        </CardFooter>
      </Card>
    </form>
  )
}

export default PostCreate;
