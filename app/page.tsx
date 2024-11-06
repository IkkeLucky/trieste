import ClientiForm from "@/components/forms/ClientiForm";
import PasskeyModal from "@/components/PasskeyModal";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home({searchParams}: SearchParamProps) {

  const isAdmin = searchParams.admin === 'true';

  return (
    <div className="flex h-screen max-h-screen">

    {isAdmin && <PasskeyModal/>}

      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
          <Image
            src="/assets/images/barbarablogo.jpg"
            height={1000}
            width={1000}
            alt="clienti"
            className="mb-12 h-[70px] w-fit"
          />

          <ClientiForm />

          <div className="text-14-regular mt-20 flex justify-between">
            <p className="justify-items-end text-dark-600 xl:text-left">
            2024 BBGestore
            </p>
            <Link href="/?admin=true" className="text-green-500">Admin</Link>
          </div>
        </div>
      </section>

      <Image 
        src="/assets/images/barbarab.jpg"
        height={1000}
        width={1000}
        alt="clienti"
        className="side-img max-w-[50%]"
      />
    </div>
  );
}
