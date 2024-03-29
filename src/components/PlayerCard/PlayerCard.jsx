import React from "react";
import "./PlayerCard.css";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

// Provided with a battletag, PlayerCard will query the API for that account's stats, then render those stats
//  in a card
export default function PlayerCard({ stats }) {
  const history = useHistory();
  const dispatch = useDispatch();

  const myStyle = {
    backgroundImage: `url(${stats.namecard})`,
    backgroundSize: "cover",
  };

  // Remove the user's blizzard account from db
  const removeAccount = () => {
    // Confirm with the user before removing the account
    if (confirm(`Are you sure you want to unlink ${stats.battletag}? This will also remove them from your stacks.`)) {
      dispatch({
        type: "REMOVE_ACCOUNT",
        payload: stats.blizzardID
      });
      // Navigate back to the user page after successful deletion
      history.push("/user");
    }
  };

  // Remove a friend's account from db
  const removeFriend = () => {
    if(confirm(`Are you sure you want to remove ${stats.battletag} as a friend? This will also remove them from your stacks`)){
      dispatch({
        type: 'REMOVE_FRIEND',
        payload: stats.blizzardID
      })
      history.push("/myFriends");
    }
  }

  // Clicking on a playercard will do different things depending on the page
  //  the user is on. This is to handle that.
  const handleClick = () => {
    if (history.location.pathname == "/removeUserAccount") {
      removeAccount();
    } else if (history.location.pathname == "/user" || history.location.pathname == '/myFriends') {
      history.push(`/accountStats/${stats.battletag}`);
    } else if (history.location.pathname == "/removeFriend"){
      removeFriend();
    }
  };

  return (
    // Check to make sure the stats exist, then render the playerCard
    stats && (
      <div className="playerCard" style={myStyle} onClick={handleClick}>
        <div className="playerIcon">
          <img src={stats.avatar} />
        </div>
        <div className="playerTag">{stats.username}</div>
        <div className="roleRanks">
          {/* Check to see if the account has stats from OW's competitive gamemode, then render */}
          {stats.competitive && (
            <>
              {/* Also check each individual role for rank info */}
              {stats.competitive.pc.tank && (
                <>
                  <img
                    className="roleIcon"
                    src={stats.competitive.pc.tank.role_icon}
                  />
                  <img
                    className="rankIcon"
                    src={stats.competitive.pc.tank.rank_icon}
                  />
                </>
              )}
              {stats.competitive.pc.damage && (
                <>
                  <img
                    className="roleIcon"
                    src={stats.competitive.pc.damage.role_icon}
                  />
                  <img
                    className="rankIcon"
                    src={stats.competitive.pc.damage.rank_icon}
                  />
                </>
              )}
              {stats.competitive.pc.support && (
                <>
                  <img
                    className="roleIcon"
                    src={stats.competitive.pc.support.role_icon}
                  />
                  <img
                    className="rankIcon"
                    src={stats.competitive.pc.support.rank_icon}
                  />
                </>
              )}
            </>
          )}
        </div>
        {/* Check to make sure the player has an endorsement level, then render */}
        <div className="endorseIcon">
          {stats.endorsement && <img src={stats.endorsement.frame} />}
        </div>
      </div>
    )
  );
}
