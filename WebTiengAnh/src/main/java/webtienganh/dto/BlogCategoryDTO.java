package webtienganh.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogCategoryDTO {

	private Integer id;
	@NotBlank
	@Size(max = 200)
	private String name;
	private String slug;
}
