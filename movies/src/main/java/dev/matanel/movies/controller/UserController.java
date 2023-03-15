package dev.matanel.movies.controller;


import dev.matanel.movies.entity.Review;
import dev.matanel.movies.entity.User;
import dev.matanel.movies.exeption.ResourceNotFoundException;
import dev.matanel.movies.repository.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1")
//@CrossOrigin(origins = "http://localhost:3000", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE })
public class UserController {

    private static final Logger LOGGER = LoggerFactory.getLogger(MovieController.class);
    @Autowired
    private UserRepository userRepository;


    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        LOGGER.info("Got to all users function");
        return userRepository.findAll();
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<User> GetUserByEmail(@PathVariable(value = "email")
                                                   String email) throws ResourceNotFoundException {
        User user = userRepository.findUserByEmail(email).orElseThrow(()-> new ResourceNotFoundException
                ("No user exist for this email." + email));

        return ResponseEntity.ok().body(user);
    }

//    @PostMapping("/users")
//    public User createUser(@RequestBody User user){
//        return userRepository.save(user);
//    }
    @RequestMapping(value = "/users", method = {RequestMethod.POST, RequestMethod.OPTIONS})
    public ResponseEntity<User> createUser(@RequestBody User user){
        LOGGER.info("Got to create User function");
        userRepository.save(user);
        return new ResponseEntity<>(user,HttpStatus.OK);
    }

    @PostMapping("/test")
    public ResponseEntity<User> createUser(){
        LOGGER.info("Got to test function");
//        userRepository.save(user);
        return new ResponseEntity<>(null,HttpStatus.OK);
    }

    @PutMapping("/users/{email}")
    public ResponseEntity<User> updateUser(@PathVariable(value = "email")
                                           String email, @RequestBody User userDto) throws ResourceNotFoundException{
        User user = userRepository.findUserByEmail(email).orElseThrow(()-> new ResourceNotFoundException
                ("No user exist for this email" + email));

        user.setUserName(userDto.getUserName());
        user.setEmail(email);
        user.setPassword(userDto.getPassword());
        user.setId(userDto.getId());
        final User updateUser = userRepository.save(user);
        return ResponseEntity.ok(updateUser);
    }

    @DeleteMapping("users/{email}")
    public Map<String, Boolean> deleteUser(@PathVariable(value = "email")
                                           String email) throws ResourceNotFoundException{
        User user= userRepository.findUserByEmail(email).orElseThrow(()-> new ResourceNotFoundException
                ("No user exist for this email" + email));

        userRepository.delete(user);
        Map<String, Boolean> response = new HashMap<>();
        response.put("Deleted", Boolean.TRUE);
        return response;
    }
}
