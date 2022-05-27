package com.revature.services;

import com.revature.models.*;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class DeckService {

    public Deck initializeDeck() {
        Deck deck = new Deck();
        List<Card> lCards= new ArrayList<>();

        for (Suit suit: Suit.values()) {
            for(Rank rank: Rank.values()) {
                lCards.add(new Card(rank, suit));
            }
        }

        Collections.shuffle(lCards);
        deck.setCards(lCards);
        return deck;
    }
}
