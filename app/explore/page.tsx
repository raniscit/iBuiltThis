"use cache"
import SectionHeader from '@/components/common/section-header'
import ProductExplorerComponent from '@/components/products/product-explorer'
import { getAllApprovedProducts } from '@/lib/products/product-select';
import { CompassIcon } from 'lucide-react'

const page = async() => {
    const allProduct = await getAllApprovedProducts();

    return (
        <div className='py-20'>
            <div className='wrapper'>
                <SectionHeader
                    title="Explore All Products"
                    icon={CompassIcon}
                    description='Browse and discover all products 
            shared by our community'/>

                    <ProductExplorerComponent products={allProduct}/>
            </div>
        </div>
    )
}

export default page