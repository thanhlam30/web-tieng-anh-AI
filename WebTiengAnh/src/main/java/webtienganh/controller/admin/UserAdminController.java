package webtienganh.controller.admin;

import java.util.List;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import webtienganh.dto.AccountDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.UserDTO;
import webtienganh.service.UserService;
import webtienganh.utils.RestConstant;

@RestController
@RequestMapping("/admin/users")
@CrossOrigin
public class UserAdminController {

	@Autowired
	private UserService userService;

	@GetMapping("")
	public PaginationWrapper<List<UserDTO>> getList(
			@RequestParam(name = "username", required = false, defaultValue = "") String username,
			@RequestParam(name = "page", required = false, defaultValue = "0") int page,
			@RequestParam(name = "size", required = false, defaultValue = "10") int size) {

		return userService.getList(username, page, size);
	}

	@PostMapping(value = "", consumes = RestConstant.CONSUMES_JSON)
	@ResponseStatus(code = HttpStatus.CREATED)
	public void createAccount(@Valid @RequestBody AccountDTO accountDTO) {
		
		userService.createAccount(accountDTO);
	}
	
	@PutMapping("/{id}/admin-role")
	public void updateAdminRole(@PathVariable("id") int id) {
		
		userService.updateAdminRole(id);
	}
	
	@PutMapping("/{id}/update-roles")
	public void updateAdminRole(@PathVariable("id") int id, @RequestBody List<String> roles) {
		
		userService.updateRoles(id, roles);
	}
	
	@DeleteMapping("/{id}")
	@ResponseStatus(code = HttpStatus.NO_CONTENT)
	public void delete(@PathVariable("id") int id) {
	
		userService.delete(id);
	}
}
