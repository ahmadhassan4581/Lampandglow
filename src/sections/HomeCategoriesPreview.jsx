export default function HomeCategoriesPreview({ categories, onViewAll, onPickCategory }) {
  return (
    <section className="w-full px-0 py-10 sm:py-14">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex items-end justify-between gap-4 mb-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-stone-900">
              Shop by Category
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-stone-600">
              Discover lamps, tables, and decor pieces that match your style.
            </p>
          </div>
          <button
            onClick={onViewAll}
            className="hidden sm:inline-flex text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            View all
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onPickCategory(category.id)}
            className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm hover:shadow-md transition-shadow text-left"
          >
            <div className="aspect-[4/3] overflow-hidden">
              <img
                src={category.image}
                alt={category.title}
                className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-3 sm:p-4 flex items-center justify-between gap-2">
              <div>
                <h3 className="text-sm sm:text-base font-semibold text-stone-900">
                  {category.title}
                </h3>
                <p className="mt-1 text-xs text-stone-600">{category.description}</p>
              </div>
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-50 text-amber-700 text-sm font-semibold">
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}
