
import StatCard from '@/components/StatCard'
import {columns} from '@/components/table/columns'
import {DataTable} from '@/components/table/DataTable'
import { getRecentappuntamentiiList } from '@/lib/actions/appuntamenti.actions'
import Image from 'next/image'
import Link from 'next/link'


const Admin = async () => {

  const appuntamentii = await getRecentappuntamentiiList()

  return (
    <div className='mx-auto flex max-w-7xl flex-col space-y-14'>
      <header className='admin-header'>
        <Link href="/" className='cursor-pointer'>
            <Image 
                src="/assets/images/barbarablogo.jpg"
                alt='Logo'
                width={162}
                height={32}
                className='h-8 w-fit'
            />
        </Link>

        <p className='text-16-semibold'>Admin Dashboard</p>
      </header>

      <main className='admin-main'>
        <section className='w-full space-y-4'>
            <h1 className='header'>Benvenuto -FACOLTATIVO-</h1>
            <p className='text-dark-700'>Sistematizza nuovi appuntamenti -FACOLTATIVO-</p>
        </section>

        <section className='admin-stat'>
            <StatCard 
                type="appuntamentii"
                count={appuntamentii.scheduledCount}
                label="Scheduled appuntamenti"
                icon="/assets/icons/appuntamentii.svg"
            />
            <StatCard 
                type="pending"
                count={appuntamentii.pendingCount}
                label="Pending appuntamenti"
                icon="/assets/icons/pending.svg"
            />
            <StatCard 
                type="cancelled"
                count={appuntamentii.cancelledCount}
                label="Cancelled appuntamenti"
                icon="/assets/icons/cancelled.svg"
            />
        </section>

        <DataTable columns={columns} data={appuntamentii.documents} />
      </main>
    </div>
  )
}

export default Admin
