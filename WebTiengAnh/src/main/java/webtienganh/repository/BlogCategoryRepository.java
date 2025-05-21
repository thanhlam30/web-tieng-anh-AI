package webtienganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.BlogCategory;

public interface BlogCategoryRepository extends JpaRepository<BlogCategory, Integer> {

	boolean existsByIdNotAndName(Integer id, String name);
}
