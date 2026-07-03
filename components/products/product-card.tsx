import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from '../ui/card'
import { ChevronDownIcon, ChevronUpIcon, StarIcon } from 'lucide-react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn } from '@/lib/utils'
import { InferSelectModel } from 'drizzle-orm'
import { products } from '@/db/schema'
import VotingButton from './voting-button'

type Product = InferSelectModel<typeof products>

const ProductCard = ({ productId, product }:
    {
        productId: number,
        product: Product
    }
) => {

    const hasVoted = false;
    return (
        <div>
            <Link href={`/products/${productId}`}>
                <Card className='group card-hover hover:bg-primary-foreground/10 border-solid border-gray-400 min-h-[200px]'>
                    <CardHeader className='flex-1'>
                        <div className='flex items-start gap-4'>
                            <div className='flex-1 min-w-0'>
                                <div className='flex items-center gap-2'>
                                    <CardTitle className='text-lg group-hover:text-primary transition-colors'>{product.name}</CardTitle>
                                    {product.voteCount > 100 && <Badge className='gap-1 bg-primary text-primary-foreground'><StarIcon className='size-3 fill-current'/> Featured</Badge>}
                                </div>

                                <CardDescription>{product.description}</CardDescription>
                            </div>
                            {/* vote */}
                            <VotingButton hasVoted={hasVoted} voteCount={product.voteCount} productId={product.id}/>
                        </div>
                    </CardHeader>
                    <CardFooter>
                        <div className='flex items-center gap-2'>
                            {product.tags?.map((tag) => (
                                <Badge variant="secondary" key={tag}>{tag}</Badge>
                            ))}
                        </div>

                    </CardFooter>
                </Card>
            </Link>
        </div>
    )
}

export default ProductCard