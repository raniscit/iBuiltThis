import { products } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { Card, CardDescription, CardFooter, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Trash2Icon } from 'lucide-react';
import AdminAction from './admin-action';


type Product = InferSelectModel<typeof products>

const AdminProductCard = ({
    product
}: {
    product: Product;
}) => {
    return (
        <Card className='border rounded-lg p-6 bg-background hover:shadow-md transition-shadow'>


            <div className='flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6'>
                <div className='flex-1 min-w-0 space-y-3'>
                    <CardTitle className='text-xl font-semibold'>{product.name}</CardTitle>
                    <CardDescription className='flex flex-col gap-4'>
                        {product.tagline}
                        <div className='flex items-center gap-2'>
                            {product.tags?.map((tag) => (
                                <Badge variant="secondary" key={tag}>{tag}</Badge>
                            ))}
                        </div>

                        <div className='flex gap-x-4 gap-y-2 text-sm text-muted-foreground'>

                            <p><span className='font-bold'>By: </span>{product.submittedBy}</p>
                            <p>{product.createdAt?.toLocaleDateString()}</p>
                            <p>
                                <a href={product.websiteUrl ?? ""} target='_blank' rel='noopener noreferrer'>
                                    Visit Website
                                </a>
                            </p>

                        </div>
                    </CardDescription>

                    <CardFooter className='my-1 py-2'>
                        <Button variant={"outline"}><Trash2Icon className='size-4' /> Delete</Button>
                    </CardFooter>

                </div>
                <div className='lg:shrink-0 mb-6'>
                    <AdminAction status={product.status ?? ""} productId={product.id}/>
                </div>
            </div>
        </Card>
    )
}

export default AdminProductCard