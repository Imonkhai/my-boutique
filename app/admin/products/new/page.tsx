'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { X, Plus, Save, Send } from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { PageHeader } from '@/components/admin/AdminUI';
import { ADMIN_PRODUCTS } from '@/lib/admin/data';

const schema = z.object({
  name: z.string().min(2, 'Required'),
  shortDescription: z.string().min(5, 'Required'),
  description: z.string().min(10, 'Required'),
  category: z.string().min(1, 'Required'),
  collection: z.string().optional(),
  sku: z.string().min(2, 'Required'),
  brand: z.string().min(1, 'Required'),
  material: z.string().optional(),
  price: z.coerce.number().min(1, 'Required'),
  discountPrice: z.coerce.number().optional(),
  costPrice: z.coerce.number().min(1, 'Required'),
  stock: z.coerce.number().min(0, 'Required'),
  lowStockThreshold: z.coerce.number().min(1).default(5),
  status: z.enum(['active', 'draft', 'archived']),
  featuredImage: z.string().optional().or(z.literal('')),
  tags: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

const inputCls = "w-full border border-slate-200 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:border-[#D4AF37] bg-white placeholder:text-slate-300";
const labelCls = "block text-xs font-semibold text-slate-600 mb-1.5";

export default function NewProductPage() {
  const router = useRouter();
  const [sizes, setSizes] = useState<string[]>(['XS', 'S', 'M', 'L']);
  const [colors, setColors] = useState<string[]>(['#111111', '#D4AF37']);
  const [sizeInput, setSizeInput] = useState('');
  const [colorInput, setColorInput] = useState('#808080');
  const [saved, setSaved] = useState(false);

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { status: 'draft', lowStockThreshold: 5, featuredImage: '' },
  });
  const { register, handleSubmit, formState: { errors }, watch, setValue } = form;

  const handleFeaturedImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setValue('featuredImage', result, { shouldValidate: true, shouldDirty: true });
    };
    reader.readAsDataURL(file);
  };

  const onSubmit = (data: FormData, publish = false) => {
    const newProduct = {
      ...data,
      id: `${ADMIN_PRODUCTS.length + 1}`,
      slug: data.name.toLowerCase().replace(/\s+/g, '-'),
      collection: data.collection ?? 'General',
      material: data.material ?? '',
      sizes, colors,
      images: data.featuredImage ? [data.featuredImage] : [],
      featuredImage: data.featuredImage || '',
      tags: data.tags ? data.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      status: publish ? 'active' as const : data.status,
      rating: 0, reviews: 0, unitsSold: 0, revenue: 0,
      reserved: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    ADMIN_PRODUCTS.push(newProduct);
    setSaved(true);
    setTimeout(() => router.push('/admin/products'), 1000);
  };

  const featuredImage = watch('featuredImage');

  return (
    <AdminShell>
      <PageHeader title="Add New Product" subtitle="Fill in the details to create a new product">
        <button onClick={() => router.push('/admin/products')} className="px-4 py-2 text-sm border border-slate-200 rounded-lg hover:bg-slate-50 text-slate-600">Cancel</button>
      </PageHeader>

      {saved && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700 font-medium">
          ✓ Product saved successfully! Redirecting…
        </div>
      )}

      <form onSubmit={handleSubmit(d => onSubmit(d, false))}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left — main info */}
          <div className="lg:col-span-2 space-y-5">
            {/* Basic Info */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Basic Information</h3>
              <div>
                <label className={labelCls}>Product Name *</label>
                <input {...register('name')} placeholder="e.g. Silk Wrap Dress" className={inputCls} />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Short Description *</label>
                <input {...register('shortDescription')} placeholder="One-line summary" className={inputCls} />
                {errors.shortDescription && <p className="text-red-500 text-xs mt-1">{errors.shortDescription.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Full Description *</label>
                <textarea {...register('description')} rows={4} placeholder="Detailed product description…" className={inputCls + ' resize-none'} />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCls}>Brand *</label>
                  <input {...register('brand')} placeholder="Gift Collection" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Material</label>
                  <input {...register('material')} placeholder="100% Silk" className={inputCls} />
                </div>
              </div>
              <div>
                <label className={labelCls}>Tags (comma separated)</label>
                <input {...register('tags')} placeholder="silk, dress, luxury" className={inputCls} />
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Pricing</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>Price (₦) *</label>
                  <input {...register('price')} type="number" placeholder="285000" className={inputCls} />
                  {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Sale Price (₦)</label>
                  <input {...register('discountPrice')} type="number" placeholder="213750" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Cost Price (₦) *</label>
                  <input {...register('costPrice')} type="number" placeholder="120000" className={inputCls} />
                  {errors.costPrice && <p className="text-red-500 text-xs mt-1">{errors.costPrice.message}</p>}
                </div>
              </div>
            </div>

            {/* Inventory */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Inventory</h3>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className={labelCls}>SKU *</label>
                  <input {...register('sku')} placeholder="GC-DRS-001" className={inputCls} />
                  {errors.sku && <p className="text-red-500 text-xs mt-1">{errors.sku.message}</p>}
                </div>
                <div>
                  <label className={labelCls}>Stock Qty *</label>
                  <input {...register('stock')} type="number" placeholder="20" className={inputCls} />
                </div>
                <div>
                  <label className={labelCls}>Low Stock Alert</label>
                  <input {...register('lowStockThreshold')} type="number" placeholder="5" className={inputCls} />
                </div>
              </div>
            </div>

            {/* Variants */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Variants</h3>
              {/* Sizes */}
              <div>
                <label className={labelCls}>Sizes</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {sizes.map(s => (
                    <span key={s} className="flex items-center gap-1 px-2.5 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                      {s}
                      <button type="button" onClick={() => setSizes(sizes.filter(x => x !== s))}><X size={11} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input value={sizeInput} onChange={e => setSizeInput(e.target.value)} placeholder="Add size (e.g. XL)" className={inputCls + ' flex-1'} />
                  <button type="button" onClick={() => { if (sizeInput.trim()) { setSizes([...sizes, sizeInput.trim()]); setSizeInput(''); } }}
                    className="px-3 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
              {/* Colors */}
              <div>
                <label className={labelCls}>Colors</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {colors.map(c => (
                    <span key={c} className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 rounded-full text-xs font-medium text-slate-700">
                      <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: c }} />
                      {c}
                      <button type="button" onClick={() => setColors(colors.filter(x => x !== c))}><X size={11} /></button>
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <input type="color" value={colorInput} onChange={e => setColorInput(e.target.value)} className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5" />
                  <input value={colorInput} onChange={e => setColorInput(e.target.value)} placeholder="#111111" className={inputCls + ' flex-1'} />
                  <button type="button" onClick={() => { if (colorInput) { setColors([...colors, colorInput]); } }}
                    className="px-3 py-2 bg-slate-100 rounded-lg text-slate-600 hover:bg-slate-200 transition-colors">
                    <Plus size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right — sidebar */}
          <div className="space-y-5">
            {/* Status */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-4">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Status & Visibility</h3>
              <div>
                <label className={labelCls}>Product Status</label>
                <select {...register('status')} className={inputCls}>
                  <option value="draft">Draft</option>
                  <option value="active">Active</option>
                  <option value="archived">Archived</option>
                </select>
              </div>
              <div>
                <label className={labelCls}>Category *</label>
                <select {...register('category')} className={inputCls}>
                  <option value="">Select category</option>
                  {['Dresses','Blazers','Trousers','Bags','Knitwear','Skirts','Coats','Tops'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category.message}</p>}
              </div>
              <div>
                <label className={labelCls}>Collection</label>
                <select {...register('collection')} className={inputCls}>
                  <option value="">None</option>
                  {['Summer Luxe','Autumn Edit','Evening Wear','Workwear Essentials','Premium Collection'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Featured Image */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-semibold text-sm text-slate-800 border-b border-slate-100 pb-3">Featured Image</h3>
              <div>
                <label className={labelCls}>Upload image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFeaturedImageChange}
                  className="block w-full text-sm text-slate-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200"
                />
                {errors.featuredImage && <p className="text-red-500 text-xs mt-1">{errors.featuredImage.message}</p>}
              </div>
              {featuredImage && (
                <div className="relative aspect-square rounded-lg overflow-hidden border border-slate-200">
                  <img src={featuredImage} alt="Preview" className="w-full h-full object-cover" />
                </div>
              )}
              {!featuredImage && (
                <div className="aspect-square rounded-lg border-2 border-dashed border-slate-200 flex items-center justify-center text-slate-300 text-xs">
                  Image preview
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
              <button type="submit" className="w-full flex items-center justify-center gap-2 py-2.5 border border-slate-200 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Save size={15} /> Save Draft
              </button>
              <button type="button" onClick={handleSubmit(d => onSubmit(d, true))}
                className="w-full flex items-center justify-center gap-2 py-2.5 bg-[#111111] text-white rounded-lg text-sm font-medium hover:bg-[#D4AF37] hover:text-[#111111] transition-all">
                <Send size={15} /> Publish Product
              </button>
            </div>
          </div>
        </div>
      </form>
    </AdminShell>
  );
}
