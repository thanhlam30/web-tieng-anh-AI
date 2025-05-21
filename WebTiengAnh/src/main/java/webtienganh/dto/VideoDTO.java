package webtienganh.dto;

import java.util.List;

import javax.validation.constraints.NotBlank;
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
public class VideoDTO extends VideoSummaryDTO {

	//@JsonProperty(access = Access.READ_ONLY)
	private String url;
	@NotBlank
	@Size(max = 500 )
	private String description;
	//@JsonProperty(access = Access.READ_ONLY)
	private List<SubtitleDTO> subtitles;
	//@JsonProperty(access = Access.READ_ONLY)
	private List<VideoWordDTO> videoWords;
	@Id
	private Integer categoryId;
	private String categoryName;

	
}
