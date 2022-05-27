package com.revature.controllers;

import com.revature.models.Deck;
import com.revature.models.User;
import com.revature.services.DeckService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/deck")
public class DeckController {

    private DeckService ds;

    @Autowired
    public DeckController( DeckService ds ) {
        this.ds = ds;
    }

    @GetMapping("/shuffle")
    @ResponseBody
    public User handleLogin() {
        Deck deck = ds.initializeDeck();
        return null;
    }
}
