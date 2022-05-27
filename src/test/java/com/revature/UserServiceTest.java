package com.revature;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.models.User;
import com.revature.repository.UserRepo;
import com.revature.services.UserService;
import org.junit.Assert;
import org.junit.Before;

import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;


@SpringBootTest
public class UserServiceTest {

    @MockBean
    public static UserRepo ur;

    @Autowired
    public static UserService us;

    @Test
    public void testRegisterUser() {
        UserService us = new UserService(ur);

        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        Mockito.when(ur.save(Mockito.any())).thenReturn(u);
        Assert.assertEquals(u, us.registerUser("test@gmail.com", "test_first", "test_last", "test_password", 0));

    }



}
