package com.monastery360.service;

import com.monastery360.model.Event;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class EventService {
    private final List<Event> events = new ArrayList<>();

    public EventService() {
        events.add(new Event(1L, "Losoong Festival", "Rumtek Monastery", LocalDate.now().plusDays(14), "Harvest festival with Cham dance"));
        events.add(new Event(2L, "Buddha Purnima", "Enchey Monastery", LocalDate.now().plusDays(30), "Celebration of Buddha's birth"));
    }

    public List<Event> listEvents() {
        return events;
    }
}


