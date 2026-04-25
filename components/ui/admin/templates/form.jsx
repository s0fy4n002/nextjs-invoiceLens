'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { GripVertical, Plus, Trash2, Upload, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export function TemplateForm({ template, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    name: template?.name || '',
    image: template?.image || '',
    description: template?.description || '',
  });

  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [imagePreview, setImagePreview] = useState(template?.image || '');
  const [selectedFile, setSelectedFile] = useState(null);

  // Initialize features from template data
  useEffect(() => {
    if (template?.features) {
      try {
        const parsedFeatures = typeof template.features === 'string' 
          ? JSON.parse(template.features) 
          : template.features;
        
        if (Array.isArray(parsedFeatures)) {
          setFeatures(parsedFeatures);
        }
      } catch (error) {
        console.error('Error parsing features:', error);
        setFeatures([]);
      }
    } else {
      setFeatures([]);
    }
  }, [template]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureChange = (index, value) => {
    const updatedFeatures = features.map((feature, i) => 
      i === index ? { ...feature, name: value } : feature
    );
    setFeatures(updatedFeatures);
  };

  const addFeature = () => {
    setFeatures([...features, { id: Date.now().toString(), name: '' }]);
  };

  const removeFeature = (index) => {
    const updatedFeatures = features.filter((_, i) => i !== index);
    setFeatures(updatedFeatures);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      // Validasi file type
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Hanya file JPEG, PNG, dan WebP yang diizinkan');
        return;
      }

      // Validasi file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Ukuran file maksimal 5MB');
        return;
      }

      setSelectedFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);

      // const res = await fetch("/api/upload/templates", {
      //   method: "POST",
      //   body: formData,
      // });
      // const data = await res.json();

      // if (!res.ok) {
      //   Swal.fire({
      //     icon:"error",
      //     title:"gagal",
      //     titleText:`Gagal Upload image`
      //   })
      // }

      // setFormData(prev => ({ ...prev, image: res.filePath }));
      
    }
  };
  const removeImage = async () => {

  console.log('formData adalah : ', formData)

    
    await fetch(`/api/upload/templates/delete`, {
      method: "POST",
      body: JSON.stringify({fileName: formData.image})
    });

    setSelectedFile(null);
    setImagePreview('');
    setFormData(prev => ({ ...prev, image: '' }));
  };

  const uploadImage = async () => {
    if (!selectedFile) return formData.image;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const res = await fetch("/api/upload/templates", {
        method: "POST",
        body: formData,
      });
      const data = await res.json();

      if (!res.ok) {
        Swal.fire({
          icon:"error",
          title:"gagal",
          titleText:`Gagal Upload image`
        })
      }
      console.log('data adalah: ', data)
      return data.filePath
      
    } catch (error) {
      console.error('Upload error:', error);
      throw new Error('Gagal mengupload gambar');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      let imageUrl = formData.image;
      
      // Upload new image if selected
      if (selectedFile) {
        imageUrl = await uploadImage();
      }

      // Filter out empty features
      const nonEmptyFeatures = features.filter(feature => feature.name.trim() !== '');
      
      // Prepare data for submission
      const submitData = {
        ...formData,
        image: imageUrl,
        features: nonEmptyFeatures
      };
      
      await onSubmit(submitData);
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{template ? 'Edit Template' : 'Create New Template'}</CardTitle>
        <CardDescription>
          {template ? 'Update the template details' : 'Add a new template to your collection'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Informasi Dasar</h3>
            
            <div className="space-y-2">
              <Label htmlFor="name">Nama Template *</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Template Modern PPOB"
                required
              />
            </div>

            {/* Image Upload Section */}
            <div className="space-y-2">
              <Label>Gambar Template</Label>
              
              {imagePreview ? (
                <div className="relative inline-block">
                  <img 
                    src={imagePreview} 
                    alt="Preview" 
                    className="w-32 h-32 object-cover rounded-lg border"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full"
                    onClick={removeImage}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <Label htmlFor="image-upload" className="cursor-pointer">
                    <Button type="button" variant="outline">
                      Pilih Gambar
                    </Button>
                    <Input
                      id="image-upload"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </Label>
                  <p className="text-sm text-gray-500 mt-2">
                    JPEG, PNG, WebP (max 5MB)
                  </p>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Deskripsi</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Deskripsi lengkap tentang template ini..."
                rows={3}
              />
            </div>
          </div>

          {/* Dynamic Features Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-lg font-semibold">Fitur Template</Label>
              <Button 
                type="button" 
                variant="outline" 
                size="sm" 
                onClick={addFeature}
              >
                <Plus className="w-4 h-4 mr-2" />
                Tambah Fitur
              </Button>
            </div>
            
            <div className="space-y-3">
              {features.length === 0 ? (
                <div className="text-center py-6 border-2 border-dashed rounded-lg">
                  <p className="text-muted-foreground">Belum ada fitur yang ditambahkan</p>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    className="mt-2"
                    onClick={addFeature}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Tambah Fitur Pertama
                  </Button>
                </div>
              ) : (
                features.map((feature, index) => (
                  <div key={feature.id} className="flex items-center gap-2 p-3 border rounded-lg">
                    <GripVertical className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                    <Input
                      value={feature.name}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                      placeholder="Contoh: Responsive Design, Dark Mode, Fast Loading..."
                      className="flex-1"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeFeature(index)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))
              )}
            </div>

            {features.length > 0 && (
              <div className="flex flex-wrap gap-2 p-3 bg-muted/50 rounded-lg">
                <span className="text-sm text-muted-foreground">Preview Badge:</span>
                {features
                  .filter(feature => feature.name.trim() !== '')
                  .map((feature, index) => (
                    <div 
                      key={index}
                      className="px-2 py-1 text-xs bg-primary/10 text-primary rounded border"
                    >
                      {feature.name}
                    </div>
                  ))
                }
                {features.filter(feature => feature.name.trim() !== '').length === 0 && (
                  <span className="text-sm text-muted-foreground">
                    Fitur akan muncul di sini setelah diisi
                  </span>
                )}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2 pt-4 border-t">
            <Button type="submit" disabled={loading || uploading}>
              {loading ? 'Menyimpan...' : uploading ? 'Uploading...' : (template ? 'Update Template' : 'Buat Template')}
            </Button>
            <Button type="button" variant="outline" onClick={onCancel}>
              Batal
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}