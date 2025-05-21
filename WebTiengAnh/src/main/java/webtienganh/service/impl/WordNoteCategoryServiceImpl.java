package webtienganh.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Random;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.converter.WordNoteCategoryConverter;
import webtienganh.dto.WordNoteCategoryDTO;
import webtienganh.dto.WordNoteCategorySummaryDTO;
import webtienganh.dto.WordReviewDTO;
import webtienganh.entity.Word;
import webtienganh.entity.WordNote;
import webtienganh.entity.WordNoteCategory;
import webtienganh.entity.WordNote_PK;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.WordNoteCategoryRepository;
import webtienganh.repository.WordNoteRepository;
import webtienganh.repository.WordRepository;
import webtienganh.service.WordNoteCategoryService;
import webtienganh.utils.AuthenInfo;
import webtienganh.utils.CommonFuc;
import webtienganh.utils.MyConstant;
import webtienganh.utils.WordNoteCategoryHandler;

@Service
@Transactional
public class WordNoteCategoryServiceImpl implements WordNoteCategoryService {

	@Autowired
	private WordNoteCategoryRepository wordNoteCategoryRepository;
	@Autowired
	private WordNoteCategoryConverter wordNoteCategoryConverter;
	@Autowired
	private WordNoteRepository wordNoteRepository;
	@Autowired
	private WordRepository wordRepository;
	@Autowired
	private AuthenInfo authenInfo;

	@Override
	public List<WordNoteCategorySummaryDTO> getAllCategorySummaries() {

		AuthenInfo.checkLogin();

		String username = AuthenInfo.getUsername();

		return wordNoteCategoryRepository.findAllByUserUsername(username).stream()
				.map(wnc -> wordNoteCategoryConverter.toWordNoteCategoryDTO(wnc)).collect(Collectors.toList());
	}

	@Override
	public WordNoteCategorySummaryDTO add(String name) {

		AuthenInfo.checkLogin();

		if (name == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		WordNoteCategory wordNoteCategory = new WordNoteCategory();
		wordNoteCategory.setName(name);
		wordNoteCategory.setCreateDate(LocalDate.now());
		wordNoteCategory.setUser(authenInfo.getUser());

		return wordNoteCategoryConverter.toWordNoteCategoryDTO(wordNoteCategoryRepository.save(wordNoteCategory));
	}

	@Override
	public WordNoteCategorySummaryDTO update(Integer id, String name) {

		AuthenInfo.checkLogin();

		if (id == null || name == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		checkAuthenticationForCategory(id);

		WordNoteCategory result = wordNoteCategoryRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.NOTE));
		result.setName(name);

		return wordNoteCategoryConverter.toWordNoteCategoryDTO(wordNoteCategoryRepository.save(result));
	}

	@Override
	public void delete(Integer id) {

		AuthenInfo.checkLogin();

		if (id == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		checkAuthenticationForCategory(id);

		wordNoteCategoryRepository.deleteById(id);
	}

	@Override
	public void addWord(Integer id, Integer wordId) {

		AuthenInfo.checkLogin();

		if (id == null || wordId == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		// check có quyền với category
		checkAuthenticationForCategory(id);

		// check có từ vựng đó không
		if (!wordRepository.existsById(wordId))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.WORD);

		// check từ này đã lưu chưa
		WordNote_PK wordNote_PK = new WordNote_PK(id, wordId);
		// nếu tồn tài rồi thì không lưu nữa
		if (wordNoteRepository.existsById(wordNote_PK))
			return;

		WordNote wordNote = new WordNote(new WordNoteCategory(id), new Word(wordId));
		wordNoteRepository.save(wordNote);
	}

	@Override
	public WordNoteCategoryDTO getById(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		checkAuthenticationForCategory(id);

		WordNoteCategory wordNoteCategory = wordNoteCategoryRepository.findById(id).get();

		return wordNoteCategoryConverter.toWordNoteCategoryDTO(wordNoteCategory);
	}

	@Override
	public WordReviewDTO getWordReview(Integer id, int type, List<Integer> idsWasReview) {

		if (id == null || (type != 0 && type != 1) || idsWasReview == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		// check user có tạo danh mục ghi chú này hay không
		checkAuthenticationForCategory(id);

		WordNoteCategory wordNoteCategory = wordNoteCategoryRepository.findById(id).get();

		// lọc ra từ chưa review
		List<WordNote> wordNotesNotReview = wordNoteCategory.getWords().stream().filter(wordNoteCategoryEle -> {

			Integer idTempt = wordNoteCategoryEle.getWord().getId();

			if (idsWasReview.contains(idTempt))
				return false;

			return true;
		}).collect(Collectors.toList());

		int sizeOfWordNotesNotReview = wordNotesNotReview.size();

		if (sizeOfWordNotesNotReview == 0)
			return null;

		// ramdom lấy ra 1 từ
		Random rand = new Random();
		int indexRandom = rand.nextInt(sizeOfWordNotesNotReview);
		WordNote wordNoteReview = wordNotesNotReview.get(indexRandom);

		// random suggestion
		List<String> suggestionsRandom;

		if (type == 0)
			suggestionsRandom = WordNoteCategoryHandler.randomSuggestions(wordNoteCategory, wordNoteReview.getWord());
		else
			suggestionsRandom = CommonFuc.shuffleOrder(wordNoteReview.getWord().getName());

		return wordNoteCategoryConverter.toWordReviewDTO(wordNoteReview, suggestionsRandom);
	}

	@Override
	public void deleteWord(Integer id, Integer wordId) {

		if (id == null || wordId == null || id <= 0 || wordId <=0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		checkAuthenticationForCategory(id);

		WordNote_PK wordNote_PK = new WordNote_PK(id, wordId);
		
		if (wordNoteRepository.existsById(wordNote_PK))
			wordNoteRepository.deleteById(wordNote_PK);

	}

	// check xem user có vai trò với wordNoteCategory
	private void checkAuthenticationForCategory(Integer id) {

		if (!wordNoteCategoryRepository.existsByUserUsernameAndId(AuthenInfo.getUsername(), id))
			throw MyExceptionHelper.throwAuthenticationException();
	}

}
