package com.monastery360.model;

import java.time.LocalDate;

public class Event {
    private Long id;
    private String name;
    private String monastery;
    private LocalDate date;
    private String description;

    public Event() {}

    public Event(Long id, String name, String monastery, LocalDate date, String description) {
        this.id = id;
        this.name = name;
        this.monastery = monastery;
        this.date = date;
        this.description = description;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getMonastery() { return monastery; }
    public void setMonastery(String monastery) { this.monastery = monastery; }

    public LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}


