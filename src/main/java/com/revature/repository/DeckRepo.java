package com.revature.repository;

import com.revature.models.Deck;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeckRepo extends JpaRepository<Deck, Integer> {

    public List<Deck> findAll();

}
