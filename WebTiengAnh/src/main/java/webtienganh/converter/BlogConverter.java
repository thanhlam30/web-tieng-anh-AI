package webtienganh.converter;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import webtienganh.dto.BlogDTO;
import webtienganh.dto.BlogSummaryDTO;
import webtienganh.entity.Blog;
import webtienganh.entity.BlogCategory;
import webtienganh.repository.BlogRepository;
import webtienganh.utils.CommonFuc;
import webtienganh.utils.DateProcessor;

@Component
public class BlogConverter {

	@Autowired
	private BlogRepository blogRepository;

	public BlogSummaryDTO toBlogSummaryDTO(Blog blog) {

		var result = new BlogSummaryDTO();
		result.setId(blog.getId());
		result.setName(blog.getName());
		result.setSlug(blog.getSlug());
		result.setImage(blog.getImage());
		result.setDescription(blog.getDescription());
		result.setCreateDate(DateProcessor.toDateString(blog.getCreateDate()));

		return result;
	}

	public BlogDTO toBlogDTO(Blog blog) {

		var result = new BlogDTO();
		result.setId(blog.getId());
		result.setName(blog.getName());
		result.setSlug(blog.getSlug());
		result.setImage(blog.getImage());
		result.setDescription(blog.getDescription());
		result.setCreateDate(DateProcessor.toDateString(blog.getCreateDate()));
		result.setContent(blog.getContent());

		BlogCategory blogCategory = blog.getBlogCategory();
		result.setCategoryId(blogCategory.getId());
		result.setCategoryName(blogCategory.getName());

		return result;
	}

	public Blog toBlog(BlogDTO blogDTO) {

		var blogResult = new Blog();

		Integer id = blogDTO.getId();

		if (id != 0)
			blogResult = blogRepository.findById(id).get();
		else
			blogResult.setCreateDate(LocalDate.now());

		String name = blogDTO.getName();
		blogResult.setName(name);
		blogResult.setSlug(CommonFuc.toSlug(name));

		blogResult.setDescription(blogDTO.getDescription());
		blogResult.setContent(blogDTO.getContent());
		blogResult.setBlogCategory(new BlogCategory(blogDTO.getCategoryId(), blogDTO.getCategoryName()));

		return blogResult;
	}
}
