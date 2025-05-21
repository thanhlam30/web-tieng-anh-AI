package webtienganh.service;

import java.util.List;

import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.WordDTO;

public interface CourseWordService {

	PaginationWrapper<List<WordDTO>> getList(String courseSlug, int page, int size);
}
