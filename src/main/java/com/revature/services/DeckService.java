package com.revature.services;

import com.revature.models.*;
import com.revature.repository.DeckRepo;
import com.revature.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
@Transactional
public class DeckService {
    private DeckRepo dr;

    @Autowired
    public DeckService(DeckRepo dr) {
        this.dr = dr;
    }

    public Deck initializeDeck(User user) {
        Deck deck = new Deck();
        List<Card> lCards= new ArrayList<>();

        for (Suit suit: Suit.values()) {
            for(Rank rank: Rank.values()) {
                lCards.add(new Card(rank, suit));
            }
        }

        Collections.shuffle(lCards);

        deck.setCards(lCards);
        deck.setUser(user);
        deck.setDeckSize(52);

        return dr.save(deck);
    }
}
