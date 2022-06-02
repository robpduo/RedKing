import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDealPlayer } from "../../Slices/DeckSlice";
import { AppDispatch, RootState } from "../../Store";


export const HitButton:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const deckInfo = useSelector((state:RootState) => state.deck);
    const playerHand = useSelector((state: RootState) => state.deck.playerHand);
    const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
    const [gameStatus, setGameStatus] = useState("Game not initialized");
    const dispatch:AppDispatch = useDispatch();
    const navigator = useNavigate();


    const handleHitButton = () => {
          if (userInfo && deckInfo) {
            dispatch(getDealPlayer());
            setGameStatus("Start");
          } else {
            setGameStatus("User not logged in");
            console.log(gameStatus);
          }
        }


    return(
        <>
        <button className="hit-button" onClick={handleHitButton}>Hit!</button>
        </>
    )
}