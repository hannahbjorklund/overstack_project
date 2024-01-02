import React from "react";

export default function PlayerCard({stats}){
    const myStyle = {
        backgroundImage: `url(${stats.namecard})`,
        backgroundSize: "auto",
      };
    
    return (
        // Check to make sure the stats exist, then render the playerCard
        stats && (
            <div className="playerCard" style={myStyle}>
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
            <div className="endorseIcon">
                <img src={stats.endorsement.frame} />
            </div>
            </div>
        )
    );
}