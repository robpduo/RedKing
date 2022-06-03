import React, { useState } from "react";
import { Rules } from "../../Components/Rules/Rules";
import { StartGameButton } from "../../Components/StartGameButton/StartGameButton";


export const UserHomePage:React.FC = () => {


    const [showRules, setShowRules] = useState(false);


    const handleShowRules = (event:React.MouseEvent<HTMLButtonElement>) => {
        setShowRules(!showRules);
    }

    return(
        <>
        <div className="user-home-page">
              { <StartGameButton/>}
              {/* {ViewHighScores} */}
               {showRules ? <button className="rules-btn" onClick={handleShowRules}></button>:<Rules/>}
        </div>
        </>
    )
}