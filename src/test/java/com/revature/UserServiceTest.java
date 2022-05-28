package com.revature;

import com.revature.models.LoginHelper;
import org.aspectj.lang.annotation.Before;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.MockitoJUnitRunner;
import org.springframework.boot.test.context.SpringBootTest;

import com.revature.models.User;
import com.revature.repository.UserRepo;
import com.revature.services.UserService;


import org.mockito.Mockito;
import org.mockito.MockitoAnnotations;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Stream;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@SpringBootTest
public class UserServiceTest {

    @Mock
    public static UserRepo ur;

    @Autowired
    public static UserService us;

    @Test
    public void testRegisterUser() {
        us = new UserService(ur);
        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        when(ur.save(Mockito.any())).thenReturn(u);

        Assertions.assertEquals(u, us.registerUser("test@gmail.com", "test_first", "test_last", "test_password", 0));
    }

    @Test
    public void testLoginUser() {
        us = new UserService(ur);
        LoginHelper lh = new LoginHelper("test@gmail.com", "test_password");
        User user = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);

        when(ur.findByEmailAndPassword( Mockito.anyString(), Mockito.anyString())).thenReturn(user);
        User testUser = us.loginUser("test@gmail.com", "test_password");
        Assertions.assertEquals(user, testUser);
    }
}
