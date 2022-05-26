package com.revature.models;

import javax.persistence.*;

@Entity
@Table( name = "deck" )
public class Deck {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "deck_id" )
    private int deckId;

    @OneToMany( cascade = CascadeType.ALL )
    @JoinColumn( name = "players_id" )
    private Player[] players;

    @OneToMany( cascade = CascadeType.ALL )
    @JoinColumn( name = "cards_id" )
    private Card[] cards;

    public Deck() {
    }

    public Deck( int deckId ) {
        this.deckId = deckId;
    }

    public int getDeckId() {
        return deckId;
    }

    public void setDeckId( int deckId ) {
        this.deckId = deckId;
    }

    public Player[] getPlayers() {
        return players;
    }

    public void setPlayers( Player[] players ) {
        this.players = players;
    }

    public Card[] getCards() {
        return cards;
    }

    public void setCards( Card[] cards ) {
        this.cards = cards;
    }

    @Override
    public String toString() {
        return "Deck{" +
                "deckId=" + deckId +
                ", players=" + players +
                ", cards=" + cards +
                '}';
    }
}
