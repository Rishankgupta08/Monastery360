package com.monastery360.model;

public class Monastery {
    private Long id;
    private String name;
    private String location;
    private String century;
    private double rating;

    public Monastery() {}

    public Monastery(Long id, String name, String location, String century, double rating) {
        this.id = id;
        this.name = name;
        this.location = location;
        this.century = century;
        this.rating = rating;
    }

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public String getCentury() { return century; }
    public void setCentury(String century) { this.century = century; }

    public double getRating() { return rating; }
    public void setRating(double rating) { this.rating = rating; }
}


