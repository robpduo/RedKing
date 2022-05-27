package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "deck")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "deck_id")
    private int deckId;

    @Column(name = "deck_size")
    private int deckSize;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Player> players;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL )
    @JsonIgnore
    List<Card> cards;

    public Deck() {
        this.cards = new ArrayList<>();
        this.players = new ArrayList<>();
    }

    public Deck( int deckId, int deckSize ) {
        this.deckId = deckId;
        this.deckSize = deckSize;
        this.cards = new ArrayList<>();
        this.players = new ArrayList<>();
    }

    public int getDeckId() {
        return deckId;
    }

    public void setDeckId( int deckId ) {
        this.deckId = deckId;
    }

    public int getDeckSize() {
        return deckSize;
    }

    public void setDeckSize( int deckSize ) {
        this.deckSize = deckSize;
    }

    @Override
    public String toString() {
        return "Deck{" +
                "deckId=" + deckId +
                ", deckSize=" + deckSize +
                ", players=" + players +
                ", cards=" + cards +
                '}';
    }
}
