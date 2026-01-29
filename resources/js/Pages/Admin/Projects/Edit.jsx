import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import { useForm, router } from '@inertiajs/react'
import { showError, showSuccess, showConfirm } from '../../../utils/sweetalert'
import { usePage } from '@inertiajs/react';

export default function Edit({ project }) {
  
  console.log(project);
  
  const form = useForm({
    title: project.title || '',
    slug: project.slug || '',
    description: project.description || '',
    body: project.body || '',
    website_url: project.website_url || '',
    repo_url: project.repo_url || '',
    published_at: project.published_at || '',
    is_featured: project.is_featured || false,
    images: project.images || []
  })

  const [images, setImages] = React.useState(project.images || [])
  const [uploading, setUploading] = React.useState(false)

  function update(field, value) {
    form.setData(field, value)
  }

  /* ================= IMAGE UPLOAD ================= */
  async function handleImageUpload(e) {
    const files = Array.from(e.target.files)
    if (!files.length) return

    const imageForm = new FormData()
    files.forEach(file => imageForm.append('images[]', file))

    router.post(`/admin/projects/${project.id}/images`, imageForm, {
      forceFormData: true,
      onSuccess: async () => {
        await showSuccess('Upload Success', 'Images uploaded successfully.')
        router.reload({ only: ['project'] })
      },
      onError: async () => {
        await showError('Upload Failed', 'Failed to upload images.')
      },
    })
  }


  /* ================= UPDATE CAPTION ================= */
  function updateImageCaption(imageId, caption) {
    router.put(`/admin/projects/${project.id}/images/${imageId}`, { caption }, {
      onSuccess: () => {
        setImages(prev =>
          prev.map(img => img.id === imageId ? { ...img, caption } : img)
        )
      },
      onError: async () => {
        await showError('Update Failed', 'Failed to update image caption.')
      }
    })
  }


  /* ================= SET PRIMARY ================= */
  function setPrimaryImage(imageId) {
    router.put(`/admin/projects/${project.id}/images/${imageId}/primary`, {}, {
      onSuccess: async () => {
        setImages(prev =>
          prev.map(img => ({
            ...img,
            is_primary: img.id === imageId
          }))
        )
        await showSuccess('Success', 'Primary image updated.')
      },
      onError: async () => {
        await showError('Failed', 'Failed to set primary image.')
      }
    })
  }

  /* ================= DELETE IMAGE ================= */
  async function deleteImage(imageId) {
    const result = await showConfirm(
      'Delete Image',
      'Are you sure you want to delete this image?',
      'Delete',
      'Cancel'
    )

    if (!result.isConfirmed) return

    router.delete(`/admin/projects/${project.id}/images/${imageId}`, {
      onSuccess: async () => {
        setImages(prev => prev.filter(img => img.id !== imageId))
        await showSuccess('Deleted', 'Image deleted successfully.')
      },
      onError: async () => {
        await showError('Delete Failed', 'Failed to delete image.')
      }
    })
  }


  /* ================= UPDATE PROJECT ================= */
  function submit(e) {
    e.preventDefault()

    form.put(`/admin/projects/${project.id}`, {
      onSuccess: async () => {
        await showSuccess('Success', 'Project updated successfully.')
        router.visit('/admin/projects')
      },
      onError: async (errors) => {
        const errorMessages = Object.values(errors).flat().join('\n')
        await showError('Update Failed', errorMessages)
      },
    })
  }


  const inputClass =
    'w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-emerald-100 placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/40'

  const labelClass = 'text-sm text-emerald/70 mb-1'

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6 max-w-4xl mx-auto">

        <div className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 text-emerald-50 shadow-xl">

          <h2 className="text-3xl font-bold text-emerald mb-8">
            Edit Project
          </h2>

          <div className="space-y-6">

            {/* Title */}
            <div>
              <label className={labelClass}>Title</label>
              <input
                value={form.data.title}
                onChange={e => update('title', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Slug */}
            <div>
              <label className={labelClass}>Slug</label>
              <input
                value={form.data.slug}
                onChange={e => update('slug', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <label className={labelClass}>Short Description</label>
              <textarea
                value={form.data.description}
                onChange={e => update('description', e.target.value)}
                className={`${inputClass} h-24`}
              />
            </div>

            {/* Body */}
            <div>
              <label className={labelClass}>Body (HTML)</label>
              <textarea
                value={form.data.body}
                onChange={e => update('body', e.target.value)}
                className={`${inputClass} h-40`}
              />
            </div>

            {/* Website URL */}
            <div>
              <label className={labelClass}>Website URL</label>
              <input
                value={form.data.website_url}
                onChange={e => update('website_url', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Repo URL */}
            <div>
              <label className={labelClass}>Repository URL</label>
              <input
                value={form.data.repo_url}
                onChange={e => update('repo_url', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Featured */}
            <div className="flex items-center gap-3 pt-2">
              <input
                type="checkbox"
                checked={form.data.is_featured}
                onChange={e => update('is_featured', e.target.checked)}
                className="accent-emerald scale-125"
              />
              <label className="text-emerald/80">Featured Project</label>
            </div>

            {/* Images */}
            <div>
              <label className={labelClass}>Project Images</label>

              <div className="space-y-4">
                {images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((image, idx) => (
                      <div key={image.id} className="relative bg-white/5 border border-white/10 rounded-lg p-4">
                        <img
                          src={`/storage/${image.filename}`}
                          alt={image.caption || `Image ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />

                        <input
                          type="text"
                          value={image.caption || ''}
                          onChange={(e) => updateImageCaption(image.id, e.target.value)}
                          className={`${inputClass} text-sm`}
                        />

                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            checked={image.is_primary}
                            onChange={() => setPrimaryImage(image.id)}
                            className="accent-emerald"
                          />
                          <label className="text-xs text-emerald/70">Primary</label>

                          <button
                            type="button"
                            onClick={() => deleteImage(image.id)}
                            className="text-red-400 hover:text-red-300 text-xs ml-auto"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-emerald/60 text-sm p-4 bg-white/5 border border-white/10 rounded-lg">
                    No images uploaded yet.
                  </div>
                )}

                {/* Upload */}
                <div className="border-2 border-dashed border-white/20 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    multiple
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label htmlFor="image-upload" className="cursor-pointer">
                    <div className="text-emerald/60 mb-2">Click to upload images</div>
                    <div className="text-xs text-emerald/40">PNG, JPG, GIF up to 10MB each</div>
                  </label>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 pt-6">
              <button
                type="button"
                onClick={submit}
                disabled={form.processing}
                className="px-6 py-2 rounded-lg bg-emerald text-black font-semibold hover:bg-emerald/90 transition disabled:opacity-60"
              >
                {form.processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

Edit.layout = page => <AdminLayout children={page} user={page.props.user} />
