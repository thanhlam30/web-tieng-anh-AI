package webtienganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.WordNote;
import webtienganh.entity.WordNote_PK;

public interface WordNoteRepository extends JpaRepository<WordNote, WordNote_PK> {

}
