export default function ProfileSection({ orders, profile, handleProfileChange }) {
  return (
    <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900">Profile</h1>
          <p className="mt-1 text-xs sm:text-sm text-stone-600 max-w-xl">
            Manage your account details and review your past orders. Changes here stay on this
            device only.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr,1fr] gap-6 items-start">
        <div className="rounded-2xl border border-stone-200 bg-white p-4 sm:p-5">
          <h2 className="text-sm font-semibold text-stone-900 mb-3">Account Settings</h2>
          <div className="space-y-3 text-xs sm:text-sm">
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                value={profile.name}
                onChange={(e) => handleProfileChange('name', e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label className="block text-[11px] font-medium text-stone-600 mb-1" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={profile.email}
                onChange={(e) => handleProfileChange('email', e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            <div>
              <label
                className="block text-[11px] font-medium text-stone-600 mb-1"
                htmlFor="address"
              >
                Shipping Address
              </label>
              <textarea
                id="address"
                rows={3}
                value={profile.address}
                onChange={(e) => handleProfileChange('address', e.target.value)}
                className="w-full rounded-lg border border-stone-300 bg-stone-50 px-3 py-2 text-sm text-stone-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
          </div>
        </div>

        <aside className="rounded-2xl border border-amber-100 bg-amber-50/70 p-4 sm:p-5 text-xs sm:text-sm">
          <h2 className="text-sm font-semibold text-stone-900 mb-3">Recent Orders</h2>
          {orders.length === 0 ? (
            <p className="text-stone-600">No orders yet. Start by placing your first order.</p>
          ) : (
            <ul className="space-y-3">
              {orders.map((order) => (
                <li
                  key={order.id}
                  className="rounded-lg border border-amber-100 bg-white/60 px-3 py-2"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-xs font-semibold text-stone-900">{order.id}</p>
                    <p className="text-[11px] text-stone-500">{order.date}</p>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-600">{order.items.join(', ')}</p>
                  <p className="mt-1 text-xs font-semibold text-amber-700">${order.total.toFixed(2)}</p>
                </li>
              ))}
            </ul>
          )}
        </aside>
      </div>
    </section>
  )
}
