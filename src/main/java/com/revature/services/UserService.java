//package com.revature.services;
//
//import com.revature.models.User;
//import com.revature.repository.UserRepo;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//
//@Service
//@Transactional
//public class UserService {
//
//    private UserRepo ur;
//
//    @Autowired
//    public UserService(UserRepo ur) {
//        this.ur = ur;
//    }
//
//    public User registerUser(String email, String password, String firstName, String lastName) {
//        User u = new User(email, password, firstName, lastName);
//
//         return ur.save(u);
//    }
//
//}
