package webtienganh.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.VideoWord;

public interface VideoWordRepository extends JpaRepository<VideoWord, Integer>{

	boolean existsByName(String name);
	
	Optional<VideoWord> findByName(String name);
}
