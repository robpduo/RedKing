import React from "react";
import { Navbar } from "../../Components/Navbar/Navbar";
import { PlayGame } from "../../Components/PlayGame/PlayGame";


export const PlayGamePage:React.FC = () => {
    return(
        <>
        <Navbar/>
        <PlayGame/>
        </>
    )
}