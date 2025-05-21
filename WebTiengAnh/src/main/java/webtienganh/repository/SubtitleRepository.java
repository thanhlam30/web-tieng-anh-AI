package webtienganh.repository;

import webtienganh.entity.Subtitle;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface SubtitleRepository extends JpaRepository<Subtitle, Integer> {

	int countByVideoId(Integer videoId);
	
	void deleteBySttAndVideoId(int stt, Integer videoId);
	
	List<Subtitle> findAllByVideoIdOrderByStartAsc(Integer videoId);
}
