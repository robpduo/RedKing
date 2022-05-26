package com.revature.models;

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

    //many to on relationship
    @OneToOne(cascade = CascadeType.ALL, fetch=FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private int user;

    private Card[] card;

    public Player() {
    }

    public Player( int playerId, double money, int user, Card[] card ) {
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

    public double getUser() {
        return user;
    }

    public void setUser( int user ) {
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
