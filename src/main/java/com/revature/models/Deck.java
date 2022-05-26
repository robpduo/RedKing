//package com.revature.models;
//
//import javax.persistence.*;
//import java.util.List;
//
//@Entity
//@Table( name = "deck" )
//public class Deck {
//
//    @Id
//    @GeneratedValue( strategy = GenerationType.AUTO )
//    @Column( name = "deck_id" )
//    private int deckId;
//
//    @ManyToOne( cascade = CascadeType.ALL )
//    @JoinColumn( name = "players_id" )
//    List<Player> players;
//
//    @ManyToOne( cascade = CascadeType.ALL )
//    @JoinColumn( name = "cards_id" )
//    List<Card> cards;
//
//}
