package webtienganh.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import webtienganh.converter.VideoCategoryConverter;
import webtienganh.dto.VideoCategoryDTO;
import webtienganh.entity.VideoCategory;
import webtienganh.exception.MyExceptionHelper;
import webtienganh.repository.VideoCategoryRepository;
import webtienganh.service.VideoCategoryService;
import webtienganh.utils.MyConstant;

@Service
@Transactional
public class VideoCategoryServiceImpl implements VideoCategoryService {

	@Autowired
	private VideoCategoryRepository videoCategoryRepository;

	@Autowired
	private VideoCategoryConverter videoCategoryConverter;

	@Override
	public List<VideoCategoryDTO> getList() {

		return videoCategoryRepository.findAll().stream()
				.map(categoryEle -> videoCategoryConverter.toVideoCategoryDTO(categoryEle))
				.collect(Collectors.toList());
	}

	@Override
	public VideoCategoryDTO save(VideoCategoryDTO videoCategoryDTO) {

		validate(videoCategoryDTO);

		VideoCategory videoCategoryWasSave = videoCategoryRepository
				.save(videoCategoryConverter.toVideoCategory(videoCategoryDTO));

		return videoCategoryConverter.toVideoCategoryDTO(videoCategoryWasSave);
	}

	private void validate(VideoCategoryDTO videoCategoryDTO) {
		if (videoCategoryDTO == null || videoCategoryDTO.getId() < 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		Integer id = videoCategoryDTO.getId();

		if (id != 0 && !videoCategoryRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_CATEGORY);

		if (videoCategoryRepository.existsByIdNotAndName(id, videoCategoryDTO.getName())) {
			Map<String, String> error = new HashMap<>();
			error.put("name", "Tên danh mục video bị trùng");
			throw MyExceptionHelper.throwRuntimeCustomException(error);
		}
	}

	@Override
	public void delete(Integer id) {

		if (id == null || id <= 0)
			throw MyExceptionHelper.throwIllegalArgumentException();

		if (!videoCategoryRepository.existsById(id))
			throw MyExceptionHelper.throwResourceNotFoundException(MyConstant.VIDEO_CATEGORY);

		videoCategoryRepository.deleteById(id);
	}

}
