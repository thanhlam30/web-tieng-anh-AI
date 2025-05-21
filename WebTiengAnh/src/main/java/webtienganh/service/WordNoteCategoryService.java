package webtienganh.service;

import java.util.List;

import webtienganh.dto.WordNoteCategoryDTO;
import webtienganh.dto.WordNoteCategorySummaryDTO;
import webtienganh.dto.WordReviewDTO;

public interface WordNoteCategoryService {

	List<WordNoteCategorySummaryDTO> getAllCategorySummaries();

	WordNoteCategorySummaryDTO add(String name);

	WordNoteCategorySummaryDTO update(Integer id, String name);

	void delete(Integer id);

	void addWord(Integer id, Integer wordId);

	WordNoteCategoryDTO getById(Integer id);
	
	WordReviewDTO getWordReview(Integer slug, int type, List<Integer> idsWasReview);
	
	void deleteWord(Integer id, Integer wordId);
}
