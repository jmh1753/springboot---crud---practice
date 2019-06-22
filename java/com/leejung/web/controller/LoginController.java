package com.leejung.web.controller;

import java.util.HashMap;

import com.leejung.web.domain.LoginDTO;
import com.leejung.web.service.LoginService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * JoinController
 */
@RestController
@RequestMapping("/login")
public class LoginController {
    @Autowired LoginService service;
    @Autowired LoginDTO dto;

    @GetMapping("/{loginid}/{loginpwd}")
    public LoginDTO login(@PathVariable("loginid") String id, @PathVariable("loginpwd") String pwd){
        System.out.println("login컨트롤러도착");
        System.out.println("id : " + id);
        System.out.println("pwd : " + pwd);

        dto.setUserid(id);
        dto.setPassword(pwd);

        //System.out.println(service.login(dto));
        System.out.println("체크"+dto);
        return service.login(dto);
    }

    @PutMapping("/{userid}")
    public LoginDTO updateUser(@RequestBody LoginDTO param){
        System.out.println("수정할 객체 : " + param.toString());
 
        service.updateUser(param);       
 
        return dto;
    }

    @DeleteMapping("/{userid}")
    public HashMap<String, Object> deleteUser(@PathVariable String userid){
        HashMap<String,Object> map = new HashMap<>();
        dto.setUserid(userid);
        int res = service.deleteUser(dto);
        System.out.println(res);
        if(res == 1){
            System.out.println("탈퇴성공시");
            map.put("result", "탈퇴성공");    
        }else{
            System.out.println("탈퇴실패시");
            map.put("result", "탈퇴실패");
        }
        return map;
    }

    @GetMapping("/list")
    public HashMap<String, Object> selectList(){
        System.out.println("리스트 컨트롤러");
        HashMap<String,Object> map = new HashMap<>();
        map.put("list", service.selectList());
        
        System.out.println(map);
        return map;
    }
    
    
}