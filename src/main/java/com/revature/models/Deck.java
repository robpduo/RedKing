package com.revature.models;

import javax.persistence.*;

@Entity
@Table( name = "deck" )
public class Deck {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "deck_id" )
    private int deckId;

    @ManyToOne( cascade = CascadeType.ALL )
    @JoinColumn( name = "players_id" )
    private Player[] players;

    @ManyToOne( cascade = CascadeType.ALL )
    @JoinColumn( name = "card_id" )
    private Card[] Card;
}
