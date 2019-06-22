package com.leejung.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;


/**
 * HomeController
 */
@Controller
public class HomeController {

    @RequestMapping("/")
    public String index(){
        System.out.println("HomeController");
        return "index";
    }
}