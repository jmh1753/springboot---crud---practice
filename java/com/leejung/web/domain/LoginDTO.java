package com.leejung.web.domain;

import org.springframework.context.annotation.Lazy;
import org.springframework.stereotype.Component;

import lombok.Data;

/**
 * JoinDTO
 */
@Data@Component@Lazy
public class LoginDTO {

    private String userid, password, phone, address;    
}