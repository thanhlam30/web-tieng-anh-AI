package webtienganh.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.NameRoleOnlyDTO;
import webtienganh.service.MeService;

@RestController
@RequestMapping("/user/me")
@CrossOrigin
public class MeController {

	@Autowired
	private MeService meService;

	@GetMapping("/role")
	public NameRoleOnlyDTO getUsers() {

		return meService.getNameRoleOnly();
	}
	
}
