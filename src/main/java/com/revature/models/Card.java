package com.revature.models;

import javax.persistence.*;

@Entity
@Table( name = "card" )
public class Card {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "card_id" )
    private int cardId;

    private Rank rank;

    private Suit suit;
}
