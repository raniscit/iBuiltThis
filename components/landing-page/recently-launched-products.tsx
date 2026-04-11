import SectionHeader from '../common/section-header'
import { CalendarIcon, PlaneIcon } from 'lucide-react'
import ProductCard from '../projects/product-card'
import EmptyState from '../common/empty-state'

const recentProducts = [
    {
        id: 1,
        name: "ParityKit",
        description: "Price parity for global SaaS products",
        tags: ["SaaS", "Pricing", "Global"],
        votes: 615,
        isFeatured: true
    },
    {
        id: 2,
        name: "Developer to Leader",
        description: "A  course on Engineering Leadership",
        tags: ["Course", "leadership"],
        votes: 503,
        isFeatured: true
    },
    {
        id: 3,
        name: "ProfyBubble",
        description: "Social proof motifications that convert visitors",
        tags: ["Marketing", "Saas", "Conversion"],
        votes: 531,
        isFeatured: true
    }
]


const RecentlyLaunchedProducts = () => {
    return (
        <section className='py-20'>
            <div className='wrapper'>
                <SectionHeader title="Recently Launched" description="Discover the latest products from our community" icon={PlaneIcon} />

                {recentProducts.length > 0 ? (<div className='grid-wrapper'>
                    {recentProducts.map((product) =>
                        <ProductCard key={product.id} product={product} />)}
                </div>) : (
                    <EmptyState message="No products launched in the last week. Check back soon for new launches."  icon={CalendarIcon}/>
                )}

            </div>
        </section>
    )
}

export default RecentlyLaunchedProducts