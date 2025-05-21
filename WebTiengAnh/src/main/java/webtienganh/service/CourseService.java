package webtienganh.service;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import webtienganh.dto.CourseSummaryDTO;
import webtienganh.dto.PaginationWrapper;

public interface CourseService {

	PaginationWrapper<List<CourseSummaryDTO>> getCourseInfos(String name, String topicSlug, int page, int size);

	CourseSummaryDTO getBySlug(String slug);

	CourseSummaryDTO save(CourseSummaryDTO courseSummaryDTO);

	void delete(Integer id);

	String uploadImage(Integer id, MultipartFile image);
	
	void addWord(Integer id, Integer wordId);
	
	void deleteWord(Integer id, Integer wordId);
}
