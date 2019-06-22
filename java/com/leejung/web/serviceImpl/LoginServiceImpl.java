package com.leejung.web.serviceImpl;

import java.util.List;

import com.leejung.web.domain.LoginDTO;
import com.leejung.web.mapper.LoginMapper;
import com.leejung.web.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * LoginServiceImpl
 */
@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    LoginMapper mapper;

    @Override
    public LoginDTO login(LoginDTO login) {
        System.out.println("컨트롤러에서 넘어온 id : " + login.getUserid());
        System.out.println("컨트롤러에서 넘어온 pwd : " + login.getPassword());

        return mapper.login(login);
    }

    @Override
    public void updateUser(LoginDTO user) {
        mapper.updateUser(user);
    }

    @Override
    public int deleteUser(LoginDTO user) {

        return mapper.deleteUser(user);
    }

    @Override
    public List<LoginDTO> selectList() {
        return mapper.selectList();
    }

    
}