import {BrowserRouter, Switch, Route} from "react-router-dom";
import Coin from "./routes/Coin"
import Coins from "./routes/Coins"

interface IRouterProps {
    isDark: boolean;
    // toggleDark 함수의 type
    toggleDark: () => void;
}

function Router({isDark, toggleDark}: IRouterProps) {
    return(
        <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path="/:coinId">
                <Coin />
            </Route>
            <Route path="/">
                <Coins isDark={isDark} toggleDark={toggleDark}/>
            </Route>
        </Switch>
    </BrowserRouter>
    )
}
export default Router;