package webtienganh.dto;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogSummaryDTO {

	private Integer id;
	@NotBlank
	@Size(max = 200, message = "Tên blog không được quá 200 kí tự")
	private String name;
	@JsonProperty(access = Access.READ_ONLY)
	private String slug;
	@JsonProperty(access = Access.READ_ONLY)
	private String image;
	@NotBlank
	private String description;
	@JsonProperty(access = Access.READ_ONLY)
	private String createDate;
	
}
