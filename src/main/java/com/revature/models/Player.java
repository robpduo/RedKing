package com.revature.models;

import org.hibernate.engine.internal.Cascade;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Entity
@Table(name="players")
public class Player {

    @Id
    @GeneratedValue(strategy=GenerationType.AUTO)
    @Column(name="player_id")
    private int playerId;

    @Column(name="money")
    private double money;

    @OneToOne(cascade=CascadeType.ALL)
    @JoinColumn(name="users_id")
    private User user;

//    @ManyToOne( cascade = CascadeType.ALL )
//    @JoinColumn( name = "hand" )
//    List<Card> card;
}
