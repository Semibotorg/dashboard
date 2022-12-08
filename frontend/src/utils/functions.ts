import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getGuild, getUser } from "./api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addDashboard, addLoadingDashboard, addUser } from "../store/user/user";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { APIGuild } from "discord-api-types/v10";
import { StateDashboardI } from "./constants";
export function dashboardPageSetup(
  redux: RootState,
  dispatch: Dispatch<AnyAction>,
  params: Readonly<Params<string>>,
  navigate: NavigateFunction,
  location: Location
) {
  const userRedux = redux.user;
  const guildRedux = redux.dashboard;
  const guildReduxCheck = guildRedux.guilds.filter(el => el.id == params.id)[0]
if(!guildReduxCheck){
    getGuild(localStorage.token, params.id!)
    .then((data) => {
        
      dispatch(addDashboard({guilds: [...guildRedux.guilds, data]}))
    })
    .catch((err) => {
      navigate("/");
    });
}
  
  if (!userRedux) {
    getUser(localStorage.token)
      .then((data) => {
        dispatch(addUser(data!));
      })
      .catch((err) => {
        navigate("/");
      });
  }

}
