import { Button } from '@/components/ui/button';
import { servizii } from '@/constants';
import { getappuntamenti } from '@/lib/actions/appuntamenti.actions';
import { formatDateTime } from '@/lib/utils';
import Image from 'next/image'
import Link from 'next/link'
import * as Sentry from '@sentry/nextjs'
import { getUser } from '@/lib/actions/clienti.actions';


const Success = async ({params: {userId}, searchParams}: SearchParamProps) => {
  
  const appuntamentiId = (searchParams?.appuntamentiId as string) || '';
  const appuntamenti = await getappuntamenti(appuntamentiId)
  const servizi = servizii.find((doc) => doc.name === appuntamenti.primaryPhysician)
  const user = await getUser(userId)

  Sentry.metrics.set("user_view_appuntamenti-success", user.name);
  
  return (
    <div className="flex h-screen max-h-screen px-[5%]">
      <div className="success-img">
        <Link href='/'>
          <Image 
            src="/assets/images/barbarablogo.jpg"
            width={1000}
            height={1000}
            alt="logo"
            className="h-10 w-fit"
          />
        </Link>

        <section className="flex flex-col items-center">
          <Image 
            src="/assets/gifs/success.gif"
            alt="success"
            height={300}
            width={280}
          />

        <h2 className="header mb-6 max-w-[600px] text-center">
          La tua <span className="text-green-500">richiesta di appuntamento</span> ha stato presa correttamente!
        </h2>

        <p>Stiamo in contatto prontamente per confermare</p>

        </section>

        <section className="request-details">
          <p>Dettagli di appuntamento:</p>
          <div className="flex items-center gap-3">
            <Image 
              src={servizi?.image!}
              alt='servizi'
              width={100}
              height={100}
              className='size-6'
            />

            <p className='whitespace-nowrap'>. {servizi?.name}</p>
          </div>
          <div className='flex gap-2'>
            <Image 
              src="/assets/icons/calendar.svg"
              height={24}
              width={24}
              alt='calendar'
            />
            <p>{formatDateTime(appuntamenti.schedule).dateTime}</p>
          </div>
        </section>

        <Button variant="outline" className="shad-primary-btn" asChild >
          <Link href={`/clientii/${userId}/new-appuntamenti`}>
            New appuntamenti
          </Link>
        </Button>
          <p className='copyright'>2024 BBGestore</p>
      </div>
    </div>
  )
}

export default Success
