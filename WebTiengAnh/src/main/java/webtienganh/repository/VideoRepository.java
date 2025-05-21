package webtienganh.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.Video;

public interface VideoRepository extends JpaRepository<Video, Integer> {

	Page<Video> findAllByCategorySlugAndDurationBetween(String categorySlug, long timeForm, long timeTo,
			Pageable pageable);
	
	Page<Video> findAllByCategorySlugAndDurationBetweenAndLevel(String categorySlug, long timeForm, long timeTo, int level,
			Pageable pageable);
	
	Optional<Video> findBySlug(String slug);
	
	boolean existsByName(String name);
	
	Optional<Video> findByName(String name);
	
	boolean existsByIdNotAndName(Integer id, String name);
	
	List<Video> findAllByCategoryId(Integer categoryId);
}
