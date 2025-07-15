"use client"
import { reduxStore } from "@/redux";
import { Provider } from "react-redux";


export default function ProviderRedux(props: React.PropsWithChildren) {
    return <Provider store={reduxStore}>{props.children}</Provider>
}