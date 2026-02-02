export default function HomeTestimonials({ testimonials }) {
  return (
    <section className="w-full px-0 py-10 sm:py-14">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6">
          <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900">
            Happy Customers
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            Hear from customers who brought Lamp &amp; Glow pieces into their homes.
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {testimonials.map((t) => (
          <figure
            key={t.id}
            className="flex flex-col rounded-2xl border border-amber-100 bg-amber-50/60 p-4 sm:p-5 shadow-sm"
          >
            <div className="flex items-center gap-2 mb-2">
              <div className="h-9 w-9 rounded-full bg-amber-500/90 text-white flex items-center justify-center text-sm font-semibold">
                {t.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-semibold text-stone-900">{t.name}</p>
                <p className="text-[11px] text-stone-600">Verified buyer</p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-stone-800 flex-1">{t.text}</p>
            <div className="mt-3 text-[11px] text-amber-700">★★★★★</div>
          </figure>
        ))}
      </div>
    </section>
  )
}
