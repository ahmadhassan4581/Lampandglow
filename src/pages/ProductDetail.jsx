import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import classNames from '../utils/classNames.js'

export default function ProductDetail({ products, onAddToCart, reviews }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const productId = Number(id)
  const product = products.find((p) => p.id === productId)
  const [selectedBulbOption, setSelectedBulbOption] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState('description')
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const productReviews = reviews.filter((r) => r.productId === productId)
  const avgRating =
    productReviews.length === 0
      ? null
      : productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length

  if (!product) {
    return (
      <section className="w-full px-0 py-10 sm:py-14">
        <div className="px-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 hover:text-amber-800"
          >
            <span aria-hidden>←</span>
            Back
          </button>
          <div className="mt-6 rounded-2xl border border-stone-200 bg-white p-6 text-sm text-stone-700">
            Product not found.
          </div>
        </div>
      </section>
    )
  }

  const stock = typeof product.stock === 'number' ? product.stock : 0
  const inStock = stock > 0
  const bulbOptions = Array.isArray(product.bulbOptions) ? product.bulbOptions : []
  const sku = product.sku || `LG-${String(product.id).padStart(4, '0')}`

  const images = useMemo(() => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images
    }
    return [product.image, product.image, product.image]
  }, [product.image, product.images])

  const selectedImage = images[Math.min(activeImageIndex, images.length - 1)]

  const compareAtPrice = typeof product.compareAtPrice === 'number' ? product.compareAtPrice : null
  const hasDiscount = Boolean(compareAtPrice && compareAtPrice > product.price)
  const discountPercent = hasDiscount
    ? Math.round(((compareAtPrice - product.price) / compareAtPrice) * 100)
    : 0

  const productType = product.productType || (product.category === 'Lamps' ? 'Floor lamp' : 'Wood decor')

  const formatPKR = (amount) => `Rs.${Number(amount).toLocaleString('en-PK', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`

  const renderStars = (rating) => {
    const value = Math.round(rating)
    return (
      <div className="flex items-center gap-0.5 text-amber-500" aria-label={`${value} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, idx) => (
          <svg
            key={idx}
            viewBox="0 0 24 24"
            className={classNames('h-4 w-4', idx < value ? 'fill-current' : 'fill-transparent')}
          >
            <path
              stroke="currentColor"
              strokeWidth="1.5"
              d="M12 17.27l-5.18 3.04 1.4-5.81-4.52-3.92 5.95-.5L12 4.5l2.35 5.58 5.95.5-4.52 3.92 1.4 5.81L12 17.27z"
            />
          </svg>
        ))}
      </div>
    )
  }

  const addQuantityToCart = () => {
    if (!inStock) return
    const count = Math.max(1, Math.min(quantity, Math.max(stock, 1)))
    for (let i = 0; i < count; i += 1) {
      onAddToCart(product)
    }
  }

  return (
    <section className="w-full px-0 py-6 sm:py-10">
      <div className="max-w-none mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-[11px] text-stone-500 flex flex-wrap items-center gap-1">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="hover:text-stone-700"
          >
            Home
          </button>
          <span aria-hidden>/</span>
          <span className="hover:text-stone-700">{product.category}</span>
          <span aria-hidden>/</span>
          <span className="text-stone-700">{product.name}</span>
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-start">
          <div>
            <div className="group relative overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md motion-reduce:transform-none motion-reduce:transition-none">
              {hasDiscount && (
                <span className="absolute left-3 top-3 z-10 inline-flex items-center bg-rose-600 px-2 py-1 text-[11px] font-semibold text-white">
                  -{discountPercent}%
                </span>
              )}
              <div className="h-[380px] sm:h-[460px] lg:h-[640px] bg-stone-100">
                <img
                  src={selectedImage}
                  alt={product.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03] motion-reduce:transform-none"
                />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-3 gap-3">
              {images.slice(0, 3).map((src, idx) => (
                <button
                  key={`${src}-${idx}`}
                  type="button"
                  onClick={() => setActiveImageIndex(idx)}
                  className={classNames(
                    'group border bg-white overflow-hidden aspect-[4/3] rounded-xl transition-all duration-200 hover:-translate-y-0.5 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none',
                    idx === activeImageIndex
                      ? 'border-stone-900 ring-1 ring-stone-900'
                      : 'border-stone-200 hover:border-stone-400',
                  )}
                >
                  <img
                    src={src}
                    alt={`${product.name} thumbnail ${idx + 1}`}
                    className={classNames(
                      'h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none',
                      idx === activeImageIndex ? 'opacity-100' : 'opacity-60 hover:opacity-100',
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h1 className="text-lg sm:text-2xl font-semibold tracking-tight text-stone-900">
              {product.name}
            </h1>

            <div className="mt-2 flex items-center gap-2 text-xs text-stone-600">
              {avgRating ? renderStars(avgRating) : renderStars(0)}
              <span className="text-stone-500">
                {productReviews.length} review{productReviews.length === 1 ? '' : 's'}
              </span>
            </div>

            <p className="mt-3 text-xs sm:text-sm text-stone-600 leading-relaxed">
              The {product.name} is an elegant tribute to creativity and craftsmanship, offering a versatile design with endless combinations.
            </p>

            <div className="mt-4 border-t border-stone-200 pt-4 space-y-1 text-xs text-stone-700">
              <div className="flex gap-2">
                <span className="w-24 text-stone-500">SKU:</span>
                <span className="font-medium">{sku}</span>
              </div>
              <div className="flex gap-2">
                <span className="w-24 text-stone-500">Availability:</span>
                <span className={inStock ? 'text-emerald-700 font-medium' : 'text-rose-700 font-medium'}>
                  {inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>
              <div className="flex gap-2">
                <span className="w-24 text-stone-500">Product Type:</span>
                <span className="font-medium">{productType}</span>
              </div>
            </div>

            <div className="mt-4 border-t border-stone-200 pt-4">
              <div className="flex items-end gap-3">
                {hasDiscount ? (
                  <>
                    <p className="text-sm sm:text-base font-semibold text-stone-500 line-through">
                      {formatPKR(compareAtPrice)}
                    </p>
                    <p className="text-lg sm:text-xl font-semibold text-rose-600">
                      {formatPKR(product.price)}
                    </p>
                  </>
                ) : (
                  <p className="text-lg sm:text-xl font-semibold text-stone-900">
                    {formatPKR(product.price)}
                  </p>
                )}
              </div>

              {inStock && (
                <div className="mt-3">
                  <p className="text-xs font-semibold text-rose-600">
                    Please hurry! Only {stock} left in stock
                  </p>
                  <div className="mt-2 h-1.5 w-full bg-stone-200">
                    <div
                      className="h-1.5 bg-emerald-500"
                      style={{ width: `${Math.min(100, Math.max(10, (stock / 20) * 100))}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            {bulbOptions.length > 0 && (
              <div className="mt-5 border-t border-stone-200 pt-4">
                <p className="text-xs font-semibold text-stone-800">Bulb: <span className="font-medium text-stone-600">{selectedBulbOption || 'Included'}</span></p>
                <div className="mt-2 flex items-center gap-2">
                  {['Included', 'Not Include'].map((opt) => {
                    const active = selectedBulbOption
                      ? selectedBulbOption.toLowerCase().includes(opt === 'Included' ? 'with' : 'without')
                      : opt === 'Included'
                    return (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => {
                          if (opt === 'Included') {
                            setSelectedBulbOption(bulbOptions.find((v) => v.toLowerCase().includes('with')) || bulbOptions[0] || '')
                          } else {
                            setSelectedBulbOption(bulbOptions.find((v) => v.toLowerCase().includes('without')) || bulbOptions[1] || '')
                          }
                        }}
                        className={classNames(
                          'px-3 py-2 border text-xs',
                          active ? 'border-stone-900 bg-white' : 'border-stone-300 bg-white text-stone-700 hover:border-stone-500',
                        )}
                      >
                        {opt}
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            <div className="mt-5 border-t border-stone-200 pt-4">
              <p className="text-xs text-stone-700">
                Subtotal: <span className="font-semibold">{formatPKR(product.price * Math.max(1, quantity))}</span>
              </p>

              <p className="mt-4 text-xs font-semibold text-stone-700">Quantity:</p>

              <div className="mt-2 flex items-center gap-3">
                <div className="flex items-center border border-stone-300 bg-white">
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.max(1, prev - 1))}
                    className="h-11 w-11 grid place-items-center text-stone-700 transition-colors hover:bg-stone-50"
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>
                  <div className="h-11 w-12 grid place-items-center text-sm font-medium text-stone-900">
                    {quantity}
                  </div>
                  <button
                    type="button"
                    onClick={() => setQuantity((prev) => Math.min(Math.max(stock, 99), prev + 1))}
                    className="h-11 w-11 grid place-items-center text-stone-700 transition-colors hover:bg-stone-50"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button
                  type="button"
                  className="h-11 w-11 border border-stone-300 grid place-items-center bg-white text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-sm active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
                  aria-label="Share"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M15 8a3 3 0 1 0-2.82-4" />
                    <path d="M6 14a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    <path d="M18 11a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                    <path d="M8.6 15.5l6.8-3" />
                    <path d="M8.6 18.5l6.8 3" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={() => navigate('/wishlist')}
                  className="h-11 w-11 border border-stone-300 grid place-items-center bg-white text-stone-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-sm active:scale-[0.98] motion-reduce:transform-none motion-reduce:transition-none"
                  aria-label="Add to wishlist"
                >
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M12 21s-7-4.35-9.5-8.5C.5 9.5 2.5 6.5 6 6.5c2 0 3.5 1.2 4 2 0.5-0.8 2-2 4-2 3.5 0 5.5 3 3.5 6-2.5 4.15-9.5 8.5-9.5 8.5z" />
                  </svg>
                </button>

                <button
                  type="button"
                  onClick={addQuantityToCart}
                  className={classNames(
                    'h-11 flex-1 border border-stone-900 bg-stone-900 text-white text-xs font-semibold transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-800 hover:shadow-sm active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none',
                    !inStock && 'opacity-50 cursor-not-allowed',
                  )}
                  disabled={!inStock}
                >
                  Add To Cart
                </button>
              </div>

              <button
                type="button"
                onClick={() => {
                  addQuantityToCart()
                  if (!inStock) return
                  navigate('/')
                }}
                className={classNames(
                  'mt-3 h-11 w-full border border-stone-300 bg-white text-xs font-semibold text-stone-900 transition-all duration-200 hover:-translate-y-0.5 hover:bg-stone-50 hover:shadow-sm active:scale-[0.99] motion-reduce:transform-none motion-reduce:transition-none',
                  !inStock && 'opacity-50 cursor-not-allowed',
                )}
                disabled={!inStock}
              >
                Buy It Now
              </button>

              <div className="mt-4 space-y-3 text-[11px] text-stone-600">
                <div className="flex items-start gap-2">
                  <span className="mt-0.5">👁</span>
                  <span>14 customers are viewing this product</span>
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Free Shipping</p>
                  <p className="mt-1">Free standard shipping on orders over 10,000 PKR</p>
                  <p className="mt-1">Estimated to be delivered in 3-5 business days</p>
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Free Returns</p>
                  <p className="mt-1">You have 7 days after receiving your item to request a return.</p>
                </div>
                <div>
                  <p className="font-semibold text-stone-800">Our Promise</p>
                  <p className="mt-1">Built and shipped within 3-5 business days.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-stone-200 pt-6">
          <div className="flex items-center justify-center gap-8 text-sm font-semibold text-stone-700">
            <button
              type="button"
              onClick={() => setActiveTab('description')}
              className={classNames(
                'pb-2 border-b-2 transition-colors duration-200',
                activeTab === 'description' ? 'border-stone-900 text-stone-900' : 'border-transparent hover:text-stone-900',
              )}
            >
              Description
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('shipping')}
              className={classNames(
                'pb-2 border-b-2 transition-colors duration-200',
                activeTab === 'shipping' ? 'border-stone-900 text-stone-900' : 'border-transparent hover:text-stone-900',
              )}
            >
              Shipping
            </button>
          </div>

          {activeTab === 'description' ? (
            <div className="mt-6 max-w-4xl mx-auto text-sm text-stone-700 leading-6">
              <p>
                The {product.name} is an elegant tribute to creativity and craftsmanship, offering a versatile design with endless combinations.
                Handcrafted from solid pine wood, this lightweight yet durable piece is perfect for adding a stylish and functional element to your living space.
              </p>

              <h3 className="mt-8 text-base font-semibold text-stone-900">Key Highlights:</h3>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-sm">
                <li>Versatile design: Endless combinations for a variety of looks.</li>
                <li>Handcrafted: Made from solid wood for durability.</li>
                <li>Artistic appeal: A fun and imaginative tribute to creativity.</li>
                <li>Lightweight construction: Easy to move and adjust.</li>
                <li>Locally sourced materials: Crafted with love and care.</li>
              </ul>

              <h3 className="mt-10 text-base font-semibold text-stone-900">Product Specifications:</h3>
              <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="border border-stone-200 bg-white p-3 text-xs">
                  <p className="text-stone-500">Material</p>
                  <p className="mt-1 font-semibold text-stone-900">Solid Pine Wood</p>
                </div>
                <div className="border border-stone-200 bg-white p-3 text-xs">
                  <p className="text-stone-500">Finish</p>
                  <p className="mt-1 font-semibold text-stone-900">Hand-finished</p>
                </div>
                <div className="border border-stone-200 bg-white p-3 text-xs">
                  <p className="text-stone-500">Category</p>
                  <p className="mt-1 font-semibold text-stone-900">{product.category}</p>
                </div>
                <div className="border border-stone-200 bg-white p-3 text-xs">
                  <p className="text-stone-500">SKU</p>
                  <p className="mt-1 font-semibold text-stone-900">{sku}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-6 max-w-4xl mx-auto text-sm text-stone-700 leading-6">
              <h3 className="text-base font-semibold text-stone-900">Shipping</h3>
              <p className="mt-2">
                Free standard shipping on orders over 10,000 PKR. Orders are typically dispatched within 1-2 business days.
              </p>

              <h3 className="mt-8 text-base font-semibold text-stone-900">Returns</h3>
              <p className="mt-2">
                You have 7 days after receiving your item to request a return. Items must be unused, in original packaging, with tags and proof of purchase.
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
