import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { getGuild, getUser } from "../../utils";
import {
  addDashboard,
  addLoadingDashboard,
  addUser,
} from "../../store/user/user";
import { useNavigate, useParams } from "react-router-dom";
import { APIGuild } from "discord-api-types/v10";
import { dashboardPageSetup } from "../../utils/functions";

export function SettingsPage() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const userRedux = useSelector((state: RootState) => state.user);
  const guildRedux = useSelector(
    (state: RootState) =>
      state.dashboard.guilds.filter((el) => el.id == params.id)[0]
  );
  const [loading, setLoading] = useState<boolean>(true);
  const reduxSelector = useSelector((state: RootState) => state);
  useEffect(() => {
    setLoading(true);
    dashboardPageSetup(reduxSelector, dispatch, params, navigate, location);
    setLoading(false);
  }, []);
  return (
    <div>
      <div>
        <div>
          {!guildRedux ? <h1>Loading...</h1> : <h1>{guildRedux.name}</h1>}
        </div>
      </div>
    </div>
  );
}
