"use client"
import AffitoList from "@/components/affitoList";
import { fetchAffito, getFilter, useDispatch, useSelector } from "@/redux";
import { useEffect } from "react";

export default function Home() {
  const dispatch = useDispatch()
  const filter = useSelector(getFilter)
  useEffect(() => {
    dispatch(fetchAffito(filter))
  }, [dispatch, filter]);
  return (
    <>
      <h1>Affito</h1>
      <AffitoList />
    </>
  );
}
