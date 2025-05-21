package webtienganh.dto;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.utils.CommonFuc;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class VideoSummaryDTO {

	private Integer id;
	@NotBlank
	@Size(max = 200)
	private String name;
	//@JsonProperty(access = Access.READ_ONLY)
	private String slug;
	//@JsonProperty(access = Access.READ_ONLY)
	private String image;
	@Min(value = 0)
	private Long duration;
	@Min(value = 1)
	@Max(value = 7)
	private int level;

	public String getDurationString() {

		return CommonFuc.getDurationString(this.duration);
	}
}
