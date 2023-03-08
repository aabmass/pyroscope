package org.example.rideshare.bike;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.example.rideshare.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BikeService {
    @Autowired
    OrderService orderService;

    public void orderBike(int searchRadius) {
        // Make order bike slow and consume tons of memory
        var list = List.of("hello");
        for (int i = 0; i < 100; ++i) {
            list = Stream.concat(list.stream(), list.stream()).collect(Collectors.toList());
        }

        orderService.findNearestVehicle(searchRadius, "bike");
    }
}
