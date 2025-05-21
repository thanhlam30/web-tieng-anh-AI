package webtienganh.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.WordNoteCategory;

public interface WordNoteCategoryRepository extends JpaRepository<WordNoteCategory, Integer> {

	List<WordNoteCategory> findAllByUserUsername(String username);

	boolean existsByUserUsernameAndId(String username, Integer id);
	
}
