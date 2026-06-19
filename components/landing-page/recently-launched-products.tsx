import SectionHeader from '../common/section-header'
import { CalendarIcon, PlaneIcon } from 'lucide-react'
import ProductCard from '../projects/product-card'
import EmptyState from '../common/empty-state'
import { getRecentlyLaunchedProducts } from '@/lib/products/product-select'



const RecentlyLaunchedProducts = async() => {
    const recentProducts = await getRecentlyLaunchedProducts();
    
    return (
        <section className='py-20'>
            <div className='wrapper'>
                <SectionHeader title="Recently Launched" description="Discover the latest products from our community" icon={PlaneIcon} />

                {recentProducts.length > 0 ? (<div className='grid-wrapper'>
                    {recentProducts.map((product) =>
                        <ProductCard key={product.id} productId  ={product.id} product={product} />)}
                </div>) : (
                    <EmptyState message="No products launched in the last week. Check back soon for new launches."  icon={CalendarIcon}/>
                )}

            </div>
        </section>
    )
}

export default RecentlyLaunchedProducts