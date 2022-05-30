import { stat } from "fs";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IDeck } from "../../Interfaces/IDeck";
import { getDealPlayer, getDealDealer, initializeDeck, getDeck } from "../../Slices/DeckSlice";
import { AppDispatch, RootState } from "../../Store";

export const PlayGame:React.FC<IDeck> = (deck:IDeck) => {


    const dispatch:AppDispatch = useDispatch();
    const deckInfo = useSelector((state:RootState)=> state.deck);
    const userInfo = useSelector((state:RootState)=> state.user);
    const playerHand = useSelector((state:RootState) => state.deck.playerHand);
    const dealerHand = useSelector((state:RootState) => state.deck.dealerHand);
    const [gameStatus, setGameStatus] = useState("Game not initialized");


    const handleGameInit = () => {
        if(gameStatus == "Game not initialized"){
            //init and shuffle deck
            dispatch(initializeDeck);
            
            //retrieve deck from database
            dispatch(getDeck);

            //deals out initial 4 cards to player and dealer 
            dispatch(getDealPlayer);
            dispatch(getDealPlayer);
            dispatch(getDealDealer);
            dispatch(getDealDealer);
            console.log(playerHand);
            console.log(dealerHand);
            setGameStatus("begin");
        } else {
            console.log("game already started");
        }
    }

    const handleHitButton = () => {
        if (userInfo && deckInfo) {
            dispatch(getDealPlayer());
            setGameStatus("Start")
        } else {
            setGameStatus("User not logged in");
            console.log(gameStatus);
        }
    }

    const handleStandButton = () => {

        if (deckInfo && playerHand) {
            dispatch(getDealDealer);
        }

    }

    return(  
    <>
        <div className="game-container">
            { gameStatus.includes("Game not initialized") ? 
            <div className="game-start-btn-container">
                <button className="game-start-btn" onClick={handleGameInit}>Start Game</button>
            </div> : <></>
            }
            { gameStatus.includes("begin") ?
            <>
                <div className="dealer-hand-container">
                    {dealerHand}
                </div>

                <div className="deck-container"></div>

                <div className="player-hand-container">
                    {playerHand}
                    <button className="hit-button" onClick={handleHitButton}>Hit!</button>
                    <button className="stand-button" onClick={handleStandButton}>Stand!</button>
                </div>
            </> : <></>
            }   




        </div>
    </>
    )
}
