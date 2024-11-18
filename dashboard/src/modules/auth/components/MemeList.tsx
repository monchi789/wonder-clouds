import { useState, useEffect } from 'react'
import { getMemes } from '@/modules/auth/services/meme.api'
import LoadingSpinner from '@/shared/components/common/LoadingSpinner'
import { Alert, AlertDescription } from '@/shared/components/ui/alert'

const MemeList = () => {
  const [memeUrl, setMemeUrl] = useState<string | null>(null)
  const [isMemeLoading, setIsMemeLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchMeme = async () => {
      try {
        const memes = await getMemes()
        if (memes?.length > 0) {
          setMemeUrl(memes[0].image)
        }
      } finally {
        setIsMemeLoading(false)
      }
    }

    fetchMeme()
  }, [])

  if (isMemeLoading) {
    return (
      <div className='w-full h-full flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    )
  }

  if (!memeUrl) {
    return (
      <div className='w-full flex items-center justify-center'>
        <Alert variant='destructive'>
          <AlertDescription>No se pudo cargar el meme.</AlertDescription>
        </Alert>
      </div>
    )
  }

  return (
    <img
      src={memeUrl as string}
      alt='Meme de programación'
      className='w-full h-60 object-contain'
      loading='lazy'
    />
  )
}

export default MemeList
