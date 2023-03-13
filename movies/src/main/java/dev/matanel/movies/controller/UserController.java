package dev.matanel.movies.controller;


import dev.matanel.movies.entity.User;
import dev.matanel.movies.exeption.ResourceNotFoundException;
import dev.matanel.movies.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin()
@RestController
@RequestMapping("/api/v1")
public class UserController {
    @Autowired
    private UserRepository userRepository;

    @GetMapping("/users/all")
    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    @GetMapping("/users/email/{email}")
    public ResponseEntity<User> GetUserByEmail(@PathVariable(value = "email")
                                                   String email) throws ResourceNotFoundException {
        User user = userRepository.findUserByEmail(email).orElseThrow(()-> new ResourceNotFoundException
                ("No user exist for this email." + email));

        return ResponseEntity.ok().body(user);
    }

    @PostMapping("/users")
    public User createUser(@RequestBody User user){
        return userRepository.save(user);
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
