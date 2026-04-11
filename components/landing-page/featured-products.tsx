import React from 'react'
import { ArrowUpRightIcon, StarIcon } from "lucide-react";
import SectionHeader from '@/components/common/section-header';
import { Button } from '../ui/button';
import Link from 'next/link';
import ProductCard from '../projects/product-card';

const Products = [
  {
    id:1 ,
    name: "ParityKit",
    description: "Price parity for global SaaS products",
    tags: ["SaaS","Pricing","Global"],
    votes: 615,
    isFeatured: true
  },
  {
    id:2,
    name: "Developer to Leader",
    description: "A  course on Engineering Leadership",
    tags: ["Course", "leadership"],
    votes: 503,
    isFeatured: true
  },
  {
    id:3,
    name: "ProfyBubble",
    description: "Social proof motifications that convert visitors",
    tags: ["Marketing","Saas","Conversion"],
    votes: 531,
    isFeatured: true
  }
]
const FeaturedProducts = () => {
  return (
    <section className='py-20 bg-muted/20 '>
      <div className='wrapper '>
        <div className='flex items-center justify-between mb-8'>
          <SectionHeader title="Featured Today" description="Top picks from our community this week" icon={StarIcon} />
          <Link href="/explore"><Button variant="outline" className="hidden sm:flex">View All <ArrowUpRightIcon className='size-4' /> </Button></Link>
        </div>
        <div className='grid-wrapper'>
          {Products.map((product) =>
            <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </section>
  )
}
export default FeaturedProducts