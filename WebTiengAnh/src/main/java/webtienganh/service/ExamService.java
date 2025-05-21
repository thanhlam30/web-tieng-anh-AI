package webtienganh.service;

import java.util.List;
import java.util.Map;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.ExamDTO;
import webtienganh.dto.ExamQuestionDTO;
import webtienganh.dto.ExamResultDTO;
import webtienganh.dto.NameSlugDTO;
import webtienganh.dto.PaginationWrapper;

public interface ExamService {

	ExamQuestionDTO getExamQuestion(String slug);

	ExamResultDTO getExamResult(String slug, Map<Integer, String> answers);

	List<NameSlugDTO> getListNameSlugs();

	List<Object> getQuestionsOfPart(String slug, int type);

	PaginationWrapper<List<ExamDTO>> getList(String name, String bookName, int page, int size);

	ExamDTO add(ExamDTO examDTO, int[] stts);
	ExamDTO save(ExamDTO examDTO);

	void delete(Integer id);

	void uploadAudio(int id, MultipartFile part1Audio, MultipartFile part2Audio, MultipartFile part3Audio,
			MultipartFile part4Audio);
}
