import React, { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploadProps {
  onImageChange: (file: File | null) => void;
  previewUrl?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, previewUrl, className = '' }) => {
  const [preview, setPreview] = useState<string | null>(previewUrl || null);

  React.useEffect(() => {
    setPreview(previewUrl || null);
  }, [previewUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      onImageChange(file);
    }
  };

  const handleRemoveImage = () => {
    setPreview(null);
    onImageChange(null);
  };

  return (
    <div className={`relative ${className}`}>
      {preview ? (
        <div className="relative rounded-md overflow-hidden border border-gray-200">
          <img 
            src={preview} 
            alt="Preview" 
            className="w-full h-48 object-cover"
          />
          <button
            type="button"
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-gray-100"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-md cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="w-8 h-8 text-gray-400 mb-2" />
            <p className="mb-2 text-sm text-gray-500">
              <span className="font-semibold">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG or JPEG (max. 2MB)</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept="image/png, image/jpeg, image/jpg"
            onChange={handleImageChange}
          />
        </label>
      )}
    </div>
  );
};

export default ImageUpload;