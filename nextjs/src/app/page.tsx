'use client'

import { MainPage } from "@mitosis/library-react/src";
import { useSearchParams } from "next/navigation";

export default function Page() {

    const searchParams = useSearchParams()

    return <MainPage searchParams={searchParams}></MainPage>
}