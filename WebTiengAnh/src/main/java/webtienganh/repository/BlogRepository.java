package webtienganh.repository;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.Blog;

public interface BlogRepository extends JpaRepository<Blog, Integer> {

	Page<Blog> findAllByNameContainingAndBlogCategorySlugContainingOrderByCreateDate(String name, String categorySlug, Pageable pageable);
	
	Optional<Blog> findBySlug(String slug);
	
	boolean existsByName(String name);
	
	boolean existsByIdNotAndName(Integer id, String name);
}
