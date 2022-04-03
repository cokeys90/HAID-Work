package com.cokeys90.haidwork;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {
    @RequestMapping("")
    public String main(){
        return "page/main";
    }
    @RequestMapping("info")
    public String info(){
        return "info";
    }
}
