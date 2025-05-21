package webtienganh.dto;

import java.util.ArrayList;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Part3_4_6_7ResultGroupDTO {

	private String image;
	private String paragraph;
	private String transcript;
	private List<QuestionResultDTO> results = new ArrayList<>();
}
