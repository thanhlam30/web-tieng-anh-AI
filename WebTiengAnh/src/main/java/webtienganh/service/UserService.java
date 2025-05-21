package webtienganh.service;

import java.util.List;

import webtienganh.dto.AccountDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.UserDTO;

public interface UserService {

	void updateToken(String username, String token);

	PaginationWrapper<List<UserDTO>> getList(String username, int page, int size);
	
	UserDTO createAccount(AccountDTO accountDTO);
	
	void delete(int id);
	
	void updateAdminRole(int id);
	
	void updateRoles(int id, List<String> roles);
}
