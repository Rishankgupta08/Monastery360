package com.monastery360.controller;

import com.monastery360.dto.ApiResponse;
import com.monastery360.model.Monastery;
import com.monastery360.service.MonasteryService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/monasteries")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"})
public class MonasteryController {
    private final MonasteryService monasteryService;

    public MonasteryController(MonasteryService monasteryService) {
        this.monasteryService = monasteryService;
    }

    @GetMapping
    public ApiResponse<List<Monastery>> list() {
        return ApiResponse.ok(monasteryService.listMonasteries());
    }
}


