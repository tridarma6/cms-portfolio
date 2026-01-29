import React from 'react';
import AdminLayout from '../Layout/AdminLayout';
import { useForm } from '@inertiajs/react';
import { showError } from '../../../utils/sweetalert';

export default function Create() {

  const form = useForm({
    title: '',
    slug: '',
    description: '',
    body: '',
    website_url: '',
    repo_url: '',
    published_at: '',
    is_featured: false,
    images: [],
  });

  const [selectedImages, setSelectedImages] = React.useState([]);

  function submit(e) {
    e.preventDefault();

    form.post('/admin/projects', {
      forceFormData: true, // 🔥 penting untuk upload file
      onError: (errors) => {
        const errorMessages = Object.values(errors).flat().join('\n');
        showError('Validation Failed', errorMessages);
      },
      onSuccess: () => {
        form.reset();
        setSelectedImages([]);
      },
    });
  }

  function handleImageSelect(e) {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
    form.setData('images', files);
  }

  const inputClass = 'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50';
  const labelClass = 'text-sm text-emerald/70 mb-1';

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <h2 className="text-2xl font-bold text-emerald mb-4">Create Project</h2>

          <form onSubmit={submit} className="space-y-4">

            <div>
              <div className={labelClass}>Title</div>
              <input
                value={form.data.title}
                onChange={e => form.setData('title', e.target.value)}
                placeholder="Title"
                className={inputClass}
                required
              />
              {form.errors.title && <div className="text-red-400 text-sm">{form.errors.title}</div>}
            </div>

            <div>
              <div className={labelClass}>Slug</div>
              <input
                value={form.data.slug}
                onChange={e => form.setData('slug', e.target.value)}
                placeholder="Slug"
                className={inputClass}
              />
            </div>

            <div>
              <div className={labelClass}>Short description</div>
              <textarea
                value={form.data.description}
                onChange={e => form.setData('description', e.target.value)}
                placeholder="Short description"
                className={`${inputClass} h-24`}
              />
            </div>

            <div>
              <div className={labelClass}>Body (HTML)</div>
              <textarea
                value={form.data.body}
                onChange={e => form.setData('body', e.target.value)}
                placeholder="Body"
                className={`${inputClass} h-40`}
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className={labelClass}>Website URL</div>
                <input
                  value={form.data.website_url}
                  onChange={e => form.setData('website_url', e.target.value)}
                  placeholder="Website URL"
                  className={inputClass}
                />
              </div>
              <div>
                <div className={labelClass}>Repo URL</div>
                <input
                  value={form.data.repo_url}
                  onChange={e => form.setData('repo_url', e.target.value)}
                  placeholder="Repo URL"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-emerald/80">
                <input
                  type="checkbox"
                  checked={form.data.is_featured}
                  onChange={e => form.setData('is_featured', e.target.checked)}
                  className="accent-emerald"
                />
                <span>Featured</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={form.processing}
                  className="px-4 py-2 bg-emerald text-black rounded-md font-medium disabled:opacity-60"
                >
                  {form.processing ? 'Creating...' : 'Create'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    form.reset();
                    setSelectedImages([]);
                  }}
                  className="px-3 py-2 border border-white/6 rounded-md text-emerald/80"
                >
                  Reset
                </button>
              </div>
            </div>

            {/* Images */}
            <div>
              <div className={labelClass}>Project Images</div>
              <div className="space-y-4">

                {selectedImages.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {selectedImages.map((file, idx) => (
                      <div key={idx} className="relative bg-white/5 border border-white/10 rounded-lg p-4">
                        <img
                          src={URL.createObjectURL(file)}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />
                        <div className="text-xs text-emerald/70">
                          {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-emerald/60 text-sm p-4 bg-white/5 border border-white/10 rounded-lg">
                    No images selected yet.
                  </div>
                )}

                {/* Image Upload */}
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-emerald/60 mb-2">
                      <svg className="w-8 h-8 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Click to select images
                    </div>
                    <div className="text-xs text-emerald/40">PNG, JPG, GIF up to 10MB each</div>
                  </label>
                </div>

              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
}

Create.layout = page => <AdminLayout children={page} user={page.props.user} />;
