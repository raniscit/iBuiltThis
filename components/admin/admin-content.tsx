import AdminProductCard from '@/components/admin/admin-product-card';
import StatsCard from '@/components/admin/stats-card';
import SectionHeader from '@/components/common/section-header';
import { getAllProducts } from '@/lib/products/product-select';
import { auth, currentUser } from '@clerk/nextjs/server';
import { InboxIcon, ShieldCheckIcon } from 'lucide-react';
import { redirect } from 'next/navigation';
import EmptyState from '../common/empty-state';

const AdminContent = async () => {
  const { userId } = await auth();
  if (!userId) {
    redirect("/sign-in");
  }
  const user = await currentUser();

  const isAdmin = user?.publicMetadata?.isAdmin;

  if (!isAdmin) {
    redirect("/");
  }

  const allProducts = await getAllProducts();
  const approvedProducts = allProducts.filter((product) => product.status === "approved");
  const pendingProducts = allProducts.filter((product) => product.status === "pending");
  const rejectedProducts = allProducts.filter((product) => product.status === "rejected");


  return (
    <div className='py-20'>
      <div className="wrapper">
        <div className="mb-12">
          <SectionHeader
            title="Product Admin"
            icon={ShieldCheckIcon}
            description='Review and manage the submitted product' />
        </div>

        <StatsCard
          all={allProducts.length}
          approved={approvedProducts.length}
          pending={pendingProducts.length}
          rejected={rejectedProducts.length}
        />

        <section className='my-12'>
          <div className='section-header-with-count'>
            <h2 className='text-2xl font-bold'>
              Pending Products ({pendingProducts.length})
            </h2>
          </div>

          <div className='space-y-4'>
            {pendingProducts.length === 0 && (
              <div>
                <EmptyState message='No pending products to review' icon={InboxIcon}/>
              </div>
            )}
            {pendingProducts.length>0 && pendingProducts.map((product) => (
              <AdminProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>

        <section className='my-12'>
          <div className='section-header-with-count'>
            <h2 className='text-2xl font-bold'>
              All Products ({allProducts.length})
            </h2>
          </div>

          <div className='space-y-4'>
            {allProducts.length>0 && allProducts.map((product) => (
              <AdminProductCard key={product.id} product={product}/>
            ))}
          </div>
        </section>

      </div>
    </div>
  )
}

export default AdminContent;