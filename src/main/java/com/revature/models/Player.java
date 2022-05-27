package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name = "players")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "player_id")
    private int playerId;

    @Column(name = "money")
    private double money;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "users_id")
    private User user;

    @OneToMany(mappedBy = "player", cascade = CascadeType.ALL)
    @JsonIgnore //ignore getters and setters
    List<Card> hand;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "deck_id")
    private Deck deck;

    public Player() {
        this.hand = new ArrayList<>();
    }

    public Player(int playerId, double money, User user, Deck deck ) {
        this.playerId = playerId;
        this.money = money;
        this.user = user;
        this.deck = deck;
        this.hand = new ArrayList<>();
    }

    public int getPlayerId() {
        return playerId;
    }

    public void setPlayerId( int playerId ) {
        this.playerId = playerId;
    }

    public double getMoney() {
        return money;
    }

    public void setMoney( double money ) {
        this.money = money;
    }

    public User getUser() {
        return user;
    }

    public void setUser( User user ) {
        this.user = user;
    }

    public Deck getDeck() {
        return deck;
    }

    public void setDeck( Deck deck ) {
        this.deck = deck;
    }

    @Override
    public String toString() {
        return "Player{" +
                "playerId=" + playerId +
                ", money=" + money +
                ", user=" + user +
                ", hand=" + hand +
                ", deck=" + deck +
                '}';
    }
}
