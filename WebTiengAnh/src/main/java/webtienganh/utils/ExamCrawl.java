package webtienganh.utils;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import webtienganh.dto.Part3_4_6_7GroupDTO;
import webtienganh.dto.QuestionDTO;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ExamCrawl {

	String name;
	private String part1audio;
	private String part2audio;
	private Integer bookId;

	private List<QuestionDTO> part1;
	private List<QuestionDTO> part2;
	private List<Part3_4_6_7GroupDTO> part3;
	private List<Part3_4_6_7GroupDTO> part4;
	private List<QuestionDTO> part5;
	private List<Part3_4_6_7GroupDTO> part6;
	private List<Part3_4_6_7GroupDTO> part7;
	
	

}
