package com.revature.controllers;

import com.revature.exceptions.DeckIsEmptyException;
import com.revature.exceptions.NoDeckInPlay;
import com.revature.models.Card;
import com.revature.models.Deck;
import com.revature.models.User;
import com.revature.services.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/deck")
public class DeckController {

    private DeckService ds;

    @Autowired
    public DeckController( DeckService ds ) {
        this.ds = ds;
    }

    @PostMapping("/initialize")
    @ResponseBody
    public Deck handleLogin( @RequestBody User u) {
        return ds.initializeDeck(u);
    }
    
    @CreateMap
    @GetMapping("/deal")
    @ResponseBody
    public Card handleDealCard( @RequestBody Deck deck) throws DeckIsEmptyException {
        return ds.dealCard(deck);
    }

    @GetMapping("/getDeck")
    @ResponseBody
    public Deck handleGetDeck (@RequestBody Deck deck) {
        return ds.getDeck(deck.getDeckId());
    }

    @GetMapping("/getDeckByUID")
    @ResponseBody
    public Deck handleGetDeckByUID (@RequestBody User user) throws NoDeckInPlay {
        return ds.getDeckByUserId(user);
    }

}
