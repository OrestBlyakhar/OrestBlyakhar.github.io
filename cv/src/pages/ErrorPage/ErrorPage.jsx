import error from "./ErrorPage.module.scss"
import { ButtonHome } from "../../components/RouteHOC"
const ErrorPage = () => {
    return(
        <div className={error.wrapper}>
            <div class={error.mainbox}>
                <div class={error.err}>4O4</div>
                <div class={error.msg}>Maybe this page moved? Got deleted? Is hiding out in quarantine? Never existed in the first place?<p>Let's go<ButtonHome/>and try from there.</p></div>
            </div>
        </div>
    )
}

export default ErrorPage