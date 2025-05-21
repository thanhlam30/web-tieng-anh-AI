package webtienganh.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.converter.BlogCategoryConverter;
import webtienganh.dto.BlogCategoryDTO;
import webtienganh.entity.BlogCategory;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.BlogCategoryRepository;
import webtienganh.service.BlogCategoryService;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class BlogCategoryServiceImpl implements BlogCategoryService {

	@Autowired
	private BlogCategoryRepository blogCategoryRepository;

	@Autowired
	private BlogCategoryConverter blogCategoryConverter;

	@Override
	public List<BlogCategoryDTO> getList() {

		return blogCategoryRepository.findAll().stream()
				.map(blogCategoryEle -> blogCategoryConverter.toBlogCategoryDTO(blogCategoryEle))
				.collect(Collectors.toList());
	}

	@Override
	public BlogCategoryDTO save(BlogCategoryDTO blogCategoryDTO) {

		validate(blogCategoryDTO);

		BlogCategory blogCategoryWasSave = blogCategoryRepository
				.save(blogCategoryConverter.toBlogCategory(blogCategoryDTO));

		return blogCategoryConverter.toBlogCategoryDTO(blogCategoryWasSave);
	}

	private void validate(BlogCategoryDTO blogCategoryDTO) {
		if (blogCategoryDTO == null || blogCategoryDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = blogCategoryDTO.getId();

		if (id != 0 && !blogCategoryRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG_CATEGORY);

		if (blogCategoryRepository.existsByIdNotAndName(id, blogCategoryDTO.getName())) {
			Map<String, String> error = new HashMap<>();
			error.put("name", "Tên danh mục blog bị trùng");
			throw MyExceptionHelper.throwRuntimeCustomException(error);
		}
	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (!blogCategoryRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG_CATEGORY);

		blogCategoryRepository.deleteById(id);
	}

}
