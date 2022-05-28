package com.revature.services;

import com.revature.repository.PlayerRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service
@Transactional
public class PlayerService {

    private PlayerRepo pr;

    @Autowired
    public PlayerService(PlayerRepo pr) {
        this.pr = pr;
    }





}

