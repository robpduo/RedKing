import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getDealDealer, getDealPlayer } from "../../Slices/DeckSlice";
import { AppDispatch, RootState } from "../../Store";
import { ValueCounter, calcCardValue, calcHandValue, calcVisibleDealerHandValue } from "../ValueCounter/ValueCounter";


export const HitButton:React.FC = () => {

    const userInfo = useSelector((state:RootState) => state.user);
    const deckInfo = useSelector((state:RootState) => state.deck);
    const playerHand = useSelector((state: RootState) => state.deck.playerHand);
    const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
    const [gameStatus, setGameStatus] = useState("Game not initialized");
    const [dealerCount, setDealerCount] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);
    const [isDealersTurn, setIsDealersTurn] = useState(false);
    const [isDealerBusted, setIsDealerBusted] = useState(false);
    const [isHandComplete, setIsHandComplete] = useState(true);
    const [isBlackjack, setIsBlackJack] = useState(false);
    const [isPlayerBusted, setIsPlayerBusted] = useState(false);
    const [winner, setWinner] = useState("");
    const dispatch:AppDispatch = useDispatch();
    const navigator = useNavigate();

    useEffect(() => {
      setDealerCount(calcVisibleDealerHandValue(dealerHand));
      setPlayerCount(calcHandValue(playerHand));

      if(dealerCount > 21) {
        setIsDealerBusted(true);
        setWinner("player");
        setIsHandComplete(true);
        setGameStatus("player turn");
      }
      if(dealerCount >= 17 && dealerCount < 22 && isDealersTurn) {
        if(dealerCount > playerCount) {
          setWinner("dealer");
          setIsHandComplete(true);
          setGameStatus("player turn");
        }
        if(dealerCount < playerCount && !isPlayerBusted) {
          setWinner("player");
          setIsHandComplete(true);
          setGameStatus("player turn");
        }
        if(dealerCount === playerCount && !isPlayerBusted) {
          setWinner("push");
          setIsHandComplete(true);
          setGameStatus("player turn");
        }
      }
      if(dealerCount < 17 && isDealersTurn && !isPlayerBusted) {
        setTimeout(() => {
          dispatch(getDealDealer());
        }, 500);
        setGameStatus("dealer turn");
      }




  }, [playerHand, dealerHand]);



    const handleHitButton = () => {
          if (userInfo && deckInfo) {
            setIsHandComplete(false);
            dispatch(getDealPlayer());
            setGameStatus("player turn");
              if(playerCount > 21){
                  setIsPlayerBusted(true);
                  setIsDealersTurn(true);
                  setGameStatus("dealer turn");
                  setIsHandComplete("true");
                  setWinner("dealer");
              }
          }
          else {
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
