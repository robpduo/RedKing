package com.revature.models;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.List;

@Entity
@Table(name = "deck")
public class Deck {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "deck_id")
    private int deckId;

    @Column(name = "deck_size")
    private int deckSize;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL)
    @JsonIgnore
    List<Player> players;

    @OneToMany(mappedBy = "deck", cascade = CascadeType.ALL )
    @JsonIgnore
    List<Card> cards;

}
