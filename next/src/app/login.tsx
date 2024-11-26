import { Login as DashboardPage } from "@nextep/mitosis/library/packages/react/src/v1/components/pages/Dashboard";


export default function Dashboard(props:any) {
    return (
        (<><DashboardPage dispatchService={props.dispatchService}></DashboardPage></>)
    )
}
