package webtienganh.service.impl;

import java.util.List;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import webtienganh.converter.WordConverter;
import webtienganh.dto.PaginationWrapper;
import webtienganh.dto.WordDTO;
import webtienganh.entity.CourseWord;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.CourseRepository;
import webtienganh.repository.CourseWordRepository;
import webtienganh.service.CourseWordService;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class CourseWordServiceImpl implements CourseWordService {

	@Autowired
	private CourseWordRepository courseWordRepository;
	@Autowired
	private WordConverter wordConverter;
	@Autowired
	private CourseRepository courseRepository;

	@Override
	public PaginationWrapper<List<WordDTO>> getList(String courseSlug, int page, int size) {

		if (courseSlug == null || page < 0 || size < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (!courseRepository.existsBySlug(courseSlug))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.COURSE);

		PaginationWrapper<List<WordDTO>> result = new PaginationWrapper<>();

		result.setPage(page);
		result.setSize(size);

		Page<CourseWord> courseWordPage = courseWordRepository.findAllByCourseSlug(courseSlug,
				PageRequest.of(page, size));
		result.setTotalPages(courseWordPage.getTotalPages());

		List<WordDTO> wordDTOs = courseWordPage.toList().stream()
				.map(courseWordEle -> wordConverter.toWordDTO(courseWordEle.getWord())).collect(Collectors.toList());

		result.setData(wordDTOs);

		return result;
	}

}
