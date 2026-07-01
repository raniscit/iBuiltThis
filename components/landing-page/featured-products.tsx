import React from 'react'
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from '@/components/common/section-header';
import { Button } from '../ui/button';
import Link from 'next/link';
import ProductCard from '../products/product-card';
import { getFeaturedProducts } from '@/lib/products/product-select';


const FeaturedProducts = async() => {
  const featuredProducts = await getFeaturedProducts();
  return (
    <section className='py-20 bg-muted/20 '>
      <div className='wrapper '>
        <div className='flex items-center justify-between mb-8'>
          <SectionHeader title="Featured Today" description="Top picks from our community this week" icon={StarIcon} />
          <Link href="/explore"><Button variant="outline" className="hidden sm:flex">View All <ArrowUpRightIcon className='size-4' /> </Button></Link>
        </div>
        <div className='grid-wrapper'>
          {featuredProducts.map((product) =>
            <ProductCard key={product.id} productId={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}
export default FeaturedProducts