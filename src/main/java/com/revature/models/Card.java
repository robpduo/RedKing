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

    public Card( int cardId, Rank rank, Suit suit ) {
        this.cardId = cardId;
        this.rank = rank;
        this.suit = suit;
    }

    public Card() {
    }

    public int getCardId() {
        return cardId;
    }

    public void setCardId( int cardId ) {
        this.cardId = cardId;
    }

    public Rank getRank() {
        return rank;
    }

    public void setRank( Rank rank ) {
        this.rank = rank;
    }

    public Suit getSuit() {
        return suit;
    }

    public void setSuit( Suit suit ) {
        this.suit = suit;
    }

    @Override
    public String toString() {
        return "Card{" +
                "cardId=" + cardId +
                ", rank=" + rank +
                ", suit=" + suit +
                '}';
    }
}
