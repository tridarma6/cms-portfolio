import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import { useForm } from '@inertiajs/react'
import { showError } from '../../../utils/sweetalert'

export default function Create() {

  const form = useForm({
    title: '',
    project_type: '',
    position: '',
    slug: '',
    description: '',
    project_url: '',
    published_at: '',
    is_featured: false,
    images: [],
  })

  const [images, setImages] = React.useState([])

  function submit(e) {
    e.preventDefault()

    form.post('/admin/projects', {
      forceFormData: true,
      onError: (errors) => {
        const errorMessages = Object.values(errors).flat().join('\n')
        showError('Validation Failed', errorMessages)
      },
      onSuccess: () => {
        form.reset()
        setImages([])
      },
    })
  }

  /* ================= IMAGE SELECT ================= */
  function handleImageSelect(e) {
    const files = Array.from(e.target.files)

    const mapped = files.map(file => ({
      file,
      caption: '',
      is_primary: false,
    }))

    const updated = [...images, ...mapped]

    setImages(updated)
    form.setData('images', updated)
  }

  /* ================= UPDATE CAPTION ================= */
  function updateImageCaption(index, caption) {
    const updated = [...images]
    updated[index].caption = caption
    setImages(updated)
    form.setData('images', updated)
  }

  /* ================= SET PRIMARY ================= */
  function setPrimaryImage(index) {
    const updated = images.map((img, i) => ({
      ...img,
      is_primary: i === index
    }))

    setImages(updated)
    form.setData('images', updated)
  }

  /* ================= DELETE IMAGE ================= */
  function deleteImage(index) {
    const updated = images.filter((_, i) => i !== index)
    setImages(updated)
    form.setData('images', updated)
  }

  const inputClass =
    'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50'

  const labelClass = 'text-sm text-emerald/70 mb-1'

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">

          <h2 className="text-2xl font-bold text-emerald mb-4">Create Project</h2>

          <form onSubmit={submit} className="space-y-4">

            {/* Title */}
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

            {/* Project Type */}
            <div>
              <div className={labelClass}>Project Type</div>
              <input  
                value={form.data.project_type}  
                onChange={e => form.setData('project_type', e.target.value)}
                placeholder="Project Type"
                className={inputClass}  
              />
            </div>

            {/* Position */}
            <div>
              <div className={labelClass}>Position</div>
              <input
                value={form.data.position}
                onChange={e => form.setData('position', e.target.value)}
                placeholder="Position"
                className={inputClass}
              />
            </div>

            {/* Slug */}
            <div>
              <div className={labelClass}>Slug</div>
              <input
                value={form.data.slug}
                onChange={e => form.setData('slug', e.target.value)}
                placeholder="Slug"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <div className={labelClass}>Short description</div>
              <textarea
                value={form.data.description}
                onChange={e => form.setData('description', e.target.value)}
                placeholder="Short description"
                className={`${inputClass} h-24`}
              />
            </div>

            {/* Project URL */}
            <div>
              <div className={labelClass}>Project URL</div>
              <input
                value={form.data.project_url}
                onChange={e => form.setData('project_url', e.target.value)}
                placeholder="Project URL"
                className={inputClass}
              />
            </div>

            {/* Featured */}
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
                    form.reset()
                    setImages([])
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

                {images.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {images.map((img, idx) => (
                      <div key={idx} className="relative bg-white/5 border border-white/10 rounded-lg p-4">

                        <img
                          src={URL.createObjectURL(img.file)}
                          alt={`Preview ${idx + 1}`}
                          className="w-full h-32 object-cover rounded-lg mb-2"
                        />

                        <input
                          type="text"
                          placeholder="Caption"
                          value={img.caption}
                          onChange={(e) => updateImageCaption(idx, e.target.value)}
                          className={`${inputClass} text-sm`}
                        />

                        <div className="flex items-center gap-2 mt-2">
                          <input
                            type="checkbox"
                            checked={img.is_primary}
                            onChange={() => setPrimaryImage(idx)}
                            className="accent-emerald"
                          />
                          <label className="text-xs text-emerald/70">Primary</label>

                          <button
                            type="button"
                            onClick={() => deleteImage(idx)}
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
                    No images selected yet.
                  </div>
                )}

                {/* Upload */}
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
                      Click to select images
                    </div>
                    <div className="text-xs text-emerald/40">
                      PNG, JPG, GIF up to 10MB each
                    </div>
                  </label>
                </div>

              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

Create.layout = page => <AdminLayout children={page} user={page.props.user} />
