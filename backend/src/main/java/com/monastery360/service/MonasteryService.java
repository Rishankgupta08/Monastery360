package com.monastery360.service;

import com.monastery360.model.Monastery;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MonasteryService {
    private final List<Monastery> monasteries = new ArrayList<>();

    public MonasteryService() {
        monasteries.add(new Monastery(1L, "Rumtek Monastery", "Gangtok", "16th Century", 4.9));
        monasteries.add(new Monastery(2L, "Enchey Monastery", "Gangtok", "19th Century", 4.7));
        monasteries.add(new Monastery(3L, "Pemayangtse Monastery", "Pelling", "17th Century", 4.8));
    }

    public List<Monastery> listMonasteries() {
        return monasteries;
    }
}


