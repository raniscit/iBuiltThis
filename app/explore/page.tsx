import SectionHeader from '@/components/common/section-header'
import ProductExplorerComponent from '@/components/products/product-explorer'
import { getAllApprovedProducts } from '@/lib/products/product-select';
import { CompassIcon } from 'lucide-react'
import { Suspense } from "react";

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

                <Suspense fallback={<div>Loading products...</div>}>
                    <ProductExplorerComponent products={allProduct}/>
                </Suspense>
            </div>
        </div>
    )
}

export default page