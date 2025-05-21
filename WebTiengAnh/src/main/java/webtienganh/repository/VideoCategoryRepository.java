package webtienganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.VideoCategory;

public interface VideoCategoryRepository extends JpaRepository<VideoCategory, Integer> {
	
	boolean existsByIdNotAndName(Integer id, String name);
}
