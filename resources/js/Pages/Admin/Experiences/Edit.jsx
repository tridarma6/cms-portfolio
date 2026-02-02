import React from 'react'
import AdminLayout from '../Layout/AdminLayout'
import { useForm, Link } from '@inertiajs/react'

export default function Edit({ experience }) {

  const formatDate = (date) => {
    if (!date) return ''
    return date.split('T')[0]
  }

  const form = useForm({
    company: experience.company || '',
    role: experience.role || '',
    description: experience.description || '',
    start_date: formatDate(experience.start_date),
    end_date: formatDate(experience.end_date),
    is_current: experience.is_current || false,
    order: experience.order || 0,
    image: null,
  })

  function submit(e) {
    e.preventDefault()

    form.post(`/admin/experiences/${experience.id}`, {
      forceFormData: true,
      _method: 'put',
    })
  }


  const inputClass =
    'w-full bg-transparent border border-white/6 rounded-md px-3 py-2 text-emerald placeholder-emerald/50 disabled:opacity-40 disabled:cursor-not-allowed'

  const labelClass = 'text-sm text-emerald/70 mb-1'

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6">
        <div className="bg-white/4 border border-white/6 backdrop-blur-md rounded-xl p-6 text-emerald-50 shadow-lg">
          <div className="flex flex-row justify-between">
            <h2 className="text-2xl font-bold text-emerald mb-4">
              Edit Experience
            </h2>
            <Link href='/admin/experiences' className="text-l font-bold text-emerald mb-4 border-2 border-emerald-500 py-2 px-3 rounded-lg">Back</Link>
          </div>

          <form onSubmit={submit} className="space-y-4">

            {/* Company */}
            <div>
              <div className={labelClass}>Company</div>
              <input
                type="text"
                value={form.data.company}
                onChange={e => form.setData('company', e.target.value)}
                placeholder="Company"
                className={inputClass}
              />
            </div>

            {/* Role */}
            <div>
              <div className={labelClass}>Role</div>
              <input
                type="text"
                value={form.data.role}
                onChange={e => form.setData('role', e.target.value)}
                placeholder="Role"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div>
              <div className={labelClass}>Description</div>
              <textarea
                value={form.data.description}
                onChange={e => form.setData('description', e.target.value)}
                placeholder="Description"
                className={`${inputClass} h-28`}
              />
            </div>
            {/* Image */}
            <div>
              <div className={labelClass}>Image</div>

              {/* Preview image lama */}
              {experience.image && !form.data.image && (
                <img
                  src={`/storage/${experience.image}`}
                  alt="Current Image"
                  className="w-40 h-40 object-cover rounded-lg mb-3 border border-white/10"
                />
              )}

              {/* Preview image baru */}
              {form.data.image && (
                <img
                  src={URL.createObjectURL(form.data.image)}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg mb-3 border border-white/10"
                />
              )}

              <input
                type="file"
                accept="image/*"
                onChange={e => form.setData('image', e.target.files[0])}
                className={inputClass}
              />

              {form.errors.image && (
                <div className="text-red-400 text-sm mt-1">
                  {form.errors.image}
                </div>
              )}
            </div>


            {/* Dates */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <div className={labelClass}>Start Date</div>
                <input
                  type="date"
                  value={form.data.start_date}
                  onChange={e => form.setData('start_date', e.target.value)}
                  className={inputClass}
                />
              </div>

              <div>
                <div className={labelClass}>End Date</div>
                <input
                  type="date"
                  value={form.data.end_date}
                  disabled={form.data.is_current}
                  onChange={e => form.setData('end_date', e.target.value)}
                  className={inputClass}
                />
              </div>
            </div>

            {/* Current checkbox */}
            <div className="flex items-center justify-between mt-2">
              <label className="flex items-center gap-2 text-emerald/80">
                <input
                  type="checkbox"
                  checked={form.data.is_current}
                  onChange={e => {
                    form.setData('is_current', e.target.checked)

                    if (e.target.checked) {
                      form.setData('end_date', '')
                    }
                  }}
                  className="accent-emerald"
                />
                <span>Current</span>
              </label>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={form.processing}
                  className="px-4 py-2 bg-emerald text-black rounded-md font-medium disabled:opacity-50"
                >
                  {form.processing ? 'Saving...' : 'Save'}
                </button>

                <button
                  type="button"
                  onClick={() => form.reset()}
                  className="px-3 py-2 border border-white/6 rounded-md text-emerald/80"
                >
                  Reset
                </button>
              </div>
            </div>

          </form>
        </div>
      </div>
    </div>
  )
}

Edit.layout = page => <AdminLayout children={page} user={page.props.user} />
