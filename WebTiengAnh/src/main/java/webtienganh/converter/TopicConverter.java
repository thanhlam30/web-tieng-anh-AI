package webtienganh.converter;

import org.springframework.stereotype.Component;

import webtienganh.dto.TopicDTO;
import webtienganh.entity.Topic;
import webtienganh.utils.CommonFuc;

@Component
public class TopicConverter {

	public TopicDTO toTopicDTO(Topic topic) {
		
		TopicDTO topicDTO = new TopicDTO();
		
		topicDTO.setId(topic.getId());
		topicDTO.setName(topic.getName());
		topicDTO.setSlug(topic.getSlug());
		
		return topicDTO;
	}
	
	public Topic toTopic(TopicDTO topicDTO) {
		
		Topic topic = new Topic();
		topic.setId(topicDTO.getId());
		
		String name = topicDTO.getName();
		topic.setName(name);
		topic.setSlug(CommonFuc.toSlug(name));
		
		return topic;
	}
}
