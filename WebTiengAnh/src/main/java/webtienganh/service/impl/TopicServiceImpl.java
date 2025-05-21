package webtienganh.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.converter.TopicConverter;
import webtienganh.dto.TopicDTO;
import webtienganh.entity.Topic;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.TopicRepository;
import webtienganh.service.TopicService;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class TopicServiceImpl implements TopicService {

	@Autowired
	private TopicRepository topicRepository;

	@Autowired
	private TopicConverter topicConverter;

	@Override
	public List<TopicDTO> getAll() {

		return topicRepository.findAll().stream().map(tp -> topicConverter.toTopicDTO(tp)).collect(Collectors.toList());
	}

	@Override
	public TopicDTO save(TopicDTO topicDTO) {

		validate(topicDTO);

		Topic topicWasSave = topicRepository.save(topicConverter.toTopic(topicDTO));

		return topicConverter.toTopicDTO(topicWasSave);
	}

	private void validate(TopicDTO topicDTO) {
		if (topicDTO == null || topicDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = topicDTO.getId();

		if (id != 0 && !topicRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.TOPIC);

		if (topicRepository.existsByIdNotAndName(id, topicDTO.getName())) {
			Map<String, String> error = new HashMap<>();
			error.put("name", "Tên topic bị trùng");
			throw MyExceptionHelper.throwRuntimeCustomException(error);
		}
	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (!topicRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.TOPIC);

		topicRepository.deleteById(id);
	}
}
