import HeroSlider from '../components/HeroSlider.jsx'
import ProductSlider from '../components/ProductSlider.jsx'
import HomeCategoriesPreview from './HomeCategoriesPreview.jsx'
import HomeFeaturedProducts from './HomeFeaturedProducts.jsx'
import HomeTestimonials from './HomeTestimonials.jsx'

export default function HomeSection({
  heroSlides,
  onHeroAction,
  products,
  categories,
  testimonials,
  onViewAllCategories,
  onPickCategory,
  onViewAllProducts,
}) {
  return (
    <section className="bg-white">
      <HeroSlider slides={heroSlides} onPrimaryAction={onHeroAction} />

      <ProductSlider products={products} />

      <HomeCategoriesPreview
        categories={categories}
        onViewAll={onViewAllCategories}
        onPickCategory={onPickCategory}
      />

      <HomeFeaturedProducts products={products} onViewAll={onViewAllProducts} />

      <HomeTestimonials testimonials={testimonials} />
    </section>
  )
}
