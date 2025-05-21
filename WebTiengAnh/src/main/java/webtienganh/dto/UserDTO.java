package webtienganh.dto;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDTO {

	private Integer id;
	private String name;
	private String username;
	private String image;
	private String provider;
	private String email;
	private List<String> roles;
}
