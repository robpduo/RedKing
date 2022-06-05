import React, { useEffect } from 'react'
import { Root } from 'react-dom/client';
import { useDispatch, useSelector } from 'react-redux';
import { clearHands, getDealDealer, getDealPlayer } from '../../Slices/DeckSlice';
import { setWinner, toggleDealerBust, togglePlayerBusted } from '../../Slices/GameSlice';
import { AppDispatch, RootState } from '../../Store';

const NextRound: React.FC = () => {
    const gameState = useSelector((state: RootState) => state.game);
    const deckState = useSelector((state: RootState) => state.deck);
    const dispatch: AppDispatch = useDispatch();

    //when both hands are dealt their initial 2 cards, reset gamestates to enable the hit and stand button
    useEffect(() => {
        if (deckState.playerHand && deckState.dealerHand) { //get past typescript checks
            if (deckState.playerHand.length == 2 && deckState.dealerHand.length == 2 ) {
                dispatch(setWinner("none"));
                if(gameState.isPlayerBusted == true) {
                    dispatch(togglePlayerBusted());
                } else if (gameState.isDealerBusted == true) {
                    dispatch(toggleDealerBust());
                }
            }
        }
    }, [deckState.playerHand, deckState.dealerHand])



    useEffect(() => {
            //if hands are empty, then deal the initial 4 cards
            if (deckState.playerHand && deckState.playerHand?.length == 0 && !gameState.winner.includes("none") ) {
                dispatch(getDealPlayer(deckState.deck?.deckId));
                dispatch(getDealPlayer(deckState.deck?.deckId));
                dispatch(getDealDealer(deckState.deck?.deckId));
                dispatch(getDealDealer(deckState.deck?.deckId));
            }
    }, [deckState.playerHand, deckState.dealerHand]);

    const handleNext = () => { //clearplayer hands
        console.log("next clicked");
        dispatch(clearHands());
    }

    return (
        <>
            {
                gameState.winner.includes("none")
                    ? <button disabled={true}>Next</button>
                    : <button onClick={handleNext}>Next</button>
            }
        </>
    )
}

export default NextRound