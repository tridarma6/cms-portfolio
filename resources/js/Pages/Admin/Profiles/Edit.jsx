import React from 'react'
import { useForm } from '@inertiajs/react'
import AdminLayout from '../Layout/AdminLayout'
import { route } from 'ziggy-js'

export default function Edit({ profile }) {

  const { data, setData, put, processing, errors } = useForm({
    name: profile?.name ?? '',
    title: profile?.title ?? '',
    bio: profile?.bio ?? '',
    avatar: profile?.avatar ?? '',
    social_links: profile?.social_links ?? [],
  })

  function addSocialLink() {
    setData('social_links', [...data.social_links, ''])
  }

  function updateSocialLink(index, value) {
    const links = [...data.social_links]
    links[index] = value
    setData('social_links', links)
  }

  function removeSocialLink(index) {
    setData(
      'social_links',
      data.social_links.filter((_, i) => i !== index)
    )
  }

  function submit(e) {
    e.preventDefault()

    put('/admin/profile', {
      preserveScroll: true,
    })
  }


  const inputClass =
    'w-full bg-transparent border border-white/10 rounded-lg px-4 py-2 text-emerald-100 placeholder-emerald/40 focus:outline-none focus:ring-2 focus:ring-emerald/40'

  const labelClass = 'text-sm text-emerald/70 mb-1'

  return (
    <div className="relative min-h-[60vh]">
      <div className="relative z-10 p-6 max-w-4xl mx-auto">

        <form
          onSubmit={submit}
          action='#'
          method='POST'
          className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-8 text-emerald-50 shadow-xl"
        >
          <h2 className="text-3xl font-bold text-emerald mb-8">
            Edit Profile
          </h2>

          <div className="space-y-6">

            {/* Name */}
            <div>
              <label className={labelClass}>Name</label>
              <input
                value={data.name}
                onChange={e => setData('name', e.target.value)}
                className={inputClass}
              />
              {errors.name && <p className="text-red-400 text-sm">{errors.name}</p>}
            </div>

            {/* Title */}
            <div>
              <label className={labelClass}>Title</label>
              <input
                value={data.title}
                onChange={e => setData('title', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Bio */}
            <div>
              <label className={labelClass}>Bio</label>
              <textarea
                value={data.bio}
                onChange={e => setData('bio', e.target.value)}
                className={`${inputClass} h-24`}
              />
            </div>

            {/* Avatar */}
            <div>
              <label className={labelClass}>Avatar URL</label>
              <input
                value={data.avatar}
                onChange={e => setData('avatar', e.target.value)}
                className={inputClass}
              />
            </div>

            {/* Social Links */}
            <div>
              <label className={labelClass}>Social Links</label>

              {data.social_links.map((link, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    value={link}
                    onChange={e => updateSocialLink(index, e.target.value)}
                    className={`${inputClass} flex-1`}
                  />
                  <button
                    type="button"
                    onClick={() => removeSocialLink(index)}
                    className="px-3 py-2 bg-red-600 text-white rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={addSocialLink}
                className="px-4 py-2 bg-emerald text-black rounded-lg"
              >
                Add Social Link
              </button>
            </div>

            {/* Submit */}
            <div className="flex justify-end pt-6">
              <button
                type="submit"
                disabled={processing}
                className="px-6 py-2 rounded-lg bg-emerald text-black font-semibold disabled:opacity-60"
              >
                {processing ? 'Saving...' : 'Save Changes'}
              </button>
            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

Edit.layout = page => (
  <AdminLayout user={page.props.user}>
    {page}
  </AdminLayout>
)
