package webtienganh.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import webtienganh.converter.BlogConverter;
import webtienganh.dto.BlogDTO;
import webtienganh.dto.BlogSummaryDTO;
import webtienganh.dto.PaginationWrapper;
import webtienganh.entity.Blog;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.BlogRepository;
import webtienganh.service.BlogService;
import webtienganh.service.CloudinaryService;
import webtienganh.utils.FileUtils;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class BlogServiceImpl implements BlogService {

	@Autowired
	private BlogRepository blogRepository;

	@Autowired
	private BlogConverter blogConverter;

	@Autowired
	private CloudinaryService cloudinaryService;

	@Override
	public PaginationWrapper<List<BlogSummaryDTO>> getListSummaries(String name, String categorySlug, int page,
			int size) {

		if (name == null || categorySlug == null || page < 0 || size <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Page<Blog> blogPage = blogRepository.findAllByNameContainingAndBlogCategorySlugContainingOrderByCreateDate(name,
				categorySlug, PageRequest.of(page, size));

		var result = new PaginationWrapper<List<BlogSummaryDTO>>();

		result.setPage(page);
		result.setSize(size);
		result.setTotalPages(blogPage.getTotalPages());

		List<BlogSummaryDTO> blogSummaryDTOs = blogPage.toList().stream()
				.map(blogEle -> blogConverter.toBlogSummaryDTO(blogEle)).collect(Collectors.toList());

		result.setData(blogSummaryDTOs);

		return result;
	}

	@Override
	public BlogDTO getOne(String slug) {

		if (slug == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Blog blog = blogRepository.findBySlug(slug)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG));

		return blogConverter.toBlogDTO(blog);
	}

	@Override
	public BlogDTO save(BlogDTO blogDTO) {

		validate(blogDTO);

		Blog blog = blogRepository.save(blogConverter.toBlog(blogDTO));

		return blogConverter.toBlogDTO(blog);
	}

	private void validate(BlogDTO blogDTO) {

		if (blogDTO == null || blogDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer blogId = blogDTO.getId();

		if (blogId != 0 && !blogRepository.existsById(blogId))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG);

		if (blogRepository.existsByIdNotAndName(blogId, blogDTO.getName())) {

			Map<String, String> error = new HashMap<>();
			error.put("name", "Tên blog bị trùng");

			throw MyExceptionHelper.throwRuntimeCustomException(error);
		}
	}

	@Override
	public BlogDTO getOne(Integer id) {
		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Blog blog = blogRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG));

		return blogConverter.toBlogDTO(blog);
	}

	@Override
	public String uploadImage(Integer id, MultipartFile image) {

		if (id == null || image == null)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Blog blog = blogRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG));

		String imageString = blog.getImage();
		if (imageString != null) {

			String publicId = FileUtils.getPuclidId(imageString);
			cloudinaryService.deleteFile(publicId, "");
		}

		String blogImage = cloudinaryService.uploadFile(image, "");
		blog.setImage(blogImage);

		blogRepository.save(blog);

		return blogImage;
	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Blog blog = blogRepository.findById(id)
				.orElseThrow(() -> MyExceptionHelper.throwResourceNotFoundException(MyConstant.BLOG));

		String image = blog.getImage();

		blogRepository.deleteById(id);
		
		if (image != null) {
			String publicId = FileUtils.getPuclidId(image);
			cloudinaryService.deleteFile(publicId, "");
		}

		
	}
}
