package webtienganh.dto;

import javax.validation.constraints.NotNull;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.validator.CategoryIdExists;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class BlogDTO extends BlogSummaryDTO {

	private String content;
	@NotNull(message = "CategoryId không được null")
	@CategoryIdExists
	private Integer categoryId;
	private String categoryName;
}
