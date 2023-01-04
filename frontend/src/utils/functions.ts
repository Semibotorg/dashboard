import {
  NavigateFunction,
  Params,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { getGuild, getPremiumStatus, getUser } from "./api";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { addDashboard, addLoadingDashboard, addPremiumGuilds, addUser,  } from "../store/user/user";
import { Dispatch } from "react";
import { AnyAction } from "redux";
import { APIGuild } from "discord-api-types/v10";
import { StateDashboardI } from "./constants";
export function dashboardPageSetup(
  redux: RootState,
  dispatch: Dispatch<AnyAction>,
  params: Readonly<Params<string>>,
  navigate: NavigateFunction,
  location: Location,
  refresh?: {
    user?: boolean,
    guild?: boolean,
    premium?: boolean
  }
) {
  const userRedux = redux.user;
  const guildRedux = redux.dashboard;
  const guildReduxCheck = guildRedux.guilds.filter(el => el.id == params.id)[0]
  const guildPrmeiumRedux = redux.premium;
  const guildPremiumReduxCheck = guildPrmeiumRedux.guilds.filter(el => el.GuildId == params.id)[0]

if(!guildReduxCheck){
    getGuild(localStorage.token, params.id!)
    .then((data) => {
        
      dispatch(addDashboard({guilds: [...guildRedux.guilds, data]}))
    })
    .catch((err) => {
      navigate("/");
    });
}
if(!guildPremiumReduxCheck){
  getPremiumStatus(localStorage.token, params.id!)
  .then((data) => {
      
    dispatch(addPremiumGuilds({guilds: [...guildPrmeiumRedux.guilds, data]}))
  })
  .catch((err) => {
    dispatch(addPremiumGuilds({guilds: [...guildPrmeiumRedux.guilds]}))
  });
}
if(refresh?.premium == true) {
  getPremiumStatus(localStorage.token, params.id!)
  .then((data) => {
      
    dispatch(addPremiumGuilds({guilds: [data]}))
  })
  .catch((err) => {
    dispatch(addPremiumGuilds({guilds: [...guildPrmeiumRedux.guilds]}))
  });
}
if(refresh?.guild == true){
  getPremiumStatus(localStorage.token, params.id!)
  .then((data) => {
      
    dispatch(addPremiumGuilds({guilds: [data]}))
  })
  .catch((err) => {
    dispatch(addPremiumGuilds({guilds: [...guildPrmeiumRedux.guilds]}))
  });
}
if(refresh?.user == true){
  getUser(localStorage.token)
  .then((data) => {
    dispatch(addUser(data!));
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
