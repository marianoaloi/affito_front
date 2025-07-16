"use client"
import AffitoList from "@/components/affitoList";
import { fetchAffito, useDispatch } from "@/redux";
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
      <h1>Affito</h1>
      <AffitoList />
    </>
  );
}
