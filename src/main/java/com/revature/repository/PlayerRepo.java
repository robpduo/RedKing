package com.revature.repository;

import com.revature.models.Player;
import com.revature.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlayerRepo extends JpaRepository<Player, Integer> {

    public List<Player> findByUser(User u);
    public List<Player> findAll();

}
