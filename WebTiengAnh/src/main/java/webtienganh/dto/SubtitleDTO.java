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
public class SubtitleDTO {

	private Integer id;

	//@JsonProperty(access = Access.READ_ONLY)
	private int stt;

	@NotNull
	@Min(value = 0)
	private Long start;
	@NotNull
	@Min(value = 0)
	private Long end;
	@NotBlank
	@Size(max = 500)
	private String content;

	@Id
	private Integer videoId;
}
