import { Button } from '@/shared/components/ui/button'
import { Input } from '@/shared/components/ui/input'
import { Label } from '@/shared/components/ui/label'
import { ImagePlus, X } from 'lucide-react'
import { cn } from '@/libs/utils'

interface ImageUploadProps {
  onChange: (url: string | null) => void
  value: string | null
}

const ImageUpload = ({ onChange, value }: ImageUploadProps) => {
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        onChange(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className='space-y-4'>
      {value ? (
        <div className='relative group'>
          <img src={value} alt='Cover' className='w-full aspect-video object-cover rounded-lg' />
          <Button
            variant='destructive'
            size='sm'
            className='absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity'
            onClick={() => onChange(null)}
          >
            <X className='h-4 w-4' />
          </Button>
        </div>
      ) : (
        <div className='border-2 border-dashed rounded-lg p-8 text-center'>
          <Input
            type='file'
            accept='image/*'
            className='hidden'
            id='cover-image'
            onChange={handleImageUpload}
          />
          <Label
            htmlFor='cover-image'
            className={cn(
              'flex flex-col items-center gap-2 cursor-pointer',
              'text-muted-foreground hover:text-foreground transition-colors'
            )}
          >
            <ImagePlus className='h-8 w-8' />
            <span>Subir imagen de portada</span>
            <span className='text-sm'>Recomendado: 1200×630px, max 2MB</span>
          </Label>
        </div>
      )}
    </div>
  )
}

export default ImageUpload
