package com.revature;

import com.revature.exceptions.InvalidDepositAmount;
import com.revature.exceptions.InvalidEmailOrPasswordException;
import com.revature.exceptions.UserEmailAlreadyExistsException;
import com.revature.models.DepositHelper;
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

import static org.mockito.Mockito.*;


@SpringBootTest
public class UserServiceTest {

    @Mock
    public static UserRepo ur;

    @Autowired
    public static UserService us;

    @Test
    public void testRegisterUser() throws UserEmailAlreadyExistsException {
        us = new UserService(ur);
        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        when(ur.save(Mockito.any())).thenReturn(u);

        Assertions.assertEquals(u, us.registerUser("test@gmail.com", "test_first", "test_last", "test_password", 0));
    }

    @Test
    public void testRegisterUserException() throws UserEmailAlreadyExistsException {
        us = new UserService(ur);
        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        when(ur.findByEmailAndPassword(Mockito.anyString(), Mockito.anyString())).thenReturn(u);

        Assertions.assertThrows(UserEmailAlreadyExistsException.class, () -> {
            User testUser = us.registerUser("test@gmail.com", "test_first", "test_last", "test_password", 0);
        });
    }

    @Test
    public void testLoginUser() throws InvalidEmailOrPasswordException {
        us = new UserService(ur);
        LoginHelper lh = new LoginHelper("test@gmail.com", "test_password");
        User user = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);

        when(ur.findByEmailAndPassword( Mockito.anyString(), Mockito.anyString())).thenReturn(user);
        User testUser = us.loginUser("test@gmail.com", "test_password");
        Assertions.assertEquals(user, testUser);
    }

    @Test
    public void testLoginUserException() throws InvalidEmailOrPasswordException {
        us = new UserService(ur);
        LoginHelper lh = new LoginHelper("test@gmail.com", "test_password");
        User user = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);

        when(ur.findByEmailAndPassword( Mockito.anyString(), Mockito.anyString())).thenReturn(null);
        Assertions.assertThrows(InvalidEmailOrPasswordException.class, () -> {
            User testUser = us.loginUser("test@gmail.com", "test_password");
        });
    }

    @Test
    public void testUpdateUser() {
        us = new UserService(ur);
        User user = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        user.setUserId(1);

        Mockito.when(ur.save(Mockito.any())).thenReturn(user);
        Assertions.assertEquals(user, us.updateUser(user));
    }

    @Test
    public void testDeposit () throws InvalidDepositAmount {
        us = new UserService(ur);
        User user = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        user.setUserId(1);

        DepositHelper dh = new DepositHelper(1, 50);

        Mockito.when(ur.findByUserId(Mockito.anyInt())).thenReturn(user);
        Mockito.when(ur.save(Mockito.any())).thenReturn(user);
        Assertions.assertEquals(50, us.deposit(dh).getMoney());

    }

    @Test
    public void testDepositException () throws InvalidDepositAmount {
        us = new UserService(ur);
        User u = new User("test@gmail.com", "test_first", "test_last", "test_password", 0);
        u.setUserId(1);

        DepositHelper dh = new DepositHelper(1, -1);
        Mockito.when(ur.findByUserId(Mockito.anyInt())).thenReturn(u);
        Mockito.when(ur.save(Mockito.any())).thenReturn(u);

        Assertions.assertThrows(InvalidDepositAmount.class, () -> {
            us.deposit( dh );
        });
    }
}
