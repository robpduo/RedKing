import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { AppDispatch, RootState } from '../../Store';
import { ICard } from "../../Interfaces/ICard";
import { access, readlink } from 'fs';

export const ValueCounter: React.FC<any> = (person: number) => {
    //get members of the state needed to calculate values
    const playerHand = useSelector((state: RootState) => state.deck.playerHand);
    const dealerHand = useSelector((state: RootState) => state.deck.dealerHand);
    const [dealerCount, setDealerCount] = useState(0);
    const [playerCount, setPlayerCount] = useState(0);
    //sample hands for testing
    /*let playerHand: ICard[] = [
        {
            rank: 0,
            suit: 0
        },
        {
            rank: 1,
            suit: 1,
        }
    ];

    let dealerHand: ICard[] = [
        {
            rank: 2,
            suit: 2
        },
        {
            rank: 3,
            suit: 3,
        }
    ];*/
    //when the hands change, recalculate and set them
    useEffect(() => {
        setDealerCount(calcVisibleDealerHandValue(dealerHand));
        setPlayerCount(calcHandValue(playerHand));
    }, [playerHand, dealerHand])
    //how the counts are displayed
    return (
        <div className = "allHandValues">
        {person == 0 ? <div className = "playerHandValue"><p>{playerCount}</p> </div> : <div className = "dealerHandValue"><p>{dealerCount}</p> </div>}
        </div>
    );
};
//takes in a card and returns its value
//if the card is an ace, returns 1
export const calcCardValue: (card: ICard) => number = function(
    card: ICard
): number {
    let x = card.rank;
    if (x == 1){
        return 2;
    }else if(x == 2){
        return 3;
    }else if(x == 3){
        return 4;
    }else if(x == 4){
        return 5;
    }else if(x == 5){
        return 6;
    }else if(x == 6){
        return 7;
    }else if(x == 7){
        return 8;
    }else if(x == 8){
        return 9;
    }else if(x == 9){
        return 10;
    }else if(x == 10){
        return 10;
    }else if(x == 11){
        return 10;
    }else if(x == 12){
        return 10;
    }else if(x == 0){
        return 1;
    }else{
        return -1;
    }
};
//takes in a hand and calculates its value
//always chooses most advantageous ace value
export const calcHandValue: (hand: ICard[] | undefined) => number = function(
        hand: ICard[] | undefined
    ): number {
        let value = 0;
        if(hand){
            let aces = 0;
            for (let card of hand){
                let current = calcCardValue(card); 
                if(current == 1){
                    aces++;
                }else{
                    value += current;
                }
            }
            for (let i = 0; i < aces; i++){
                if(value + 11 + (aces - i - 1) > 21){
                    value += 1;
                }else{
                    value += 11;
                }
            }
        }
        return value;
    }
    //calculates what you can see of the dealer's hand
export const calcVisibleDealerHandValue: (hand: ICard[] | undefined) => number = function(
        hand: ICard[] | undefined
    ): number {
        let value = 0;
        if(hand){
            let aces = 0;
            for (let card of hand){
                let index = hand.indexOf(card);
                if (index != 0){
                    let current = calcCardValue(card); 
                    if(current == 1){
                        aces++;
                    }else{
                        value += current;
                    }
                }
            }
            for (let i = 0; i < aces; i++){
                if(value + 11 + (aces - i - 1) > 21){
                    value += 1;
                }else{
                    value += 11;
                }
            }
        }
        return value;
    }