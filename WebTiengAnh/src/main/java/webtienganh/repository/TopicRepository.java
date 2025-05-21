package webtienganh.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import webtienganh.entity.Topic;

public interface TopicRepository extends JpaRepository<Topic, Integer> {

	boolean existsByIdNotAndName(Integer id, String name);
}
