import { cn } from '@/lib/utils';

const StatsCard = ({ all, approved, pending, rejected }: {
    all: number;
    approved: number;
    pending: number;
    rejected: number
}) => {
    const stats = [
        {
            label: "Total", count:all, color: "bg-primary/10"
        },
        {
            label: "Pending", count: pending, color: "bg-yellow-500/10"
        },
        {
            label: "Approved", count: approved, color: "bg-green-500/10"
        },
        {
            label: "Rejected", count: rejected, color: "bg-red-500/10"
        }
    ]
    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
            {stats.map((stat) => (
                <div className={cn('status-badge-card', stat.color)} key={stat.label}>
                    <p className='text-sm text-muted-foreground mb-1'>{stat.label}</p>
                    <p className='text-3xl font-bold'>{stat.count}</p>
                </div>
            ))}
        </div>
    )
}

export default StatsCard