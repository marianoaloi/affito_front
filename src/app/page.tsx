import { fetchAffito, useDispatch } from "@/redux";
import { affitoActions } from "@/redux/services/affito/affitoSlice";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Home() {
  // const dispatch = useDispatch();
  const [affitoActions,setAffiti] = useState(undefined)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAffito())
  }, [dispatch]);
  return (
    <>
      <a
        className="flex items-center gap-2 hover:underline hover:underline-offset-4"
        href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Image
          aria-hidden
          src="/globe.svg"
          alt="Globe icon"
          width={16}
          height={16}
        />
        Go to nextjs.org →
      </a>
    </>
  );
}
