package webtienganh.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.entity.NameSlugOnly;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BookDTO {

	private Integer id;
	@NotBlank
	@Size(max = 200)
	private String name;
	@JsonProperty(access = Access.READ_ONLY)
	private String image;
	@JsonProperty(access = Access.READ_ONLY)
	private List<NameSlugOnly> exams;

}
