package com.leejung.web.mapper;

import java.util.List;

import com.leejung.web.domain.LoginDTO;

import org.springframework.stereotype.Repository;

/**
 * LoginMapper
 */
@Repository
public interface LoginMapper {

    public LoginDTO login(LoginDTO login);
    
    public void updateUser(LoginDTO user);

    public int deleteUser(LoginDTO user);

    public List<LoginDTO> selectList();
}