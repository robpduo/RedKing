package com.revature.models;

import javax.persistence.*;

@Entity
@Table(name = "card")
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "card_id")
    private int cardId;

    @Enumerated(EnumType.ORDINAL)
    private Rank rank;

    @Enumerated(EnumType.ORDINAL)
    private Suit suit;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck_id")
    private Deck deck;

    public Player getPlayer() {
        return player;
    }

    public void setPlayer( Player player ) {
        this.player = player;
    }

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
