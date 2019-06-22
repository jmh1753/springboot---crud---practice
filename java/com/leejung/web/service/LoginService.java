package com.leejung.web.service;

import java.util.List;

import com.leejung.web.domain.LoginDTO;

import org.springframework.stereotype.Component;

/**
 * LoginService
 */
@Component
public interface LoginService {

    public LoginDTO login(LoginDTO login);

    public void updateUser(LoginDTO user);

    public int deleteUser(LoginDTO user);
    
    public List<LoginDTO> selectList();
}