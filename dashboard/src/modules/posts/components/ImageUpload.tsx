import React, { useState, useCallback } from 'react';
import { ImagePlus, X } from 'lucide-react';

interface ImageUploadProps {
  value: string[] | null;
  onChange: (files: string[]) => void;
  multiple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ value, onChange, multiple = false }) => {
  const [previewUrls, setPreviewUrls] = useState<string[]>(value || []);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      const newPreviewUrls = newFiles.map(file => URL.createObjectURL(file));
      
      if (multiple) {
        onChange([...(value || []), ...newPreviewUrls]);
        setPreviewUrls(prevUrls => [...prevUrls, ...newPreviewUrls]);
      } else {
        onChange(newPreviewUrls);
        setPreviewUrls(newPreviewUrls);
      }
    }
  }, [multiple, onChange, value]);

  const removeImage = useCallback((index: number) => {
    const newUrls = [...previewUrls];
    newUrls.splice(index, 1);
    onChange(newUrls);
    setPreviewUrls(newUrls);
  }, [onChange, previewUrls]);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <ImagePlus className="w-10 h-10 mb-3 text-gray-400" />
            <p className="mb-2 text-sm text-gray-500"><span className="font-semibold">Haga clic para cargar</span> o arrastre y suelte</p>
            <p className="text-xs text-gray-500">SVG, PNG, JPG o GIF (MAX. 800x400px)</p>
          </div>
          <input 
            id="dropzone-file" 
            type="file" 
            className="hidden" 
            onChange={handleFileChange} 
            multiple={multiple} 
            accept="image/*" 
            aria-label="Subir imagen"
          />
        </label>
      </div>
      {previewUrls.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {previewUrls.map((url, index) => (
            <div key={index} className="relative">
              <img src={url} alt={`Imagen subida ${index + 1}`} className="rounded-lg object-cover w-full h-40" />
              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                aria-label={`Eliminar imagen ${index + 1}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
