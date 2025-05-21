package webtienganh.dto;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.validator.Id;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoWordDTO {

	private Integer id;
	@NotBlank
	@Size(max = 100)
	private String name;
	@NotBlank
	@Size(max = 100)
	private String origin;
	//@JsonProperty(access = Access.READ_ONLY)
	private String sound;
	@NotNull
	@Min(value = 1)
	private int frequency; 
	
	@Id
	private Integer videoId;
}
