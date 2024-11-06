import  AppuntamentiForm  from "@/components/forms/AppuntamentiForm";
import { getclienti } from "@/lib/actions/clienti.actions";
import Image from "next/image";
import * as Sentry from '@sentry/nextjs'
import Link from "next/link";

export default async function Newappuntamenti({params: {userId}}: SearchParamProps) {

  const clienti = await getclienti(userId);

  Sentry.metrics.set("user_view_new-appuntamenti", clienti.name);

  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[860px] flex-1 justify-between">
        <Link href="/" className='cursor-pointer'>
          <Image
            src="/assets/images/barbarablogo.jpg"
            height={1000}
            width={1000}
            alt="clienti"
            className="mb-12 h-10 w-fit"
          />
        </Link>

          <AppuntamentiForm 
            type="create"
            userId={userId}
            clientiId={clienti.$id}
          />

            <p className="copyright mt-10 py-12">
            2024 BBGestore
            </p>
            
        </div>
      </section>

      <Image 
        src="/assets/images/appuntamenti-img.png"
        height={1000}
        width={1000}
        alt="appuntamenti"
        className="side-img max-w-[390px] bg-bottom"
      />
    </div>
  );
}
