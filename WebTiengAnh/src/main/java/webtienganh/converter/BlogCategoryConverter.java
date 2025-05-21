package webtienganh.converter;

import org.springframework.stereotype.Component;

import webtienganh.dto.BlogCategoryDTO;
import webtienganh.entity.BlogCategory;
import webtienganh.utils.CommonFuc;

@Component
public class BlogCategoryConverter {

	public BlogCategoryDTO toBlogCategoryDTO(BlogCategory blogCategory) {

		BlogCategoryDTO result = new BlogCategoryDTO();
		
		result.setId(blogCategory.getId());
		result.setName(blogCategory.getName());
		result.setSlug(blogCategory.getSlug());

		return result;
	}

	public BlogCategory toBlogCategory(BlogCategoryDTO blogCategoryDTO) {

		BlogCategory result = new BlogCategory();
		
		result.setId(blogCategoryDTO.getId());
		
		String name = blogCategoryDTO.getName();
		result.setName(name);
		result.setSlug(CommonFuc.toSlug(name));

		return result;
	}
}
