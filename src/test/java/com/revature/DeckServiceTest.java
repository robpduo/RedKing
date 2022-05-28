package com.revature;

import com.revature.models.*;
import com.revature.repository.DeckRepo;
import com.revature.services.DeckService;
import com.revature.services.UserService;
import org.assertj.core.api.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.event.annotation.BeforeTestMethod;

import java.util.ArrayList;
import java.util.List;

@SpringBootTest
public class DeckServiceTest {

    @MockBean
    public static DeckRepo dr;

    @Autowired
    public static DeckService ds;

    @Test
    public void testDeckInitializer() {
        ds = new DeckService(dr);
        Deck testDeck = new Deck();

        //Create a list of 1 card
        List<Card> lCards = new ArrayList<>();
        Card testCard = new Card();
        testCard.setCardId(1);
        testCard.setRank(Rank.ACE);
        testCard.setSuit(Suit.CLOVERS);
        lCards.add(0, testCard);

        //Create a temp user
        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);

        //add user and cards to deck
        testDeck.setCards(lCards);
        testDeck.setUser(u);
        testDeck.setDeckSize(52);

        Mockito.when(dr.save(Mockito.any())).thenReturn(testDeck);
        Assertions.assertEquals(testDeck, ds.initializeDeck(u));
    }
}
