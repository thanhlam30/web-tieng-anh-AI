package webtienganh.service;

import java.util.List;

import webtienganh.dto.TopicDTO;

public interface TopicService {

	List<TopicDTO> getAll();
	
	TopicDTO save(TopicDTO topicDTO);

	void delete(Integer id);
}
