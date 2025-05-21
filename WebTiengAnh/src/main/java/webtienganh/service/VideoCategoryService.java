package webtienganh.service;

import java.util.List;

import webtienganh.dto.VideoCategoryDTO;

public interface VideoCategoryService {

	List<VideoCategoryDTO> getList();

	VideoCategoryDTO save(VideoCategoryDTO videoCategoryDTO);

	void delete(Integer id);
}
