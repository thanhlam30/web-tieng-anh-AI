package webtienganh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.Part3_4_6_7GroupDTO;
import webtienganh.dto.QuestionDTO;

public interface QuestionService {

	List<QuestionDTO> getList(int type, int examId);

	List<Part3_4_6_7GroupDTO> getListGroup(int type, int examId);

	QuestionDTO save(QuestionDTO questionDTO);

	void createQuestions(int examId, int[] stts);

	String uploadAudio(int id, MultipartFile audioFile);

	String uploadImageForPart1(int id, MultipartFile imageFile);
}
