package com.revature.models;

import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import java.util.Arrays;

@Entity
@Table( name = "players" )
public class Player {

    @Id
    @GeneratedValue( strategy = GenerationType.AUTO )
    @Column( name = "player_id" )
    private int playerId;

    @Column( name = "money" )
    private double money;

    @ManyToOne( cascade = CascadeType.ALL )
    @JoinColumn( name = "user_id" )
    private User user;

    @ManyToOne( cascade = CascadeType.ALL )
    @JoinColumn( name = "hand" )
    private Card[] card;

    public Player() {
    }

    public Player( int playerId, double money, User user, Card[] card ) {
        this.playerId = playerId;
        this.money = money;
        this.user = user;
        this.card = card;
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

    public Card[] getCard() {
        return card;
    }

    public void setCard( Card[] card ) {
        this.card = card;
    }

    @Override
    public String toString() {
        return "Player{" +
                "playerId=" + playerId +
                ", money=" + money +
                ", user=" + user +
                ", card=" + Arrays.toString(card) +
                '}';
    }
}
